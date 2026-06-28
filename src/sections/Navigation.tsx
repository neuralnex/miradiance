import { useEffect, useState } from 'react';

const navLinks = ['About', 'Perfumes', 'Skincare', 'Lookbook', 'Wholesale', 'Retail'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleResize = () => setMenuOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ height: '5.5rem' }}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <span className="text-white font-sans uppercase tracking-[0.3em] text-sm sm:text-base">
          Miradiance
        </span>

        <button
          type="button"
          className="flex flex-col justify-center gap-1.5 p-2 text-white focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full bg-black/95 border-t border-white/10 text-center py-4">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => scrollToSection(link)}
                className="text-white text-sm font-sans uppercase tracking-[0.2em] hover:text-[#c58c5a] transition-colors duration-300"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
