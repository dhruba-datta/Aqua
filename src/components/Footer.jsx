export default function Footer() {
  return (
    <footer className="bg-dark text-white/50 py-12 border-t border-white/5">
      <div className="mx-auto px-6 sm:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white font-black tracking-tighter text-2xl">SALIENT</div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Salient Agency. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-semibold uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
