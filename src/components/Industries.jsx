const industries = [
  {
    num: '01',
    name: 'FMCG',
    desc: 'Product launches, retail activation, and performance-led brand growth.',
  },
  {
    num: '02',
    name: 'Corporate & Multinational',
    desc: 'Internal rollouts, annual summits, and brand system development.',
  },
  {
    num: '03',
    name: 'Hospitality & HORECA',
    desc: 'Venue storytelling, guest experience, and property activations.',
  },
  {
    num: '04',
    name: 'Sports & Entertainment',
    desc: 'Fan engagement, sponsorship campaigns, and live event production.',
  },
  {
    num: '05',
    name: 'Government & Institutional',
    desc: 'Public programs, policy campaigns, and infrastructure storytelling.',
  },
];

export default function Industries() {
  return (
    <section className="py-20 md:py-32 text-black" id="industries">
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M12 2v20M2 12h20" /></svg>
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">Industries We Serve</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
              Trusted across sectors.
            </h2>
          </div>
          <p className="text-[1rem] md:text-[1.125rem] leading-[1.55] text-black/60 max-w-sm md:mb-3">
            Five sectors. One consistent standard. Whatever the industry, the craft and discipline stay the same.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10 rounded-2xl overflow-hidden">
          {industries.map((ind) => (
            <div
              key={ind.num}
              className="group bg-white p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[260px] transition-colors duration-300 hover:bg-black hover:text-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-widest uppercase opacity-40 group-hover:opacity-60">
                  {ind.num}
                </span>
                <span className="w-6 h-6 rounded-full border border-black/20 group-hover:border-white/40 flex items-center justify-center transition-colors">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover:opacity-100 transition-opacity">
                    <path d="M4 12L12 4M12 4H6M12 4V10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div>
                <h3 className="text-[1.375rem] md:text-[1.625rem] font-medium tracking-tight leading-[1.1] mb-2">
                  {ind.name}
                </h3>
                <p className="text-[0.9rem] md:text-[0.95rem] leading-[1.5] opacity-55 group-hover:opacity-75">
                  {ind.desc}
                </p>
              </div>
            </div>
          ))}

          {/* CTA tile to complete the grid */}
          <a
            href="#contact"
            className="group bg-[#0891b2] text-white p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[260px] transition-colors duration-300 hover:bg-black"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest uppercase opacity-70">
                Next
              </span>
              <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <path d="M4 12L12 4M12 4H6M12 4V10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div>
              <h3 className="text-[1.375rem] md:text-[1.625rem] font-medium tracking-tight leading-[1.1] mb-2">
                Your sector?
              </h3>
              <p className="text-[0.9rem] md:text-[0.95rem] leading-[1.5] opacity-80">
                Tell us where you&apos;re headed — we&apos;ll build the experience around it.
              </p>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
