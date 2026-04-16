import { useState } from 'react';

const WMO_CODES = {
  0: { desc: 'Clear Sky', emoji: '☀️' }, 1: { desc: 'Mainly Clear', emoji: '🌤️' },
  2: { desc: 'Partly Cloudy', emoji: '⛅' }, 3: { desc: 'Overcast', emoji: '☁️' },
  45: { desc: 'Foggy', emoji: '🌫️' }, 48: { desc: 'Icy Fog', emoji: '🌫️' },
  51: { desc: 'Light Drizzle', emoji: '🌦️' }, 53: { desc: 'Drizzle', emoji: '🌦️' },
  55: { desc: 'Heavy Drizzle', emoji: '🌧️' }, 61: { desc: 'Light Rain', emoji: '🌧️' },
  63: { desc: 'Rain', emoji: '🌧️' }, 65: { desc: 'Heavy Rain', emoji: '🌧️' },
  71: { desc: 'Light Snow', emoji: '🌨️' }, 73: { desc: 'Snow', emoji: '❄️' },
  75: { desc: 'Heavy Snow', emoji: '❄️' }, 80: { desc: 'Rain Showers', emoji: '🌦️' },
  81: { desc: 'Showers', emoji: '🌧️' }, 82: { desc: 'Heavy Showers', emoji: '⛈️' },
  95: { desc: 'Thunderstorm', emoji: '⛈️' }, 99: { desc: 'Thunderstorm w/ Hail', emoji: '⛈️' },
};
const getWMO = (code) => WMO_CODES[code] || { desc: 'Unknown', emoji: '🌡️' };
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true); setError(null); setWeather(null);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      if (!geoData.results?.length) throw new Error('City not found');
      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,precipitation` +
        `&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto&forecast_days=7`
      );
      const wd = await weatherRes.json();
      const c = wd.current; const d = wd.daily;
      setWeather({
        name, country,
        temp: c.temperature_2m, feelsLike: c.apparent_temperature,
        humidity: c.relative_humidity_2m, wind: c.wind_speed_10m,
        precipitation: c.precipitation, code: c.weather_code,
        forecast: d.time.map((date, i) => ({
          date, code: d.weather_code[i],
          max: d.temperature_2m_max[i], min: d.temperature_2m_min[i],
          precip: d.precipitation_sum[i],
        })),
      });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const wmo = weather ? getWMO(weather.code) : null;

  return (
    <div className="page">
      <h1>Weather App</h1>
      <p style={{ color: '#888', marginBottom: '16px' }}>Powered by open-meteo.com — no API key needed</p>
      <div className="weather-search">
        <input type="text" placeholder="Enter city name..." value={city}
          onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          className="text-input" style={{ marginBottom: 0, width: '260px' }} />
        <button className="btn btn-primary" onClick={fetchWeather} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="api-status api-error">{error}</p>}

      {weather && (
        <>
          <div className="weather-card">
            <div className="weather-location"><h2>{weather.name}, {weather.country}</h2></div>
            <div className="weather-emoji">{wmo.emoji}</div>
            <p className="weather-temp">{Math.round(weather.temp)}°C</p>
            <p className="weather-desc">{wmo.desc}</p>
            <div className="weather-details">
              <div className="weather-stat"><span className="stat-label">Feels Like</span><span className="stat-value">{Math.round(weather.feelsLike)}°C</span></div>
              <div className="weather-stat"><span className="stat-label">Humidity</span><span className="stat-value">{weather.humidity}%</span></div>
              <div className="weather-stat"><span className="stat-label">Wind</span><span className="stat-value">{weather.wind} km/h</span></div>
              <div className="weather-stat"><span className="stat-label">Precipitation</span><span className="stat-value">{weather.precipitation} mm</span></div>
            </div>
          </div>

          {/* 7-day forecast */}
          <div className="forecast-strip">
            {weather.forecast.map((day, i) => {
              const d = new Date(day.date);
              const label = i === 0 ? 'Today' : DAYS[d.getDay()];
              const w = getWMO(day.code);
              return (
                <div key={day.date} className="forecast-day">
                  <span className="forecast-label">{label}</span>
                  <span className="forecast-emoji">{w.emoji}</span>
                  <span className="forecast-max">{Math.round(day.max)}°</span>
                  <span className="forecast-min">{Math.round(day.min)}°</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherApp;
