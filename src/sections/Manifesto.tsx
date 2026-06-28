import { useEffect, useRef } from 'react';

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-black text-white"
      style={{ paddingTop: '128px', paddingBottom: '128px' }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <p
          ref={textRef}
          className="font-serif uppercase leading-[1.1] opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          At Miradiance, we believe that scent is the most powerful form of memory. We curate the world's finest fragrances and skincare, bringing luxury directly to you.
        </p>
      </div>
    </section>
  );
}
