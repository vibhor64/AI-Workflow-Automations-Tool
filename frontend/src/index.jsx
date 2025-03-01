import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Router>
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/pipelines">Pipelines</Link>
      <Link to="/deployment">Deployment</Link>
      <Link to="/knowledge">Knowledge</Link>
    </nav>
    <App />
  </Router>
  // </React.StrictMode>
);
