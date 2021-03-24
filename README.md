# Introspective Prop Types

Add some :sparkles:metadata:sparkles: to your Prop Types.

```js
PropTypes.string.type           // => 'string'
PropTypes.string.required       // => false
PropTypes.oneOf([1, 2, 3]).type // => 'oneOf'
PropTypes.oneOf([1, 2, 3]).arg  // => [1, 2, 3]
```


[![Build Status](https://api.travis-ci.org/markalfred/introspective-prop-types.svg?branch=master)](https://api.travis-ci.org/markalfred/introspective-prop-types.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/markalfred/introspective-prop-types/badge.svg?branch=master)](https://coveralls.io/github/markalfred/introspective-prop-types?branch=master)
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)


## Installation

```bash
npm install introspective-prop-types
```

## Usage

```js
import PropTypes from 'introspective-prop-types'

propTypes = {
  name: PropTypes.string.isRequired
  color: PropTypes.oneOf(['red', 'green', 'blue']),
  car: PropTypes.shape({
    year: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired
    model: PropTypes.string.isRequired,
  })
}

propTypes.name.type         // => 'string'
propTypes.name.required     // => true

propTypes.color.type        // => 'oneOf'
propTypes.color.required    // => false
propTypes.color.arg         // => ['red', 'green', 'blue']

propTypes.car.type          // => 'shape'
propTypes.car.arg.year.type // => 'number'
```

This is a drop-in replacement for [`facebook/prop-types`](https://github.com/facebook/prop-types).

You can replace any `prop-types` import with `introspective-prop-types` and get
prop types with metadata. :beers:

## Additional prop-type libraries
This package adds metadata to the following additional libraries. Just replace your current imports with their introspective version.
- [`react-bootstrap/prop-types-extra`](https://github.com/react-bootstrap/prop-types-extra): `import PropTypesExtra from 'introspective-prop-types/extra'`

If you'd like metadata in any other prop-type libraries, please [submit an issue](https://github.com/markalfred/introspective-prop-types/issues).
