const reasons = [
  'Multi-disciplinary expertise — Architecture, Marketing & Tech',
  'Data-driven creative decisions',
  'Hyper-realistic visualization before execution',
  'End-to-end project ownership',
  'Built for scale, speed, and impact',
];

export default function WhyAqua() {
  return (
    <section className="py-20 md:py-32 text-black" id="why">
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="md:col-span-4 md:sticky md:top-32">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#0891b2]"></span>
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">Why AQUA</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
              What sets us apart.
            </h2>
          </div>

          <ul className="md:col-span-8 flex flex-col divide-y divide-black/10 border-y border-black/10">
            {reasons.map((r, i) => (
              <li
                key={r}
                className="group flex items-center gap-6 md:gap-8 py-5 md:py-7 transition-all duration-400 hover:pl-3"
              >
                <span className="text-[11px] font-bold tracking-widest opacity-30 shrink-0 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[1.125rem] sm:text-[1.35rem] md:text-[1.5rem] lg:text-[1.75rem] font-medium leading-[1.2] tracking-tight md:whitespace-nowrap">
                  {r}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
