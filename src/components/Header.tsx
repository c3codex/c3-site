import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', ring: null },
    { id: 'pillars', label: 'Foundation', ring: 'pillars' },
    { id: 'obsidian', label: 'Descent', ring: 'outer' },
    { id: 'crystal', label: 'Recognition', ring: 'middle' },
    { id: 'marble', label: 'Integration', ring: 'inner' },
    { id: 'contribute', label: 'Contribute', ring: null },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled ? 'bg-obsidian/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="group relative w-10 h-10"
          aria-label="Return to beginning"
        >
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full text-gold transition-all duration-500 group-hover:scale-110"
          >
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
            <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" />
            <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
            <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.7" />
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          <div className="relative flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group relative px-4 py-2"
              >
                {item.ring && (
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ${
                      hoveredItem === item.id || currentSection === item.id
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75'
                    }`}
                  >
                    <svg
                      viewBox="0 0 60 60"
                      className={`w-12 h-12 ${
                        item.id === 'crystal'
                          ? 'text-crystal-teal'
                          : item.id === 'pillars'
                          ? 'text-amber-400'
                          : 'text-gold'
                      }`}
                    >
                      {item.ring === 'pillars' ? (
                        <>
                          <rect x="12" y="20" width="4" height="20" fill="currentColor" opacity="0.4" rx="1" />
                          <rect x="24" y="20" width="4" height="20" fill="currentColor" opacity="0.4" rx="1" />
                          <rect x="36" y="20" width="4" height="20" fill="currentColor" opacity="0.4" rx="1" />
                          <rect x="48" y="20" width="4" height="20" fill="currentColor" opacity="0.4" rx="1" />
                        </>
                      ) : (
                        <circle
                          cx="30"
                          cy="30"
                          r={item.ring === 'outer' ? 28 : item.ring === 'middle' ? 20 : 12}
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                          opacity="0.4"
                        />
                      )}
                    </svg>
                  </div>
                )}

                <span
                  className={`relative z-10 text-xs font-sans tracking-[0.15em] uppercase transition-all duration-300 ${
                    currentSection === item.id
                      ? item.id === 'crystal'
                        ? 'text-crystal-teal'
                        : 'text-gold'
                      : hoveredItem === item.id
                      ? 'text-stone-200'
                      : 'text-stone-500'
                  }`}
                >
                  {item.label}
                </span>

                {currentSection === item.id && (
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      item.id === 'crystal' ? 'bg-crystal-teal' : 'bg-gold'
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative w-8 h-8 text-stone-400 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 32 32" className="w-full h-full">
              {menuOpen ? (
                <>
                  <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="1" />
                  <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="1" />
                </>
              ) : (
                <>
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-obsidian/98 backdrop-blur-md border-t border-gold/10">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMenuOpen(false);
                }}
                className={`relative px-6 py-4 text-left transition-all duration-300 ${
                  currentSection === item.id
                    ? item.id === 'crystal'
                      ? 'text-crystal-teal'
                      : 'text-gold'
                    : 'text-stone-400'
                }`}
              >
                <div className="flex items-center gap-4">
                  {item.ring ? (
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-5 h-5 ${item.id === 'crystal' ? 'text-crystal-teal' : 'text-gold'}`}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r={item.ring === 'outer' ? 10 : item.ring === 'middle' ? 7 : 4}
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        opacity={currentSection === item.id ? 0.8 : 0.4}
                      />
                    </svg>
                  ) : (
                    <div className="w-5" />
                  )}

                  <span className="text-sm font-sans tracking-[0.15em] uppercase">{item.label}</span>
                </div>

                {currentSection === item.id && (
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 ${
                      item.id === 'crystal' ? 'bg-crystal-teal' : 'bg-gold'
                    }`}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
