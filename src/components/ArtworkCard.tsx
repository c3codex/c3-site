import React from 'react';
import { ArtworkItem } from '@/data/galleryData';

interface ArtworkCardProps {
  artwork: ArtworkItem;
  onClick: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => {
  const getCategoryStyles = () => {
    switch (artwork.category) {
      case 'pillar':
        return { glow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.15)]', border: 'hover:border-amber-400/30', accent: 'text-amber-400', bg: 'bg-obsidian-light', label: 'Pillar' };
      case 'obsidian':
        return { glow: 'hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]', border: 'hover:border-gold/30', accent: 'text-gold-soft', bg: 'bg-obsidian-light', label: 'Gate' };
      case 'crystal':
        return { glow: 'hover:shadow-[0_0_40px_rgba(45,212,191,0.15)]', border: 'hover:border-crystal-teal/30', accent: 'text-crystal-teal', bg: 'bg-[#0f1420]', label: 'Epithet' };
      case 'marble':
        return { glow: 'hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]', border: 'hover:border-gold/40', accent: 'text-gold', bg: 'bg-white', label: 'ME' };
      default:
        return { glow: '', border: '', accent: 'text-gold', bg: 'bg-obsidian-light', label: '' };
    }
  };

  const styles = getCategoryStyles();
  const isMarble = artwork.category === 'marble';

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`relative w-full text-left overflow-hidden rounded-sm border border-transparent transition-all duration-700 ease-out ${styles.glow} ${styles.border} ${styles.bg} focus:outline-none focus:ring-1 focus:ring-gold/30`}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isMarble
                ? 'bg-gradient-to-t from-white via-transparent to-transparent opacity-60 group-hover:opacity-40'
                : 'bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50'
            }`}
          />
          <div
            className={`absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full ${
              isMarble ? 'bg-white/80 text-stone-800' : 'bg-black/50 text-stone-300'
            } text-xs font-sans backdrop-blur-sm`}
          >
            {artwork.order}
          </div>
        </div>

        <div className={`p-5 ${isMarble ? 'text-stone-800' : 'text-stone-200'}`}>
          <span className={`text-[10px] tracking-[0.25em] uppercase ${styles.accent} font-sans`}>
            {styles.label}
          </span>

          <h3 className="font-serif text-lg mt-1 mb-1">
            {artwork.title}
          </h3>

          {artwork.subtitle && (
            <p className="text-xs font-sans opacity-60">
              {artwork.subtitle}
            </p>
          )}

          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className={`text-xs tracking-wider ${styles.accent} font-sans`}>Enter</span>
            <svg className={`w-4 h-4 ${styles.accent} transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ArtworkCard;
