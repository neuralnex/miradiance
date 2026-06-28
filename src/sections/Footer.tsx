export default function Footer() {
  return (
    <footer id="wholesale" className="relative w-full bg-black text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
            >
              Get in Touch
            </h2>
            <p className="text-[#666666] text-base mt-6 max-w-md">
              Whether you are looking for wholesale partnerships or retail purchases, we are here to help you discover luxury.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-6">
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-white text-sm uppercase tracking-[0.15em] hover:text-[#c58c5a] transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-white text-sm uppercase tracking-[0.15em] hover:text-[#c58c5a] transition-colors duration-300"
              >
                Email
              </a>
              <a
                href="#"
                className="text-white text-sm uppercase tracking-[0.15em] hover:text-[#c58c5a] transition-colors duration-300"
              >
                Shipping Policy
              </a>
              <a
                href="#"
                className="text-white text-sm uppercase tracking-[0.15em] hover:text-[#c58c5a] transition-colors duration-300"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666666] text-sm tracking-[0.2em] uppercase">
            Miradiance &copy; 2026
          </p>
          <p className="text-[#666666] text-xs">
            Luxury Perfumes & Skincare — Wholesale and Retail
          </p>
        </div>
      </div>
    </footer>
  );
}
