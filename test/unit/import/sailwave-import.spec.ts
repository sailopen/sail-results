import { expect } from 'chai';

import { readFileSync, writeFileSync } from 'fs';
import { parseFromJson } from '../../../src/import/result';

import { importJson } from '../../../src/import/sailwave-import';

const testSeries1 = readFileSync('./test/data/test-series-1.json', 'utf8');
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

  describe('Parse results from Sailwave import JSON', function () {
    it('should parse results', function () {
      const parsed = importJson(testSeries1);

      const results = parseFromJson(<Record<string, unknown>>parsed.results, {
        seriesId: 'seriesId',
      });
      expect(results['seriesId|67|71'].elapsedSeconds).to.equal(1234);
      expect(results['seriesId|68|71'].elapsedSeconds).to.be.null;
    });
  });
});
