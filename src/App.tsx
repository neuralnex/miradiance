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
      <section className="relative w-full bg-black min-h-[100svh]">
        <HeroCanvas />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100svh-5.5rem)] pt-24 pb-12 text-center px-4 sm:px-8 mx-auto max-w-4xl">
          <h1
            className="font-serif text-white uppercase"
            style={{
              fontSize: 'clamp(3rem, 12vw, 6rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            Miradiance
          </h1>
          <button
            className="mt-10 w-full sm:w-auto px-6 sm:px-8 py-3 border border-white text-white text-sm uppercase tracking-[0.15em] font-sans bg-transparent hover:bg-white hover:text-black transition-all duration-300"
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
