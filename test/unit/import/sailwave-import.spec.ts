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
      const { results } = importJson(testSeries1);

      expect(Object.keys(results).sort()).to.eql([
        'sId|67|71',
        'sId|67|73',
        'sId|67|74',
        'sId|68|71',
        'sId|68|73',
        'sId|68|74',
        'sId|69|71',
        'sId|69|73',
        'sId|69|74',
      ]);
      expect(results['sId|67|71'].elapsedSeconds).to.equal(1234);
      expect(results['sId|68|71'].elapsedSeconds).to.be.null;
    });
  });

  // We want to parse results from different series into a single database.
});
