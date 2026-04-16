import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './components/Home';
import StringConverter from './components/StringConverter';
import CharCount from './components/CharCount';
import Counter from './components/Counter';
import CountdownTimer from './components/CountdownTimer';
import PasswordToggle from './components/PasswordToggle';
import DigitalClock from './components/DigitalClock';
import GuessNumber from './components/GuessNumber';
import BasicCalc from './components/BasicCalc';
import Calculator from './components/Calculator';
import GSTCalculator from './components/GSTCalculator';
import TodoState from './components/TodoState';
import TodoLocalStorage from './components/TodoLocalStorage';
import UserForm from './components/UserForm';
import UserCards from './components/UserCards';
import WeatherApp from './components/WeatherApp';
import MovieSearch from './components/MovieSearch';
import NewsApp from './components/NewsApp';
import CurrencyConverter from './components/CurrencyConverter';
import BMICalc from './components/BMICalc';
import AgeCalc from './components/AgeCalc';
import QRGenerator from './components/QRGenerator';
import ColorPicker from './components/ColorPicker';
import MarkdownPreviewer from './components/MarkdownPreviewer';
import QuizApp from './components/QuizApp';
import NotFound from './components/NotFound';
import './App.css';

const NAV_LINKS = [
  { to: '/string-converter', label: 'String Converter' },
  { to: '/char-count', label: 'Char Count' },
  { to: '/counter', label: 'Counter' },
  { to: '/timer', label: 'Timer' },
  { to: '/password', label: 'Password' },
  { to: '/clock', label: 'Clock' },
  { to: '/guess', label: 'Guess Number' },
  { to: '/basic-calc', label: 'Basic Calc' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/gst', label: 'GST Calc' },
  { to: '/todo-state', label: 'Todo (State)' },
  { to: '/todo-ls', label: 'Todo (LS)' },
  { to: '/user-form', label: 'User Form' },
  { to: '/users', label: 'Users API' },
  { to: '/weather', label: 'Weather' },
  { to: '/movies', label: 'Movies' },
  { to: '/news', label: 'News' },
  { to: '/currency', label: 'Currency' },
  { to: '/bmi', label: 'BMI' },
  { to: '/age', label: 'Age Calc' },
  { to: '/qr', label: 'QR Code' },
  { to: '/color', label: 'Color Picker' },
  { to: '/markdown', label: 'Markdown' },
  { to: '/quiz', label: 'Quiz' },
];

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-title">React Tasks</span>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active nav-home' : 'nav-link nav-home'}>
          Home
        </NavLink>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={() => setMenuOpen(false)}>
            {label}
          </NavLink>
        ))}
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

function AppContent() {
  const { darkMode } = useTheme();
  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/string-converter" element={<StringConverter />} />
            <Route path="/char-count" element={<CharCount />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/timer" element={<CountdownTimer />} />
            <Route path="/password" element={<PasswordToggle />} />
            <Route path="/clock" element={<DigitalClock />} />
            <Route path="/guess" element={<GuessNumber />} />
            <Route path="/basic-calc" element={<BasicCalc />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/gst" element={<GSTCalculator />} />
            <Route path="/todo-state" element={<TodoState />} />
            <Route path="/todo-ls" element={<TodoLocalStorage />} />
            <Route path="/user-form" element={<UserForm />} />
            <Route path="/users" element={<UserCards />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/movies" element={<MovieSearch />} />
            <Route path="/news" element={<NewsApp />} />
            <Route path="/currency" element={<CurrencyConverter />} />
            <Route path="/bmi" element={<BMICalc />} />
            <Route path="/age" element={<AgeCalc />} />
            <Route path="/qr" element={<QRGenerator />} />
            <Route path="/color" element={<ColorPicker />} />
            <Route path="/markdown" element={<MarkdownPreviewer />} />
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
