import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoritesContext';
import { allArtworks, ArtworkItem, TOTAL_PLATES } from '@/data/galleryData';
import ArtworkCard from '@/components/ArtworkCard';
import ArtworkModal from '@/components/ArtworkModal';

const MyCollection: React.FC = () => {
  const { favorites, clearFavorites, favoritesCount } = useFavorites();
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pillar' | 'obsidian' | 'crystal' | 'marble'>('all');

  // Get favorite artworks
  const favoriteArtworks = allArtworks.filter(artwork => favorites.includes(artwork.id));
  
  // Apply filter
  const filteredArtworks = filter === 'all' 
    ? favoriteArtworks 
    : favoriteArtworks.filter(artwork => artwork.category === filter);

  // Count by category
  const pillarCount = favoriteArtworks.filter(a => a.category === 'pillar').length;
  const obsidianCount = favoriteArtworks.filter(a => a.category === 'obsidian').length;
  const crystalCount = favoriteArtworks.filter(a => a.category === 'crystal').length;
  const marbleCount = favoriteArtworks.filter(a => a.category === 'marble').length;

  const handleArtworkClick = (artwork: ArtworkItem) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArtwork(null), 300);
  };

  return (
    <div className="min-h-screen bg-obsidian text-stone-200">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-obsidian/95 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          {/* Back to Gallery */}
          <Link 
            to="/" 
            className="group flex items-center gap-3 text-stone-400 hover:text-gold transition-colors duration-300"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-sans text-sm tracking-wider">Return to Gallery</span>
          </Link>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <svg viewBox="0 0 40 40" className="w-10 h-10 text-gold">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
              <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" />
              <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
              <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.7" />
            </svg>
          </Link>

          {/* Collection Count */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold fill-gold" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="font-sans text-sm text-gold">{favoritesCount}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-4">
              Your Sacred Collection
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-200 mb-6">
              My Collection
            </h1>
            <p className="font-sans text-base text-stone-500 max-w-xl mx-auto">
              {favoritesCount === 0 
                ? "Begin your journey through the gallery and save works that resonate with your path."
                : `${favoritesCount} ${favoritesCount === 1 ? 'work' : 'works'} saved from The Measures of Inanna.`
              }
            </p>

            {/* Category Stats */}
            {favoritesCount > 0 && (
              <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <span className="font-sans text-sm text-amber-400">{pillarCount}</span>
                  </div>
                  <p className="font-sans text-xs text-stone-500">Pillars</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <span className="font-sans text-sm text-gold">{obsidianCount}</span>
                  </div>
                  <p className="font-sans text-xs text-stone-500">Gates</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-crystal-teal/10 border border-crystal-teal/30 flex items-center justify-center">
                    <span className="font-sans text-sm text-crystal-teal">{crystalCount}</span>
                  </div>
                  <p className="font-sans text-xs text-stone-500">Epithets</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <span className="font-sans text-sm text-gold">{marbleCount}</span>
                  </div>
                  <p className="font-sans text-xs text-stone-500">MEs</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Filter & Actions */}
        {favoritesCount > 0 && (
          <section className="py-8 border-y border-gold/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {[
                  { id: 'all', label: 'All', count: favoritesCount, color: 'gold' },
                  { id: 'pillar', label: 'Pillars', count: pillarCount, color: 'amber-400' },
                  { id: 'obsidian', label: 'Gates', count: obsidianCount, color: 'gold' },
                  { id: 'crystal', label: 'Epithets', count: crystalCount, color: 'crystal-teal' },
                  { id: 'marble', label: 'MEs', count: marbleCount, color: 'gold' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id as typeof filter)}
                    disabled={tab.count === 0 && tab.id !== 'all'}
                    className={`px-4 py-2 rounded-sm font-sans text-xs tracking-wider uppercase transition-all duration-300 ${
                      filter === tab.id 
                        ? tab.color === 'crystal-teal' 
                          ? 'bg-crystal-teal/20 text-crystal-teal border border-crystal-teal/30' 
                          : tab.color === 'amber-400'
                            ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                            : 'bg-gold/20 text-gold border border-gold/30'
                        : tab.count === 0 && tab.id !== 'all'
                          ? 'text-stone-600 cursor-not-allowed'
                          : 'text-stone-500 hover:text-stone-300 border border-transparent'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Clear All Button */}
              <button
                onClick={clearFavorites}
                className="flex items-center gap-2 px-4 py-2 text-stone-500 hover:text-red-400 transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="font-sans text-xs tracking-wider">Clear Collection</span>
              </button>
            </div>
          </section>
        )}

        {/* Artworks Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredArtworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    onClick={() => handleArtworkClick(artwork)}
                  />
                ))}
              </div>
            ) : favoritesCount > 0 ? (
              // No results for current filter
              <div className="text-center py-16">
                <p className="font-sans text-stone-500">
                  No {filter === 'pillar' ? 'Pillars' : filter === 'obsidian' ? 'Gates' : filter === 'crystal' ? 'Epithets' : 'MEs'} in your collection.
                </p>
                <button
                  onClick={() => setFilter('all')}
                  className="mt-4 text-gold hover:text-gold-soft transition-colors"
                >
                  View all saved works
                </button>
              </div>
            ) : (
              // Empty state
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-stone-300 mb-4">
                  Your Collection Awaits
                </h2>
                <p className="font-sans text-stone-500 max-w-md mx-auto mb-8">
                  As you journey through the gallery, save works that speak to you by clicking the heart icon on any artwork.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gold/10 border border-gold/40 rounded-sm text-gold hover:bg-gold/20 transition-all duration-300"
                >
                  <span className="font-sans text-sm tracking-wider">Begin Your Journey</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Journey Progress */}
        {favoritesCount > 0 && (
          <section className="py-16 border-t border-gold/10">
            <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-4">
                Your Journey Progress
              </p>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-obsidian-light rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-gold to-crystal-teal rounded-full transition-all duration-500"
                  style={{ width: `${(favoritesCount / TOTAL_PLATES) * 100}%` }}
                />
              </div>
              
              <p className="font-sans text-sm text-stone-500">
                {favoritesCount} of {TOTAL_PLATES} works collected ({Math.round((favoritesCount / TOTAL_PLATES) * 100)}%)
              </p>

              {favoritesCount === TOTAL_PLATES && (
                <div className="mt-8 p-6 bg-gold/10 border border-gold/30 rounded-sm">
                  <p className="font-serif text-lg text-gold">
                    The journey is complete. All {TOTAL_PLATES} works are in your collection.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="font-sans text-xs text-stone-600">
            The Priceless Gallery — Art That Signals Value
          </p>
        </div>
      </footer>

      {/* Artwork Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MyCollection;
