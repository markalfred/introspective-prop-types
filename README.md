# Introspective Prop Types

Add some :sparkles:metadata:sparkles: to your Prop Types.

```js
PropTypes.string.type           // => 'string'
PropTypes.string.required       // => false
PropTypes.oneOf([1, 2, 3]).type // => 'oneOf'
PropTypes.oneOf([1, 2, 3]).arg  // => [1, 2, 3]
```

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
