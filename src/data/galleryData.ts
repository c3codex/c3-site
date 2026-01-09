// The Measures of Inanna - Gallery Data
// Complete Collection: 33 Plates 7 Obsidian Gates, 9 Crystal Epithets,13 Marble MEs
// Each plate has 2 aspects converting into Oracle Cards, Scroll Readings, and Breathworks
// Total: 99 Measures

export interface ArtworkItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  invocation?: string;
  reflection?: string;
  image: string;
  category: | 'obsidian' | 'crystal' | 'marble';
  order: number;
  aspects?: {
    oracle?: string;
    scroll?: string;
    breath?: string;
  };
}

// Collection Structure
export const collectionStructure = {
  totalPlates: 33,
  totalMeasures: 99,
  components: [
    { name: 'Cover', type: 'frame' },
    { name: 'Invocation', type: 'frame' },
    { name: 'Intentional Use', type: 'frame' },
    { name: 'Back Cover', type: 'frame' },

  { name: '7 Obsidian Gates', type: 'obsidian', count: 7 },
    { name: '9 Crystal Epithets', type: 'crystal', count: 9 },
    { name: '13 Marble MEs', type: 'marble', count: 13 }
  ],
  aspects: ['Oracle Cards', 'Scroll Readings', 'Breathworks']
};

// Seven Obsidian Gates - Descent & Release
export const obsidianGates: ArtworkItem[] = [
  {
    id: 'gate-1',
    title: 'The First Gate',
    subtitle: 'Crown of Identity',
    description: 'At the first gate, the crown is removed. Here we release the identity we have constructed — the titles, the roles, the names we answer to. What remains when you are no longer who you thought you were?',
    invocation: 'I release the crown I was given. I release the crown I made.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254324810_d868fffe.png',
    category: 'obsidian',
    order: 1,
    aspects: {
      oracle: 'The Uncrowned',
      scroll: 'Reading of Identity',
      breath: 'Breath of Release'
    }
  },
  {
    id: 'gate-2',
    title: 'The Second Gate',
    subtitle: 'Veil of Perception',
    description: 'At the second gate, the veil is lifted. We surrender our certainties — the stories we tell ourselves about how things are. What do you see when the familiar lens is removed?',
    invocation: 'I release the veil that shaped my seeing. I open to what is.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254321440_68705a60.png',
    category: 'obsidian',
    order: 2,
    aspects: {
      oracle: 'The Clear-Sighted',
      scroll: 'Reading of Perception',
      breath: 'Breath of Clarity'
    }
  },
  {
    id: 'gate-3',
    title: 'The Third Gate',
    subtitle: 'Necklace of Voice',
    description: 'At the third gate, the necklace is unclasped. We release the words we have spoken to protect ourselves — the agreements made in fear, the silences kept for safety.',
    invocation: 'I release the words that bound me. I speak from what is true.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254323335_190ec41b.jpg',
    category: 'obsidian',
    order: 3,
    aspects: {
      oracle: 'The Truth Speaker',
      scroll: 'Reading of Voice',
      breath: 'Breath of Expression'
    }
  },
  {
    id: 'gate-4',
    title: 'The Fourth Gate',
    subtitle: 'Breastplate of Protection',
    description: 'At the fourth gate, the breastplate falls away. We surrender the armor we built around our hearts — the defenses that kept us safe but also kept us separate.',
    invocation: 'I release the armor I forged in pain. I stand unguarded.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254332607_7bd6952b.png',
    category: 'obsidian',
    order: 4,
    aspects: {
      oracle: 'The Unarmored',
      scroll: 'Reading of Protection',
      breath: 'Breath of Vulnerability'
    }
  },
  {
    id: 'gate-5',
    title: 'The Fifth Gate',
    subtitle: 'Ring of Power',
    description: 'At the fifth gate, the ring is removed. We release our grip on control — the ways we have tried to shape outcomes, to guarantee safety, to hold the world in place.',
    invocation: 'I release my grip on what I cannot hold. I trust the current.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254324905_4990b981.png',
    category: 'obsidian',
    order: 5,
    aspects: {
      oracle: 'The Surrendered',
      scroll: 'Reading of Power',
      breath: 'Breath of Trust'
    }
  },
  {
    id: 'gate-6',
    title: 'The Sixth Gate',
    subtitle: 'Girdle of Measure',
    description: 'At the sixth gate, the girdle is loosened. We release the standards by which we have measured ourselves — the metrics of worth, the scales of enough.',
    invocation: 'I release the measure of my worth. I am not a sum.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254331798_94f81af3.png',
    category: 'obsidian',
    order: 6,
    aspects: {
      oracle: 'The Unmeasured',
      scroll: 'Reading of Worth',
      breath: 'Breath of Acceptance'
    }
  },
  {
    id: 'gate-7',
    title: 'The Seventh Gate',
    subtitle: 'Robe of the Body',
    description: 'At the seventh gate, the robe falls. We release our final covering — the last protection between self and void. Here, in the deepest dark, we meet what cannot be taken.',
    invocation: 'I release what covers me. I am present to the dark.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254327881_70cdff1a.jpg',
    category: 'obsidian',
    order: 7,
    aspects: {
      oracle: 'The Unveiled',
      scroll: 'Reading of Embodiment',
      breath: 'Breath of Presence'
    }
  }
];

// Nine Crystal Epithets - Recognition & Emergence
export const crystalEpithets: ArtworkItem[] = [
  {
    id: 'epithet-1',
    title: 'She Who Returns',
    subtitle: 'The First Epithet',
    description: 'From the depths, she rises. Not unchanged, but transformed. The return is not a reversal but a completion — carrying the dark into the light.',
    invocation: 'I return from the depths. I carry what I found there.',
    reflection: 'What have you brought back from your own descents?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254355792_e6d40dd8.png',
    category: 'crystal',
    order: 1,
    aspects: {
      oracle: 'The Returner',
      scroll: 'Reading of Completion',
      breath: 'Breath of Return'
    }
  },
  {
    id: 'epithet-2',
    title: 'She Who Sees',
    subtitle: 'The Second Epithet',
    description: 'Clarity emerges from surrender. When we stop looking for what we expect, we begin to see what is. Vision becomes reception.',
    invocation: 'I see without seeking. I receive what appears.',
    reflection: 'What becomes visible when you stop looking for something specific?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254356644_6f5ba3e0.png',
    category: 'crystal',
    order: 2,
    aspects: {
      oracle: 'The Seer',
      scroll: 'Reading of Vision',
      breath: 'Breath of Sight'
    }
  },
  {
    id: 'epithet-3',
    title: 'She Who Speaks',
    subtitle: 'The Third Epithet',
    description: 'Voice reclaimed is not louder but truer. Words become medicine when they arise from silence rather than reaction.',
    invocation: 'I speak from stillness. My words carry weight.',
    reflection: 'What would you say if you knew you would be heard?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254351200_4fe053b8.jpg',
    category: 'crystal',
    order: 3,
    aspects: {
      oracle: 'The Speaker',
      scroll: 'Reading of Truth',
      breath: 'Breath of Voice'
    }
  },
  {
    id: 'epithet-4',
    title: 'She Who Feels',
    subtitle: 'The Fourth Epithet',
    description: 'The heart, unarmored, becomes an instrument of knowing. Tenderness is not weakness but a form of intelligence.',
    invocation: 'I feel without flinching. My heart knows.',
    reflection: 'What do you know through feeling that you cannot know through thinking?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254350528_697205c2.jpg',
    category: 'crystal',
    order: 4,
    aspects: {
      oracle: 'The Feeler',
      scroll: 'Reading of Heart',
      breath: 'Breath of Feeling'
    }
  },
  {
    id: 'epithet-5',
    title: 'She Who Acts',
    subtitle: 'The Fifth Epithet',
    description: 'Power released from control becomes flow. Action arises naturally when we are aligned with what is needed.',
    invocation: 'I act from alignment. My movement serves.',
    reflection: 'What action wants to move through you?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254356303_48977496.png',
    category: 'crystal',
    order: 5,
    aspects: {
      oracle: 'The Actor',
      scroll: 'Reading of Action',
      breath: 'Breath of Movement'
    }
  },
  {
    id: 'epithet-6',
    title: 'She Who Measures',
    subtitle: 'The Sixth Epithet',
    description: 'True measure is not comparison but recognition. We learn to sense proportion, timing, and fit without external scales.',
    invocation: 'I measure by resonance. I know what fits.',
    reflection: 'How do you know when something is enough?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254353936_c6b7f726.jpg',
    category: 'crystal',
    order: 6,
    aspects: {
      oracle: 'The Measurer',
      scroll: 'Reading of Proportion',
      breath: 'Breath of Balance'
    }
  },
  {
    id: 'epithet-7',
    title: 'She Who Embodies',
    subtitle: 'The Seventh Epithet',
    description: 'The body becomes home again. Presence is not achieved but inhabited. We return to the temple we never left.',
    invocation: 'I inhabit my form. I am here.',
    reflection: 'Where in your body do you feel most at home?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254354970_23877095.jpg',
    category: 'crystal',
    order: 7,
    aspects: {
      oracle: 'The Embodied',
      scroll: 'Reading of Presence',
      breath: 'Breath of Inhabitation'
    }
  },
  {
    id: 'epithet-8',
    title: 'She Who Relates',
    subtitle: 'The Eighth Epithet',
    description: 'Connection without merger, intimacy without loss of self. We learn to be with others while remaining whole.',
    invocation: 'I relate from wholeness. I meet you here.',
    reflection: 'How do you stay present to yourself while being present to another?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254360517_b6a2db8c.png',
    category: 'crystal',
    order: 8,
    aspects: {
      oracle: 'The Relater',
      scroll: 'Reading of Connection',
      breath: 'Breath of Relation'
    }
  },
  {
    id: 'epithet-9',
    title: 'She Who Reigns',
    subtitle: 'The Ninth Epithet',
    description: 'Sovereignty is not dominion over others but stewardship of self. The throne is not a seat of power but a place of responsibility.',
    invocation: 'I reign over my own domain. I serve what I steward.',
    reflection: 'What are you sovereign over? What do you steward?',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254358426_e1157044.jpg',
    category: 'crystal',
    order: 9,
    aspects: {
      oracle: 'The Sovereign',
      scroll: 'Reading of Sovereignty',
      breath: 'Breath of Reign'
    }
  }
];

// Thirteen Marble MEs - Integration & Governance
export const marbleMEs: ArtworkItem[] = [
  {
    id: 'me-1',
    title: 'The ME of Presence',
    subtitle: 'First Mandala',
    description: 'The foundation of all governance is presence — the capacity to be here, now, without agenda. From presence, right action arises naturally.',
    invocation: 'Breath in: I am here. Breath out: I am now.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254386916_bcfc7c93.jpg',
    category: 'marble',
    order: 1,
    aspects: {
      oracle: 'The Present One',
      scroll: 'Reading of Now',
      breath: 'Breath of Being'
    }
  },
  {
    id: 'me-2',
    title: 'The ME of Listening',
    subtitle: 'Second Mandala',
    description: 'Before speaking, before acting, we listen. Not to respond, but to understand. Listening is the first act of respect.',
    invocation: 'Breath in: I receive. Breath out: I understand.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254395722_4b8af763.png',
    category: 'marble',
    order: 2,
    aspects: {
      oracle: 'The Listener',
      scroll: 'Reading of Reception',
      breath: 'Breath of Listening'
    }
  },
  {
    id: 'me-3',
    title: 'The ME of Truth',
    subtitle: 'Third Mandala',
    description: 'Truth is not a weapon but a medicine. We speak what is true, not to harm, but to heal. Truth-telling is an act of care.',
    invocation: 'Breath in: I know what is true. Breath out: I speak it with care.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254386844_58fa6251.jpg',
    category: 'marble',
    order: 3,
    aspects: {
      oracle: 'The Truthful',
      scroll: 'Reading of Honesty',
      breath: 'Breath of Truth'
    }
  },
  {
    id: 'me-4',
    title: 'The ME of Boundaries',
    subtitle: 'Fourth Mandala',
    description: 'Healthy boundaries are not walls but membranes — permeable, responsive, alive. They define without dividing.',
    invocation: 'Breath in: I know my edges. Breath out: I honor yours.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254391318_8befadb6.png',
    category: 'marble',
    order: 4,
    aspects: {
      oracle: 'The Bounded',
      scroll: 'Reading of Edges',
      breath: 'Breath of Boundaries'
    }
  },
  {
    id: 'me-5',
    title: 'The ME of Contribution',
    subtitle: 'Fifth Mandala',
    description: 'We give not from obligation but from overflow. Contribution is the natural expression of a life well-resourced.',
    invocation: 'Breath in: I am resourced. Breath out: I give freely.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254388458_02337eca.png',
    category: 'marble',
    order: 5,
    aspects: {
      oracle: 'The Giver',
      scroll: 'Reading of Offering',
      breath: 'Breath of Giving'
    }
  },
  {
    id: 'me-6',
    title: 'The ME of Reception',
    subtitle: 'Sixth Mandala',
    description: 'Receiving is not passive but active. To receive well is to honor the giver and complete the circuit of exchange.',
    invocation: 'Breath in: I receive with grace. Breath out: I honor the gift.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254390431_b394b5a8.png',
    category: 'marble',
    order: 6,
    aspects: {
      oracle: 'The Receiver',
      scroll: 'Reading of Acceptance',
      breath: 'Breath of Receiving'
    }
  },
  {
    id: 'me-7',
    title: 'The ME of Repair',
    subtitle: 'Seventh Mandala',
    description: 'When harm occurs, we repair. Not to erase what happened, but to restore relationship. Repair is how trust is rebuilt.',
    invocation: 'Breath in: I acknowledge harm. Breath out: I move toward repair.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254389547_2c4dc95d.jpg',
    category: 'marble',
    order: 7,
    aspects: {
      oracle: 'The Repairer',
      scroll: 'Reading of Restoration',
      breath: 'Breath of Mending'
    }
  },
  {
    id: 'me-8',
    title: 'The ME of Patience',
    subtitle: 'Eighth Mandala',
    description: 'Some things cannot be rushed. Patience is not passive waiting but active trust in timing beyond our control.',
    invocation: 'Breath in: I trust the timing. Breath out: I release urgency.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254394545_b5411e38.png',
    category: 'marble',
    order: 8,
    aspects: {
      oracle: 'The Patient',
      scroll: 'Reading of Timing',
      breath: 'Breath of Patience'
    }
  },
  {
    id: 'me-9',
    title: 'The ME of Discernment',
    subtitle: 'Ninth Mandala',
    description: 'Discernment is the capacity to distinguish — not to judge, but to recognize what serves and what does not.',
    invocation: 'Breath in: I see clearly. Breath out: I choose wisely.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254394089_9519bed8.png',
    category: 'marble',
    order: 9,
    aspects: {
      oracle: 'The Discerner',
      scroll: 'Reading of Choice',
      breath: 'Breath of Discernment'
    }
  },
  {
    id: 'me-10',
    title: 'The ME of Courage',
    subtitle: 'Tenth Mandala',
    description: 'Courage is not the absence of fear but the willingness to act despite it. We move toward what matters.',
    invocation: 'Breath in: I feel the fear. Breath out: I move anyway.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254416593_7009cde9.jpg',
    category: 'marble',
    order: 10,
    aspects: {
      oracle: 'The Courageous',
      scroll: 'Reading of Bravery',
      breath: 'Breath of Courage'
    }
  },
  {
    id: 'me-11',
    title: 'The ME of Surrender',
    subtitle: 'Eleventh Mandala',
    description: 'Surrender is not defeat but release. We let go of what we cannot control to embrace what we can.',
    invocation: 'Breath in: I hold what is mine. Breath out: I release what is not.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254425588_beda5ae8.png',
    category: 'marble',
    order: 11,
    aspects: {
      oracle: 'The Surrendered',
      scroll: 'Reading of Release',
      breath: 'Breath of Letting Go'
    }
  },
  {
    id: 'me-12',
    title: 'The ME of Integration',
    subtitle: 'Twelfth Mandala',
    description: 'Integration is the weaving of parts into whole. We honor all aspects of ourselves and our communities.',
    invocation: 'Breath in: I gather the pieces. Breath out: I weave them whole.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254422801_9916c33d.png',
    category: 'marble',
    order: 12,
    aspects: {
      oracle: 'The Integrator',
      scroll: 'Reading of Wholeness',
      breath: 'Breath of Weaving'
    }
  },
  {
    id: 'me-13',
    title: 'The ME of Return',
    subtitle: 'Thirteenth Mandala',
    description: 'The journey completes in return — not to where we started, but to where we belong. We come home to ourselves.',
    invocation: 'Breath in: I complete the circle. Breath out: I am home.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6946e4b398d16b00e3247ef2_1766254427632_445ff739.png',
    category: 'marble',
    order: 13,
    aspects: {
      oracle: 'The Returned',
      scroll: 'Reading of Homecoming',
      breath: 'Breath of Completion'
    }
  }
];

export const heroImage = 'https://d64gsuwffb70l.cloudfront.net/6946d8ad6d89775baa70ab9d_1766258684836_c1df1950.png';

// All artworks combined - 33 total plates
export const allArtworks = [, ...obsidianGates, ...crystalEpithets, ...marbleMEs];

// Total counts
export const TOTAL_PLATES = 33;
export const TOTAL_MEASURES = 99;
