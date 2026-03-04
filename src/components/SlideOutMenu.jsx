const menuLinks = [
  { label: "Index", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function SlideOutMenu({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[999] transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <nav className={`fixed top-0 right-0 h-screen w-full max-w-[500px] bg-dark z-[1000] flex flex-col justify-center px-10 md:px-20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button 
          className="absolute top-1/2 -left-8 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center text-black z-10 shadow-2xl hover:scale-110 transition-transform" 
          onClick={onClose} 
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <ul className="flex flex-col gap-4">
          {menuLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                onClick={onClose} 
                className="text-fluid-h2 font-semibold text-white hover:underline underline-offset-8 hover:pl-4 transition-all duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
