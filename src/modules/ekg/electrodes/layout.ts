import type { ElectrodePoint } from './types';

/** Platziert das Label links oder rechts vom Punkt, je nachdem auf welcher Rumpfseite er liegt, um Überlappungen benachbarter Punkte zu vermeiden. */
export function labelPlacement(p: ElectrodePoint, viewBoxWidth: number) {
  const isRightSide = p.x < viewBoxWidth / 2;
  return {
    x: isRightSide ? p.x - 18 : p.x + 18,
    anchor: isRightSide ? ('end' as const) : ('start' as const),
  };
}
