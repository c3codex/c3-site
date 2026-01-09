import React, { useEffect } from 'react';
import { ArtworkItem } from '@/data/galleryData';
import { X } from 'lucide-react';

interface ArtworkModalProps {
  artwork: ArtworkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !artwork) return null;

  const getCategoryStyles = () => {
    switch (artwork.category) {
      case 'pillar':
        return { bg: 'bg-gradient-to-b from-obsidian via-amber-950/10 to-obsidian', text: 'text-stone-200', accent: 'text-amber-400', border: 'border-amber-400/20', label: 'Obsidian Pillar' };
      case 'obsidian':
        return { bg: 'bg-obsidian', text: 'text-stone-200', accent: 'text-gold', border: 'border-gold/20', label: 'Obsidian Gate' };
      case 'crystal':
        return { bg: 'bg-gradient-to-b from-[#0a0a0f] via-[#0f1420] to-[#151525]', text: 'text-stone-200', accent: 'text-crystal-teal', border: 'border-crystal-teal/20', label: 'Crystal Epithet' };
      case 'marble':
        return { bg: 'bg-marble', text: 'text-stone-800', accent: 'text-gold', border: 'border-gold/30', label: 'Marble ME' };
      default:
        return { bg: 'bg-obsidian', text: 'text-stone-200', accent: 'text-gold', border: 'border-gold/20', label: '' };
    }
  };

  const styles = getCategoryStyles();
  const isMarble = artwork.category === 'marble';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-500" />

      <div
        className={`relative w-full max-w-5xl max-h-[90vh] mx-4 overflow-y-auto ${styles.bg} ${styles.text} rounded-sm shadow-2xl transition-all duration-500`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-6 right-6 z-10">
          <button onClick={onClose} className={`p-2 ${styles.accent} hover:opacity-70 transition-opacity duration-300`} aria-label="Close">
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[600px]">
            <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className={`text-xs tracking-[0.3em] uppercase ${styles.accent} mb-4 font-sans`}>
              {styles.label}
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-light mb-2">
              {artwork.title}
            </h2>

            {artwork.subtitle && (
              <p className={`text-sm ${styles.accent} mb-6 font-sans tracking-wide`}>
                {artwork.subtitle}
              </p>
            )}

            <div className={`w-16 h-px ${styles.border} border-t mb-6`} />

            <p className="font-sans text-base leading-relaxed opacity-80 mb-8">
              {artwork.description}
            </p>

            {artwork.invocation && (
              <div className={`border-l-2 ${styles.border} pl-6 mb-8`}>
                <p className="font-serif text-lg italic opacity-90">"{artwork.invocation}"</p>
              </div>
            )}

            {artwork.reflection && (
              <div className={`${isMarble ? 'bg-stone-100' : 'bg-white/5'} p-6 rounded-sm`}>
                <span className={`text-xs tracking-[0.2em] uppercase ${styles.accent} mb-2 block font-sans`}>
                  Reflection
                </span>
                <p className="font-sans text-sm leading-relaxed opacity-80">
                  {artwork.reflection}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
