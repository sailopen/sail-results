// test/func/index.test.js

import { expect } from 'chai';

import { readFileSync } from 'fs';

// Enter the module name created by the IIFE here.
const moduleName = 'SailResults';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const iife = readFileSync(pkg.browser, 'utf8');

const SailResults = eval(`(() => {${iife}; return ${moduleName}})()`);

describe('The browser distribution', function () {
  it('should have the same version as package.json', function () {
    expect(SailResults.version).to.equal(pkg.version);
  });

  it('should only expose what we want to expose', function () {
    expect(Object.keys(SailResults).sort()).to.eql([
      'createSeriesFromBlwFile',
      'version',
    ]);
  });
});
