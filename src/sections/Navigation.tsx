import { useEffect, useState } from 'react';

const navLinks = ['About', 'Perfumes', 'Skincare', 'Lookbook', 'Wholesale', 'Retail'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ height: '6rem' }}
    >
      <div className="flex items-center justify-center h-full px-8">
        <div className="flex items-center gap-8 md:gap-12">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="text-white text-xs md:text-sm font-sans uppercase tracking-[0.2em] hover:text-[#c58c5a] transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c58c5a] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
