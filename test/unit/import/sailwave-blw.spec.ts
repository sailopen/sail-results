import { expect } from 'chai';
import { readFileSync } from 'fs';
import { version } from '../../../src/index';

import { importBlw } from '../../../src/import/sailwave-blw';

const testSeries1 = readFileSync('./test/data/test-series-1.blw', 'utf8');
/*
const testSeriesEmpty = readFileSync(
  './test/data/test-series-empty.json',
  'utf8'
);
*/

const parsed = importBlw(testSeries1);
console.log(parsed);

describe('Sailwave blw file import', function () {
  it('should import a minimal blw export file', function () {
    expect(Object.keys(parsed)).to.eql([
      // 'prizes',
      'header',
      'globals',
      'scoring-systems',
      // 'ui-recs',
      'competitors',
      'races',
      'results',
      // 'columns',
    ]);
  });

  describe('should have the right header', function () {
    it('should have the right keys', function () {
      expect(Object.keys(parsed.header)).to.eql([
        'seriesId',
        'version',
        'generator',
        'generatorVersion',
        'isoTime',
      ]);
    });

    it('header.seriesId should be sws0797524231742162', function () {
      expect(parsed.header.seriesId).to.equal(parsed.globals.sereventeid);
      expect(parsed.header.seriesId).to.equal('sws0797524231742162');
    });

    it('header.version should be 2.29.0 (sailwave version)', function () {
      expect(parsed.header.version).to.equal(parsed.globals.serversion);
      expect(parsed.header.version).to.equal('2.29.0');
    });

    it('header.generator should be sail-results-blw', function () {
      expect(parsed.header.generator).to.equal('sail-results-import-blw');
    });

    it("header.generatorVersion should be this module's version", function () {
      expect(parsed.header.generatorVersion).to.equal(version);
    });

    it('header.isoTime should be a UTC timestamp', function () {
      expect(parsed.header.isoTime).to.match(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
      );
    });
  });
  /*
  seriesId: globals.sereventeid ?? null,
  version: globals.serversion ?? '',
  generator: "sail-results-import-blw",
  generatorVersion,
  isoTime,
  */

  // We want to parse results from different series into a single database.
});
