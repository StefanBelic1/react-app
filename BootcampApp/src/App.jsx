import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import './style.css'
import Car from './Car'
import Driver from './Driver'

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Car Management System</h1>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cars">Cars</NavLink>
          <NavLink to="/drivers">Drivers</NavLink>
        </nav>
        <Routes>
          <Route path="/cars" element={<Car />} />
          <Route path="/drivers" element={<Driver />} />
          <Route path="/" element={<div>Welcome! Select a page.</div>} />
          <Route path="*" element={<div>Welcome! Select a page.</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
