import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Mission from './components/Mission';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Products />
      <Mission />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
