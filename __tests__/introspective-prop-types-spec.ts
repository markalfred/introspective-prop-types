import IntrospectivePropTypes from '../src/introspective-prop-types'

function check(
  type: keyof typeof IntrospectivePropTypes,
  arg?: string | string[] | (() => void)[],
): void {
  if (!arg) {
    const propType = IntrospectivePropTypes[type]
    it('exposes its type', () => {
      expect(propType.type).toBe(type)
    })
    it('has no arg', () => {
      expect(propType.arg).toBe(undefined)
    })
    it('exposes that it is not required', () => {
      expect(propType.required).toBe(false)
    })
    describe('.isRequired', () => {
      const requiredPropType = propType.isRequired
      it('exposes its type', () => {
        expect(requiredPropType.type).toBe(type)
      })
      it('has no arg', () => {
        expect(requiredPropType.arg).toBe(undefined)
      })
      it('exposes that it is required', () => {
        expect(requiredPropType.required).toBe(true)
      })
    })
  } else {
    const propType = IntrospectivePropTypes[type](arg)
    it('exposes its type', () => {
      expect(propType.type).toBe(type)
    })
    it('exposes its arg', () => {
      expect(propType.arg).toBe(arg)
    })
    it('exposes that it is not required', () => {
      expect(propType.required).toBe(false)
    })
    describe('.isRequired', () => {
      const requiredPropType = propType.isRequired
      it('exposes its type', () => {
        expect(requiredPropType.type).toBe(type)
      })
      it('exposes its arg', () => {
        expect(requiredPropType.arg).toBe(arg)
      })
      it('exposes that it is required', () => {
        expect(requiredPropType.required).toBe(true)
      })
    })
  }
}

describe('any', () => check('any'))
describe('array', () => check('array'))
describe('bool', () => check('bool'))
describe('func', () => check('func'))
describe('number', () => check('number'))
describe('object', () => check('object'))
describe('string', () => check('string'))
describe('node', () => check('node'))
describe('element', () => check('element'))
describe('symbol', () => check('symbol'))
describe('elementType', () => check('elementType'))

describe('instanceOf', () => check('instanceOf', 'arg'))
describe('arrayOf', () => check('arrayOf', 'arg'))
describe('objectOf', () => check('objectOf', 'arg'))
describe('shape', () => check('shape', 'arg'))
describe('exact', () => check('exact', 'arg'))

describe('oneOf', () => check('oneOf', ['val']))
describe('oneOfType', () => check('oneOfType', [function fn() {}]))
