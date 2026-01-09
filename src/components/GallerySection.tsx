import React from 'react';
import ArtworkCard from './ArtworkCard';
import { ArtworkItem } from '@/data/galleryData';

interface GallerySectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  artworks: ArtworkItem[];
  variant: 'pillar' | 'obsidian' | 'crystal' | 'marble';
  onArtworkClick: (artwork: ArtworkItem) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  id,
  title,
  subtitle,
  description,
  artworks,
  variant,
  onArtworkClick
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'pillar':
        return {
          bg: 'bg-gradient-to-b from-obsidian via-obsidian-light/20 to-obsidian',
          accent: 'text-amber-400',
          border: 'border-amber-400/20',
          text: 'text-stone-200',
          subtext: 'text-stone-500',
          label: 'Foundation & Structure'
        };
      case 'obsidian':
        return {
          bg: 'gradient-obsidian',
          accent: 'text-gold',
          border: 'border-gold/20',
          text: 'text-stone-200',
          subtext: 'text-stone-500',
          label: 'Descent & Release'
        };
      case 'crystal':
        return {
          bg: 'gradient-crystal',
          accent: 'text-crystal-teal',
          border: 'border-crystal-teal/20',
          text: 'text-stone-200',
          subtext: 'text-stone-500',
          label: 'Recognition & Emergence'
        };
      case 'marble':
        return {
          bg: 'gradient-marble',
          accent: 'text-gold',
          border: 'border-gold/30',
          text: 'text-stone-800',
          subtext: 'text-stone-600',
          label: 'Integration & Governance'
        };
      default:
        return {
          bg: 'bg-obsidian',
          accent: 'text-gold',
          border: 'border-gold/20',
          text: 'text-stone-200',
          subtext: 'text-stone-500',
          label: ''
        };
    }
  };

  const styles = getVariantStyles();

  // Determine grid columns based on number of artworks
  const getGridCols = () => {
    if (artworks.length <= 4) return 'md:grid-cols-2 lg:grid-cols-4';
    if (artworks.length <= 7) return 'md:grid-cols-3 lg:grid-cols-4';
    if (artworks.length <= 9) return 'md:grid-cols-3 lg:grid-cols-3';
    return 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
  };

  return (
    <section id={id} className={`relative py-24 md:py-32 ${styles.bg}`}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="max-w-2xl">
          {/* Movement Number */}
          <p className={`font-sans text-xs tracking-[0.3em] uppercase ${styles.accent} mb-4`}>
            {subtitle}
          </p>
          
          {/* Title */}
          <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl ${styles.text} mb-6`}>
            {title}
          </h2>
          
          {/* Description */}
          <p className={`font-sans text-base leading-relaxed ${styles.subtext}`}>
            {description}
          </p>

          {/* Decorative Element */}
          <div className={`mt-8 w-24 h-px ${styles.border} border-t`} />
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${getGridCols()} gap-6 md:gap-8`}>
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onClick={() => onArtworkClick(artwork)}
            />
          ))}
        </div>
      </div>

      {/* Section Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className={`flex items-center justify-center gap-4 pt-8 border-t ${styles.border}`}>
          <span className={`font-sans text-xs tracking-wider ${styles.subtext}`}>
            {artworks.length} {artworks.length === 1 ? 'Work' : 'Works'}
          </span>
          <div className={`w-1 h-1 rounded-full ${variant === 'marble' ? 'bg-gold/50' : variant === 'pillar' ? 'bg-amber-400/50' : 'bg-gold/30'}`} />
          <span className={`font-sans text-xs tracking-wider ${styles.subtext}`}>
            {styles.label}
          </span>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
