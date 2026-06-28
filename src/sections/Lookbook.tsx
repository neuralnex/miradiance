import { useEffect, useRef } from 'react';

export default function Lookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
          }
        });
      },
      { threshold: 0.1 }
    );

    imagesRef.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      className="relative w-full bg-white"
      style={{ paddingTop: '128px', paddingBottom: '128px' }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="mb-16">
          <h2
            className="font-serif text-black"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
          >
            Lookbook
          </h2>
          <p className="text-[#666666] text-base mt-4 max-w-xl">
            Experience the art of luxury through our curated visual narratives.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large featured image - spans 2 cols, 2 rows */}
          <div
            ref={(el) => { imagesRef.current[0] = el; }}
            className="col-span-2 row-span-2 relative overflow-hidden group"
            style={{
              opacity: 0,
              transform: 'scale(0.95)',
              transition: 'all 1s ease-out',
              aspectRatio: '1/1',
            }}
          >
            <img
              src="/images/model-1.jpg"
              alt="Editorial"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            <span
              className="absolute bottom-6 left-6 font-serif text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', mixBlendMode: 'difference' }}
            >
              Radiance
            </span>
          </div>

          {/* Tall image */}
          <div
            ref={(el) => { imagesRef.current[1] = el; }}
            className="col-span-1 row-span-2 relative overflow-hidden group"
            style={{
              opacity: 0,
              transform: 'scale(0.95)',
              transition: 'all 1s ease-out 0.15s',
            }}
          >
            <img
              src="/images/perfume-1.jpg"
              alt="Perfume"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ aspectRatio: '3/4' }}
            />
          </div>

          {/* Square image */}
          <div
            ref={(el) => { imagesRef.current[2] = el; }}
            className="col-span-1 relative overflow-hidden group"
            style={{
              opacity: 0,
              transform: 'scale(0.95)',
              transition: 'all 1s ease-out 0.3s',
              aspectRatio: '1/1',
            }}
          >
            <img
              src="/images/skincare-1.jpg"
              alt="Skincare"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Wide image */}
          <div
            ref={(el) => { imagesRef.current[3] = el; }}
            className="col-span-1 relative overflow-hidden group"
            style={{
              opacity: 0,
              transform: 'scale(0.95)',
              transition: 'all 1s ease-out 0.45s',
              aspectRatio: '1/1',
            }}
          >
            <img
              src="/images/perfume-1.jpg"
              alt="Fragrance"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-serif text-white text-center"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', mixBlendMode: 'difference' }}
              >
                Elegance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
