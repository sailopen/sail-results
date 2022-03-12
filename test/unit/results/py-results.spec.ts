import { expect } from 'chai';
import { readFileSync } from 'fs';

import { createSeriesFromBlwFile } from '../../../src/import/series';

const blwFile = readFileSync('./test/data/test-ratings.blw', 'utf8');

const series = createSeriesFromBlwFile(blwFile);

describe('Scoring using a PY fleet', function () {
  it('should calculate results for a race', function () {
    expect(series).not.to.be.null;
  });
});
