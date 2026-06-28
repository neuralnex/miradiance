export default function Marquee() {
  const items = ['WHOLESALE & RETAIL', 'PREMIUM FRAGRANCES', 'EXCLUSIVE DISTRIBUTOR'];
  const separator = ' \u2022 ';

  const renderItems = () => (
    <>
      {items.map((item, i) => (
        <span key={i} className="marquee-item">
          {item}{separator}
        </span>
      ))}
    </>
  );

  return (
    <div className="marquee-container" style={{ backgroundColor: '#f3f0ea', paddingTop: '1rem', paddingBottom: '1rem' }}>
      <div className="flex w-max animate-marquee">
        <div className="marquee-track flex w-max" style={{ willChange: 'transform' }}>
          {renderItems()}
          {renderItems()}
          {renderItems()}
          {renderItems()}
        </div>
        <div className="marquee-track flex w-max" style={{ willChange: 'transform' }}>
          {renderItems()}
          {renderItems()}
          {renderItems()}
          {renderItems()}
        </div>
      </div>

      <style>{`
        .marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .marquee-item {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.5rem, 5vw, 4rem);
          text-transform: uppercase;
          color: #000;
          white-space: nowrap;
          padding-right: 1rem;
          letter-spacing: -0.02em;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
