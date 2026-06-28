import { useEffect, useRef } from 'react';

const products = [
  {
    name: 'Golden Aura',
    category: 'Eau de Parfum',
    image: '/images/perfume-1.jpg',
    id: 'perfumes',
  },
  {
    name: 'Midnight Silk',
    category: 'Regenerating Serum',
    image: '/images/skincare-1.jpg',
    id: 'skincare',
  },
  {
    name: 'Amber Rose',
    category: 'Eau de Toilette',
    image: '/images/perfume-1.jpg',
    id: 'perfumes',
  },
  {
    name: 'Velvet Glow',
    category: 'Hydrating Cream',
    image: '/images/skincare-1.jpg',
    id: 'skincare',
  },
];

export default function ProductGrid() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-white" style={{ paddingTop: '128px', paddingBottom: '128px' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="mb-16">
          <h2
            className="font-serif text-black"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
          >
            Our Collection
          </h2>
          <p className="text-[#666666] text-base mt-4 max-w-xl">
            Discover our curated selection of luxury perfumes and skincare, crafted for those who demand the extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
              style={{
                opacity: 0,
                transform: 'scale(0.95)',
                transition: `all 0.8s ease-out ${i * 0.15}s`,
              }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-2xl text-black">{product.name}</h3>
                <p className="text-[#666666] text-sm mt-1">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
