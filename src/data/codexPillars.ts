/**
 * THE FOUR CODEXSTONE PILLARS
 * Canonical definitions - single source of truth
 */

export type PillarId = 'measures' | 'c3' | 'gallery' | 'restore';

export interface Pillar {
  id: PillarId;
  name: string;
  subtitle: string;
  path: string;
  cardinal: 'north' | 'east' | 'south' | 'west';
  description: string;
  sealed?: boolean; // measures temple is sealed
}

export const PILLARS: Record<PillarId, Pillar> = {
  measures: {
    id: 'measures',
    name: 'Measures of Inanna',
    subtitle: 'spark',
    path: '/measures',
    cardinal: 'north',
    description: 'The living codex. Seven Obsidian Gates, Nine Crystal Epithets, Thirteen Marble MEs.',
    sealed: true
  },
  
  c3: {
    id: 'c3',
    name: 'c3 Model',
    subtitle: 'weave',
    path: '/c3',
    cardinal: 'west',
    description: 'Connect • Contribute • Create. The circulation law that governs how value flows.'
  },
  
  gallery: {
    id: 'gallery',
    name: "Artists' Gallery",
    subtitle: 'field',
    path: '/gallery',
    cardinal: 'east',
    description: 'Encounter without demand. The body of work in the world.'
  },
  
  restore: {
    id: 'restore',
    name: 'Commons & Restoration',
    subtitle: 'form',
    path: '/restore',
    cardinal: 'south',
    description: 'Where value lands. c3 Community Partners DAO, commons governance, restoration pathways.'
  }
};

// Convenience accessors
export const getPillar = (id: PillarId): Pillar => PILLARS[id];
export const getAllPillars = (): Pillar[] => Object.values(PILLARS);
export const getPillarByPath = (path: string): Pillar | undefined => 
  getAllPillars().find(p => p.path === path);

// The inscription
export const CODEXSTONE_INSCRIPTION = 
  "In spark, weave, field, and form — the stone remembers.";