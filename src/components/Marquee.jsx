const clients = [
  'Acme Corp', 'Designlab', 'Flowstate', 'Luminary', 'NovaBrand',
  'Pulse Studio', 'Radiance', 'Skyline', 'Vertex', 'Wavelength',
];

export default function Marquee() {
  const doubled = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="bg-dark py-12 md:py-20 overflow-hidden border-y border-white/5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((client, i) => (
          <span key={i} className="flex items-center text-fluid-marquee font-bold uppercase tracking-tighter text-white/20 hover:text-white transition-colors duration-500 px-10">
            {client}
            <span className="ml-10 text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
