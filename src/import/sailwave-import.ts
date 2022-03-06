import type { Result } from './result';
import { parseFromJson as parseResults } from './result';

export type SailwaveImportFile = {
  results: Record<string, Result>;
};

/*
'columns',
'competitors',
'globals',
'header',
'prizes',
'races',
'results',
'scoring-systems',
'ui-recs',
*/

/*
 * Fix a broken export from Sailwave < 2.29.6.
 *
 * @param text A broken JSON string.
 * @returns  A fixed JSON string.
export const fixJson = (text: string): string => {
  return text
    .replace(/"penalty" : "(Yes|No)"/g, '"penalty" : "$1"\r\n},')
    .replace(/"racestart"(.*?),\r\n"racestart".*?\r\n/gm, '"racestart"$1,\r\n')
    .replace(/},\r\n}/gm, '}\r\n}');
};
 */

/**
 * Import a Sailwave JSON series export.
 *
 * @param text JSON string to import from.
 */
export const importJson = (text: string): SailwaveImportFile => {
  const json = JSON.parse(text);
  json.results = parseResults(json.results, { seriesId: 'sId' });
  return json;
};
