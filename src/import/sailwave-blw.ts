import { version as generatorVersion } from '../index';

type ImportErrorOptions = {
  errors?: unknown[];
};
class ImportError extends Error {
  errors: unknown[];
  constructor(message: string, options: ImportErrorOptions = {}) {
    super(message);
    this.errors = options.errors ? options.errors : [];
  }
}

type SailwaveSeriesCompetitor = Record<string, string>;
type SailwaveSeriesRace = {
  [key: string]: string | Record<string, string>;
};

type SailwaveSeriesResult = {
  comHandle: string;
  racHandle: string;
};

export type SailwaveSeries = {
  header: {
    seriesId: string | null;
    version: string;
    generator: string;
    generatorVersion: string;
    isoTime: string;
  };

  globals: Record<string, string>;
  'scoring-systems': Record<string, Record<string, string>>;
  competitors: Record<string, SailwaveSeriesCompetitor>;
  races: Record<string, SailwaveSeriesRace>;
  results: Record<string, SailwaveSeriesResult>;
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
// "compprivatenotes","How about in ""notes"", particularly with","71",""
const lineSplitRegexp = /^"([a-z0-9]*)","(.*)","([0-9]*)","([0-9]*)"$/;

export const importBlw = (text: string): SailwaveSeries => {
  const isoTime = new Date().toISOString().substring(0, 19) + 'Z';

  const globals: Record<string, string> = {};
  const scoringSystems: Record<string, Record<string, string>> = {};
  const competitors: Record<string, SailwaveSeriesCompetitor> = {};
  const races: Record<string, SailwaveSeriesRace> = {};
  const results: Record<string, SailwaveSeriesResult> = {};

  const errors: [string, number, string][] = [];
  const collectResults: Record<string, Record<string, string>> = {};

  const lines = text.split('\r\n');
  lines.forEach((line, lineNumber) => {
    const parts = line.match(lineSplitRegexp);
    if (parts === null) {
      if (line !== '') {
        // Ignore blank lines (probably the last line).
        errors.push(['Could not parse line', lineNumber + 1, line]);
      }
      return;
    }
    const [, name, value, key1, key2] = parts;

    // Deal with globals.
    if (name.startsWith('ser')) {
      globals[name] = value;
      return;
    }

    // Deal with scoring system codes.
    if (name === 'scrcode') {
      //@TODO
      return;
    }

    // Deal with scoring systems.
    if (name.startsWith('scr')) {
      if (scoringSystems[key1]) {
        if (scoringSystems[key1][name]) {
          errors.push([`Duplicate key ${name}`, lineNumber + 1, line]);
        }
      } else {
        scoringSystems[key1] = {};
      }
      scoringSystems[key1][name] = value;
      return;
    }

    // Deal with `ui`.
    if (name === 'ui') {
      //@TODO
      return;
    }

    // Deal with competitors.
    if (name.startsWith('comp')) {
      if (competitors[key1]) {
        if (competitors[key1][name]) {
          errors.push([`Duplicate key ${name}`, lineNumber + 1, line]);
        }
      } else {
        competitors[key1] = {};
      }
      competitors[key1][name] = value;
      return;
    }

    // Deal with race starts.
    if (name === 'racestart') {
      const starts = <Record<string, string>>races[key2].starts ?? {};
      const startIndex = Object.keys(starts).length;
      starts[`${startIndex}`] = value;
      races[key2].starts = starts;
      return;
    }

    // Deal with races.
    if (name.startsWith('race')) {
      if (races[key2]) {
        if (races[key2][name]) {
          errors.push([`Duplicate key ${name}`, lineNumber + 1, line]);
        }
      } else {
        races[key2] = {};
      }
      races[key2][name] = value;
      return;
    }

    // Deal with a result.
    if (key1 && key2) {
      const key = `${key1}|${key2}`;
      if (!collectResults[key]) {
        collectResults[key] = {
          comHandle: key1,
          racHandle: key2,
        };
      }
      collectResults[key][name] = value;
      return;
    }
  });

  if (errors.length) {
    const err = new ImportError(`Parsing errors: count ${errors.length}`, {
      errors,
    });
    throw err;
  }

  const header = {
    seriesId: globals.sereventeid ?? null,
    version: globals.serversion ?? '',
    generator: 'sail-results-import-blw',
    generatorVersion,
    isoTime,
  };

  Object.values(collectResults).forEach((value, i) => {
    // Casting is safe here as long as we have set comHandle and racHandle above.
    results[`${i + 1}`] = <SailwaveSeriesResult>value;
  });

  return {
    header,
    globals,
    'scoring-systems': scoringSystems,
    competitors,
    races,
    results,
  };
};
