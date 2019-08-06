# Introspective Prop Types

Add some :sparkles:metadata:sparkles: to your Prop Types.

```js
PropTypes.string.type           // => 'string'
PropTypes.string.required       // => false
PropTypes.oneOf([1, 2, 3]).type // => 'oneOf'
PropTypes.oneOf([1, 2, 3]).arg  // => [1, 2, 3]
```


[![Build Status](https://travis-ci.org/markalfred/introspective-prop-types.svg?branch=master)](https://travis-ci.org/markalfred/introspective-prop-types.svg?branch=master)
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
