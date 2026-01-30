
Everything in the codebase must clearly fall into one of three categories:

1. **Structure** — serves the Codexstone
2. **Pillar** — lives fully inside a single domain
3. **System** — supports pillars without defining them

Anything else is noise.

---

## Pillars (Canonical Domains)

Pillars are **domain boundaries**, not page groupings.

Rules:
- A pillar owns its routes, data, hooks, and internal logic
- Pillars do not import from one another
- Shared logic must be explicitly justified

### Measures

Cosmology, Gates, Codex architecture, and meaning-structure.

Measures is allowed depth.  
Measures is not allowed entanglement.

### c3

Civic, economic, and intelligence frameworks.

Includes:
- c3 Key
- CCC Current
- Interfaces to CoherentAI

This pillar translates signal into structure.

### Artist Gallery

Living works, artists, releases, and external presence (e.g. Zora).

This pillar is state-rich and intentionally dynamic.

### Restore

Stewardship, restoration economics, financial transparency, and DAO logic.

This pillar binds symbolic intent to real accountability.

---

## Systems

Systems are **supporting intelligences**, not authorities.

They may:
- Process information
- Assist learning, navigation, or decision support
- Interface with external services

They may not:
- Define site structure
- Own top-level routing
- Override pillar boundaries

### CoherentAI

CoherentAI is a system, not a pillar.

It supports c3 first and the wider site second.  
It may reason, learn, and assist — it does not govern structure.

---

## Git vs Supabase

### Lives in Git (Structural Law)

- Codexstone geometry and hit maps
- Pillar definitions and hierarchy
- Navigation logic
- Canonical copy and invocation text
- Typography and design system

### Lives in Supabase (Living State)

- Artist and artwork data
- Financial and transparency records
- DAO and stewardship state
- Operational and participation logs

Supabase feeds the structure.  
It never defines it.

---

## Shared Code

### `pillars/shared`

Only domain-specific logic or types used by **multiple pillars** belong here.

This is not a general utilities folder.

If it becomes generic, it moves elsewhere.

---

## Assets

Assets are inert.

- No logic
- No implicit meaning
- No structural authority

Geometry, images, and video are always referenced explicitly.

---

## Exclusions

The following do **not** belong in `src`:

- Experiments
- Drafts
- Temporary spikes
- Untyped or undecided concepts

If it is not stable, it is not structural.

---

## Final Check

Before adding or moving anything, ask:

> Is this **structure**, or is this **state**?

If the answer is unclear, stop.

This document is the contract that keeps the system coherent.
