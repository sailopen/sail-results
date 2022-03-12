import { expect } from 'chai';

import { readFileSync } from 'fs';

import { importJson } from '../../../src/import/sailwave-json';

const testSeriesEmpty = readFileSync(
  './test/data/test-series-empty.json',
  'utf8'
);

describe('Sailwave import', function () {
  it('should import a minimal JSON export file (Sailwave >=2.29.6)', function () {
    const parsed = importJson(testSeriesEmpty);
    expect(Object.keys(parsed).sort()).to.eql([
      'columns',
      'competitors',
      'globals',
      'header',
      'prizes',
      'races',
      'results',
      'scoring-systems',
      'ui-recs',
    ]);
  });
});
