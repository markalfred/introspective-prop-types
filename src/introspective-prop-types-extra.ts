import * as PropTypesExtra from 'prop-types-extra'
import cloneDeep from 'lodash/cloneDeep'
import mapValues from 'lodash/mapValues'
import { addArg, addRequired, addType } from './common'

type Simple = 'elementType' | 'componentOrElement'
type Complex = 'all' | 'isRequiredForA11y' | 'deprecated'
type Types = Simple | Complex
type PropType = typeof PropTypesExtra[keyof typeof PropTypesExtra]

// Circular reference. Return original.
function wrapPropTypeExtra<T>(propType: T, name: 'PropTypesExtra'): T
// Simple. Return original with added properties.
function wrapPropTypeExtra<T extends PropType>(propType: T, name: Simple): T
// Complex. Return original-looking function with added functionality in call.
function wrapPropTypeExtra<T extends PropType>(propType: T, name: Complex): T
function wrapPropTypeExtra<T extends PropType>(propType: T, name: Types): T
function wrapPropTypeExtra(propType: any, name: any): any {
  if (propType.isRequired !== undefined) {
    // Simple type. Just extend the object.
    let res = addType(propType, name)
    res = addRequired(res)
    return res
  } else {
    // Complex type. Must extend the creator's return value.
    const original = (...args: any[]) => propType(...args)
    return <T>(
      ...args: T[]
    ): { isRequired: any; type: string; arg: T; required: boolean } => {
      let res = original(...args)
      res = addType(res, name)
      res = addArg(res, args)
      res = addRequired(res)
      return res
    }
  }
}

function wrapPropTypesExtra(): { [P in keyof typeof PropTypesExtra]: any } {
  const copy = cloneDeep(PropTypesExtra)
  return mapValues(copy, (v, k) => wrapPropTypeExtra(v, <Types>k))
}

export const IntrospectivePropTypesExtra = wrapPropTypesExtra()
export default IntrospectivePropTypesExtra
