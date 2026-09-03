import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/home';

function Placeholder({ name }) {
  return (
    <div className="placeholder">
      <h1>{name} page — coming next</h1>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Placeholder name="About" />} />
          <Route path="/services" element={<Placeholder name="Services" />} />
          <Route path="/how-we-work" element={<Placeholder name="How We Work" />} />
          <Route path="/expertise" element={<Placeholder name="Expertise" />} />
          <Route path="/industries" element={<Placeholder name="Industries" />} />
          <Route path="/why-bharyat" element={<Placeholder name="Why Bharyat" />} />
          <Route path="/team" element={<Placeholder name="Team" />} />
          <Route path="/trust" element={<Placeholder name="Trust" />} />
          <Route path="/contact" element={<Placeholder name="Contact" />} />
        </Routes>
      </main>
    </div>
  );
}