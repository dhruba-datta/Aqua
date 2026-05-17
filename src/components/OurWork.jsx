import { useState } from 'react';

// Replace with the YouTube video ID (the part after youtu.be/ or v=).
const YOUTUBE_ID = 'oWgvKzVE6sg';

export default function OurWork() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-20 md:py-32 text-black" id="our-work">
      <div className="mx-auto px-6 sm:px-12 lg:px-32 max-w-[1600px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
                aria-hidden="true"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-50">
                Our Work
              </span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight">
              Our work, <span className="text-black/40">in motion.</span>
            </h2>
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/5">
          {!YOUTUBE_ID ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[13px] font-bold tracking-widest uppercase opacity-30">
                Video coming soon
              </span>
            </div>
          ) : playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
              title="Our Work"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer"
              aria-label="Play video"
            >
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                draggable="false"
              />
              <span className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/25" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 md:h-20 md:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
