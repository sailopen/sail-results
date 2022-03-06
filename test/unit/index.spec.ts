// test/unit/index.test.js

import { expect } from 'chai';

import { readFileSync } from 'fs';

import { version } from '../../src/index';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

describe('The entry point', function () {
  it('should have the same version as package.json', function () {
    expect(version).to.equal(pkg.version);
  });
});
