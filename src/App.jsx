import { Routes, Route } from 'react-router-dom';
import ScrollProgress from './components/layout/ScrollProgress';
import Ticker from './components/layout/Ticker';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Ticker />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
