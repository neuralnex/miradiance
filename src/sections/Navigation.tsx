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
        <div className="flex items-center gap-4">
          <span className="text-white font-sans uppercase tracking-[0.3em] text-sm sm:text-base">
            Miradiance
          </span>
        </div>

        <button
          type="button"
          className="sm:hidden flex flex-col justify-center gap-1.5 p-2 text-white focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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

        <div className="hidden sm:flex w-full justify-center">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-white text-[0.65rem] sm:text-xs md:text-sm font-sans uppercase tracking-[0.2em] hover:text-[#c58c5a] transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c58c5a] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:block w-6" />
      </div>

      {menuOpen && (
        <div className="sm:hidden absolute inset-x-0 top-full bg-black/95 border-t border-white/10 text-center py-4">
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
