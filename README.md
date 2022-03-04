# Sail Results

> TypeScript module for working with results from sailing races.

## Getting Started: in a web page

Current major browsers are supported but not Internet Explorer (edit `targets`
in `rollup.config.js` and run `npm run build` to change this).

Load the script from the CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/sail-results@1"></script>
```

The module is exported as `SailResults`:

```html
<script>
  document.write(SailResults.version);
</script>
```

## Getting Started: in Node.js

Node >= 12 is currently supported in the distributed modules.

Install from `npm`:

```console
$ npm i sail-results
```

Require CommonJS module:

```js
// Default should work...
const SailResults = require('sail-results');
// ...or specify CommonJS module.
const SailResults = require('sail-results/dist/cjs');
```

or import as an ES6 module:

```js
// Default should work...
import SailResults from 'sail-results';
// ...or specify ES6 module.
import SailResults from 'sail-results/dist/esm';
```

### Using

## Documentation

## Contributing

## License

Distributed under the MIT License. See [LICENSE] for more information.

## Contact

## Acknowledgements
