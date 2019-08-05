import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'
import mapValues from 'lodash/mapValues'

type Check = PropTypes.Requireable<any>
type ReqCheck = PropTypes.Validator<NonNullable<any>>
type WithProperty<T> = T & { [property: string]: any }

function addHiddenProperties<T extends Check>(
  propType: T,
  property: string,
  value: any,
): WithProperty<T> {
  addHiddenProperty(propType, property, value)
  addHiddenProperty(propType.isRequired, property, value)
  return propType
}

function addHiddenProperty<T extends Check | ReqCheck>(
  propType: T,
  property: string,
  value: any,
): WithProperty<T> {
  return Object.defineProperty(propType, property, { enumerable: false, value })
}

function addType<T extends Check>(propType: T, value: string): WithProperty<T> {
  return addHiddenProperties(propType, 'type', value)
}

function addArg<T extends Check>(propType: T, value: any): WithProperty<T> {
  return addHiddenProperties(propType, 'arg', value)
}

function addRequired<T extends Check>(propType: T): WithProperty<T> {
  addHiddenProperty(propType, 'required', false)
  addHiddenProperty(propType.isRequired, 'required', true)
  return propType
}

type Noise = 'checkPropTypes' | 'resetWarningCache' | 'nominalTypeHack'

type Simple =
  | 'any'
  | 'array'
  | 'bool'
  | 'func'
  | 'number'
  | 'object'
  | 'string'
  | 'node'
  | 'element'
  | 'symbol'
  | 'elementType'

type Complex =
  | 'instanceOf'
  | 'oneOf'
  | 'oneOfType'
  | 'arrayOf'
  | 'objectOf'
  | 'shape'
  | 'exact'

type Types = Noise | Simple | Complex

type PropType = typeof PropTypes[keyof typeof PropTypes]

// Circular reference. Return original.
function wrapPropType<T>(propType: T, name: 'PropTypes'): T
// Noise. Return original.
function wrapPropType<T extends PropType>(propType: T, name: Noise): T
// Simple. Return original with added properties.
function wrapPropType<T extends PropType>(propType: T, name: Simple): T
// Complex. Return original-looking function with added functionality in call.
function wrapPropType<T extends PropType>(propType: T, name: Complex): T
function wrapPropType<T extends PropType>(propType: T, name: Types): T
function wrapPropType(propType: any, name: any): any {
  if (
    name === 'PropTypes' ||
    name === 'checkPropTypes' ||
    name === 'resetWarningCache' ||
    name === 'nominalTypeHack'
  ) {
    return propType
  }
  if (propType.isRequired !== undefined) {
    // Simple type. Just extend the object.
    let res = addType(propType, name)
    res = addRequired(res)
    return res
  } else {
    // Complex type. Must extend the creator's return value.
    const original = (a: any) => propType(a)
    return <T>(
      arg: T,
    ): { isRequired: any; type: string; arg: T; required: boolean } => {
      let res = original(arg)
      res = addType(res, name)
      res = addArg(res, arg)
      res = addRequired(res)
      return res
    }
  }
}

function wrapPropTypes(): { [P in keyof typeof PropTypes]: any } {
  const copy = cloneDeep(PropTypes)
  return mapValues(copy, (v, k) => wrapPropType(v, <Types>k))
}

export const IntrospectivePropTypes = wrapPropTypes()
export default IntrospectivePropTypes
