const pillars = [
  {
    num: '01',
    title: 'Architecture',
    meets: 'Storytelling',
    desc: 'Spaces that narrate, not just host. Every surface carries intent.',
  },
  {
    num: '02',
    title: 'Data',
    meets: 'Creativity',
    desc: 'Insight informs every frame. We design with evidence, not guesswork.',
  },
  {
    num: '03',
    title: 'Strategy',
    meets: 'Execution',
    desc: 'Ideas are only as good as their delivery. We own both ends.',
  },
];

export default function About() {
  return (
    <section className="py-20 md:py-32 text-black" id="about">
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M12 2v20M2 12h20" /></svg>
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">About AQUA</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
              A story built on clarity, innovation &amp; precision.
            </h2>
          </div>
          <div className="flex gap-8 sm:gap-10 shrink-0 text-[11px] sm:text-[12px] font-bold tracking-widest uppercase md:mb-3">
            <div className="flex flex-col gap-1">
              <span className="opacity-50">Est.</span>
              <span>2025</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-50">Based</span>
              <span>Dhaka, BD</span>
            </div>
          </div>
        </div>

        {/* Statement + narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center mb-20 md:mb-28">
          <div className="md:col-span-6 md:order-1 text-[1rem] md:text-[1.125rem] leading-[1.6] text-black/65 space-y-5 max-w-xl">
            <p>
              Founded in 2025 in Dhaka, AQUA Innovations was born from a simple yet powerful philosophy. The name represents <span className="text-black font-medium">transparency, fluidity, and adaptability</span> — the principles that define how we approach every project.
            </p>
            <p>
              We don&apos;t operate like a typical agency. We function as a <span className="text-black font-medium">multi-disciplinary experience lab</span> where disciplines overlap by design, not by accident.
            </p>
          </div>
          <div className="md:col-span-6 md:order-2 md:-mt-8 md:pl-8 md:border-l border-black/15">
            <p className="text-[1.5rem] sm:text-[1.875rem] md:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.1] tracking-tight">
              Clarity creates trust.{' '}
              <span className="text-black/35">Innovation creates impact.</span>
            </p>
          </div>
        </div>

        {/* Pillars — editorial row list */}
        <div className="mb-20 md:mb-28 max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-6 md:mb-8">
            <p className="text-[13px] font-bold tracking-widest uppercase opacity-50">How we work</p>
            <p className="text-[13px] font-bold tracking-widest uppercase opacity-30 hidden md:block">03 principles</p>
          </div>
          <div className="border-t border-black/15">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="group grid grid-cols-12 gap-4 md:gap-8 items-center py-6 md:py-8 px-4 md:px-10 border-b border-black/15 transition-colors duration-400 hover:bg-black/[0.03]"
              >
                <span className="col-span-2 md:col-span-1 text-[11px] md:text-[12px] font-bold tracking-widest uppercase opacity-40">
                  {p.num}
                </span>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-medium tracking-tight leading-[1] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-[0.95rem] md:text-[1rem] opacity-45">
                    meets {p.meets}
                  </p>
                </div>
                <p className="col-span-12 md:col-span-7 text-[0.95rem] md:text-[1rem] leading-[1.5] text-black/60">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <p className="md:col-span-8 text-[1.25rem] sm:text-[1.5rem] md:text-[1.875rem] font-medium leading-[1.3] tracking-tight">
            From brand activations to digital ecosystems, <span className="text-black/45">we design end-to-end experiences that shape perception and drive action.</span>
          </p>
          <a
            href="#services"
            className="md:col-span-4 inline-flex items-center gap-3 text-[13px] font-bold tracking-widest uppercase md:justify-end group"
          >
            <span className="group-hover:translate-x-1 transition-transform">See our services</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
