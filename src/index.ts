// TS-Style Named Export
export * from './introspective-prop-types'
export * from './introspective-prop-types-extra'

// TS-Style Named Export (Alias)
export { IntrospectivePropTypes as PropTypes } from './introspective-prop-types'
export { IntrospectivePropTypesExtra as PropTypesExtra } from './introspective-prop-types-extra'

// ES6-Style Default Export
import { IntrospectivePropTypes } from './introspective-prop-types'
// import { IntrospectivePropTypesExtra } from './introspective-prop-types-extra'
export default IntrospectivePropTypes

// ES5-Style Single Export
module.exports = { ...exports, ...IntrospectivePropTypes }
