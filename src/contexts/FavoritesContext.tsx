import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string, title?: string) => void;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'priceless-gallery-favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  const toggleFavorite = useCallback((id: string, title?: string) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(id);
      
      if (isCurrentlyFavorite) {
        // Remove from favorites
        toast({
          title: "Removed from Collection",
          description: title ? `"${title}" has been removed from your collection.` : "Artwork removed from your collection.",
          duration: 2000,
        });
        return prev.filter(favId => favId !== id);
      } else {
        // Add to favorites
        toast({
          title: "Added to Collection",
          description: title ? `"${title}" has been saved to your collection.` : "Artwork saved to your collection.",
          duration: 2000,
        });
        return [...prev, id];
      }
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    toast({
      title: "Collection Cleared",
      description: "All artworks have been removed from your collection.",
      duration: 2000,
    });
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
