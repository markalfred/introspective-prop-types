// TS-Style Named Export
export * from './introspective-prop-types'

// TS-Style Named Export (Alias)
export { IntrospectivePropTypes as PropTypes } from './introspective-prop-types'

// ES6-Style Default Export
import { IntrospectivePropTypes } from './introspective-prop-types'
export default IntrospectivePropTypes

// ES5-Style Single Export
module.exports = { ...exports, ...IntrospectivePropTypes }
