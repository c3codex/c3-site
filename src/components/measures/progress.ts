import type { MeasuresSectionId } from "@/pages/measures/measuresAssets";

type Progress = {
  lastSection?: MeasuresSectionId;
  lastPlate?: { section: MeasuresSectionId; n: number };
  visited?: Partial<Record<MeasuresSectionId, boolean>>;
};

const KEY = "measures.progress.v1";

export function readProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

export function writeProgress(next: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function markVisited(section: MeasuresSectionId) {
  const cur = readProgress();
  writeProgress({
    ...cur,
    lastSection: section,
    visited: { ...(cur.visited ?? {}), [section]: true },
  });
}

export function setLastPlate(section: MeasuresSectionId, n: number) {
  const cur = readProgress();
  writeProgress({
    ...cur,
    lastSection: section,
    lastPlate: { section, n },
    visited: { ...(cur.visited ?? {}), [section]: true },
  });
}
