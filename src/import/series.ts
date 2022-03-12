import type { SailwaveSeries } from './sailwave-blw';
import { importBlwFile } from './sailwave-blw';

/*
 * A series imported from SailWave.
 */
export class Series {
  blw: SailwaveSeries;
  isActive = false;

  constructor(blw: SailwaveSeries) {
    this.blw = blw;
  }

  get competitors() {
    return Object.entries(this.blw.competitors);
  }

  get races() {
    return Object.entries(this.blw.races);
  }
}

export const createSeriesFromBlw = (blw: SailwaveSeries): Series => {
  return new Series(blw);
};

export const createSeriesFromBlwFile = (
  text: string,
  file?: {
    lastModified: number;
    name: string;
    size: number;
  }
): Series => {
  return createSeriesFromBlw(importBlwFile(text, file));
};
