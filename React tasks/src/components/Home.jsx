import { Link } from 'react-router-dom';

const TASKS = [
  {
    category: 'String & Text',
    items: [
      { to: '/string-converter', label: 'String Converter', desc: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more.' },
      { to: '/char-count', label: 'Character Counter', desc: 'Count characters, words, sentences and see live stats as you type.' },
      { to: '/markdown', label: 'Markdown Previewer', desc: 'Write Markdown on the left, see the formatted preview on the right in real time.' },
    ],
  },
  {
    category: 'Numbers & Math',
    items: [
      { to: '/counter', label: 'Counter', desc: 'Simple increment / decrement / reset counter with toast feedback.' },
      { to: '/basic-calc', label: 'Basic Calculator', desc: 'Evaluate expressions with +, −, ×, ÷ — great for learning state.' },
      { to: '/calculator', label: 'Scientific Calculator', desc: 'Full-featured calculator with keyboard support and history display.' },
      { to: '/gst', label: 'GST Calculator', desc: 'Calculate tax-inclusive / tax-exclusive prices across multiple GST slabs.' },
      { to: '/bmi', label: 'BMI Calculator', desc: 'Enter height and weight to get BMI value, category, and a colour-coded bar.' },
      { to: '/age', label: 'Age Calculator', desc: 'Pick a date of birth to get exact age in years, months, days and birthday countdown.' },
    ],
  },
  {
    category: 'Time & Utilities',
    items: [
      { to: '/timer', label: 'Countdown Timer', desc: 'Set a custom duration and watch the animated progress bar count down.' },
      { to: '/clock', label: 'Digital Clock', desc: 'Live digital clock with blinking colon and full date display.' },
      { to: '/password', label: 'Password Toggle', desc: 'Input with show/hide password toggle — a common form UX pattern.' },
      { to: '/qr', label: 'QR Code Generator', desc: 'Type any text or URL to instantly generate a QR code and download it as PNG.' },
      { to: '/color', label: 'Color Picker', desc: 'Pick a colour and copy its HEX, RGB, or HSL value to the clipboard.' },
    ],
  },
  {
    category: 'Games & Quiz',
    items: [
      { to: '/guess', label: 'Guess the Number', desc: 'Three difficulty levels — Easy (1–50), Medium (1–100), Hard (1–500).' },
      { to: '/quiz', label: 'React Quiz', desc: '10 React/JS questions, one at a time, scored with a detailed results screen.' },
    ],
  },
  {
    category: 'Data & Lists',
    items: [
      { to: '/todo-state', label: 'Todo (State)', desc: 'Add, edit, delete and filter tasks using React useState — no persistence.' },
      { to: '/todo-ls', label: 'Todo (LocalStorage)', desc: 'Same todo app but tasks persist across page refreshes via localStorage.' },
      { to: '/user-form', label: 'User Registration Form', desc: 'Multi-field form with validation, edit mode, and searchable records table.' },
      { to: '/users', label: 'Users API', desc: 'Fetch users from JSONPlaceholder and display them as interactive cards.' },
    ],
  },
  {
    category: 'APIs & Live Data',
    items: [
      { to: '/weather', label: 'Weather App', desc: 'Search any city for live weather + a 7-day forecast strip (open-meteo.com, no API key).' },
      { to: '/movies', label: 'Movie Search', desc: 'Search movies via OMDB API with pagination and a detail modal on click.' },
      { to: '/news', label: 'News App', desc: 'Top headlines by category (General, Tech, Sports…) via NewsAPI.' },
      { to: '/currency', label: 'Currency Converter', desc: 'Convert between 30+ currencies with live rates and a full rates table (frankfurter.app).' },
    ],
  },
];

function Home() {
  return (
    <div className="page home-page">
      <h1>React Tasks</h1>
      <p className="home-subtitle">
        25 mini-apps built with React — covering hooks, state, context, APIs, forms and more.
      </p>

      <div className="home-grid-wrapper">
        {TASKS.map(({ category, items }) => (
          <section key={category} className="home-category">
            <h2 className="home-category-title">{category}</h2>
            <div className="home-cards">
              {items.map(({ to, label, desc }) => (
                <Link key={to} to={to} className="home-card">
                  <span className="home-card-label">{label}</span>
                  <span className="home-card-desc">{desc}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
