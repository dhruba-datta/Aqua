const layers = [
  {
    num: '01',
    title: 'Insight',
    tag: 'Listen',
    desc: 'Deep understanding of audience psychology — what moves them, what holds them back, and the quiet tensions that shape every decision.',
  },
  {
    num: '02',
    title: 'Strategy',
    tag: 'Define',
    desc: 'A clear, measurable roadmap aligned to business outcomes — not vanity metrics. Every move has a reason, every spend has a number.',
  },
  {
    num: '03',
    title: 'Design',
    tag: 'Shape',
    desc: 'Aesthetic and functional excellence held in balance. Every pixel, every surface, every interaction considered, refined, and tuned until inevitable.',
  },
  {
    num: '04',
    title: 'Execution',
    tag: 'Deliver',
    desc: 'Precision-driven delivery under real-world constraints. Every touchpoint intentional, every detail engineered, every timeline honored — nothing left to chance.',
  },
];

export default function Approach() {
  return (
    <section className="py-20 md:py-32 text-black" id="approach">
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M12 2v20M2 12h20" /></svg>
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">Our Approach</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
              A four-layer system <br className="hidden md:block" />built for clarity.
            </h2>
          </div>
          <p className="text-[1rem] md:text-[1.125rem] leading-[1.55] text-black/60 max-w-sm md:mb-3">
            Every touchpoint is intentional. Every detail engineered. Nothing is accidental — and nothing is decoration.
          </p>
        </div>

        {/* Process flow */}
        <div className="max-w-5xl mx-auto">
          {layers.map((l) => (
            <div
              key={l.num}
              className="group relative grid grid-cols-12 gap-y-3 md:gap-x-6 items-start md:items-center py-7 md:py-10 border-t border-black/15 last:border-b"
            >
              {/* Number */}
              <div className="col-span-12 md:col-span-2 flex items-center">
                <span className="text-[11px] md:text-[12px] font-bold tracking-widest uppercase opacity-40 whitespace-nowrap">
                  {l.num} &middot; {l.tag}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-medium tracking-tight leading-[1]">
                  {l.title}
                </h3>
              </div>

              {/* Description */}
              <p className="col-span-12 md:col-span-6 text-[0.95rem] md:text-[1.05rem] leading-[1.55] text-black/60">
                {l.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
