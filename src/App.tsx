import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import HeroCanvas from './sections/HeroCanvas';
import Manifesto from './sections/Manifesto';
import ProductGrid from './sections/ProductGrid';
import Marquee from './sections/Marquee';
import Lookbook from './sections/Lookbook';
import Footer from './sections/Footer';
import CustomCursor from './sections/CustomCursor';

function App() {
  useLenis();

  return (
    <div className="relative">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full bg-black" style={{ height: '100svh' }}>
        <HeroCanvas />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          <p className="text-white text-xs md:text-sm font-sans uppercase tracking-[0.2em] mb-6">
            Luxury Perfumes & Skincare Wholesale and Retail
          </p>
          <h1
            className="font-serif text-white uppercase"
            style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              lineHeight: 0.8,
              letterSpacing: '-0.02em',
            }}
          >
            Miradiance
          </h1>
          <button
            className="mt-10 px-8 py-3 border border-white text-white text-sm uppercase tracking-[0.15em] font-sans bg-transparent hover:bg-white hover:text-black transition-all duration-300"
            onClick={() => {
              document.getElementById('perfumes')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Manifesto */}
      <Manifesto />

      {/* Product Grid */}
      <ProductGrid />

      {/* Marquee Divider */}
      <Marquee />

      {/* Lookbook Editorial */}
      <Lookbook />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
