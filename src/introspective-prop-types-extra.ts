// @ts-ignore
import * as PropTypesExtra from 'prop-types-extra'
import createChainableTypeChecker from './createChainableTypeChecker'
import cloneDeep from 'lodash/cloneDeep'
import mapValues from 'lodash/mapValues'
import { addArg, addRequired, addType } from './common'

type Noise = 'checkPropTypes' | 'resetWarningCache' | 'nominalTypeHack'

type Simple = 'elementType' | 'componentOrElement'

type Complex = 'all' | 'isRequiredForA11y' | 'deprecated'

type Types = Noise | Simple | Complex

// Circular reference. Return original.
function wrapPropTypeExtra<T>(propType: T, name: 'PropTypesExtra'): T
// Noise. Return original.
function wrapPropTypeExtra<T extends PropTypesExtra>(
  propType: T,
  name: Noise,
): T
// Simple. Return original with added properties.
function wrapPropTypeExtra<T extends PropTypesExtra>(
  propType: T,
  name: Simple,
): T
// Complex. Return original-looking function with added functionality in call.
function wrapPropTypeExtra<T extends PropTypesExtra>(
  propType: T,
  name: Complex,
): T
function wrapPropTypeExtra<T extends PropTypesExtra>(
  propType: T,
  name: Types,
): T
function wrapPropTypeExtra(propType: any, name: any): any {
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
      try {
        res = addType(res, name)
      } catch (e) {
        // exception is raised when validator is a pure function
        /* istanbul ignore else */
        if (e.message === 'Object.defineProperty called on non-object') {
          res = createChainableTypeChecker(res)
          res = addType(res, name)
        } else
            throw e
      }
      res = addArg(res, arg)
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
