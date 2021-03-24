import { bool } from 'prop-types'
import IntrospectivePropTypesExtra from '../src/introspective-prop-types-extra'

function check(
  type: keyof typeof IntrospectivePropTypesExtra,
  ...args: Array<string | (() => void)>
): void {
  if (!args.length) {
    const propType = IntrospectivePropTypesExtra[type]
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
    const propType = IntrospectivePropTypesExtra[type](...args)
    it('exposes its type', () => {
      expect(propType.type).toBe(type)
    })
    it('exposes its arg', () => {
      expect(propType.arg).toStrictEqual(args)
    })
    it('exposes that it is not required', () => {
      expect(propType.required).toBe(false)
    })
    if (propType.isRequired) {
      describe('.isRequired', () => {
        const requiredPropType = propType.isRequired
        it('exposes its type', () => {
          expect(requiredPropType.type).toBe(type)
        })
        it('exposes its arg', () => {
          expect(requiredPropType.arg).toStrictEqual(args)
        })
        it('exposes that it is required', () => {
          expect(requiredPropType.required).toBe(true)
        })
      })
    }
  }
}

describe('elementType', () => check('elementType'))
describe('componentOrElement', () => check('componentOrElement'))
describe('all', () =>
  check(
    'all',
    function fn1() {},
    function fn2() {},
  ))
describe('deprecated', () => check('deprecated', function fn() {}, 'test'))
describe('isRequiredForA11y', () =>
  check('isRequiredForA11y', function fn() {}))

const secret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'

it('PropType still functions correctly', () => {
  const errorBackup = console.error
  console.error = jest.fn()

  const propType = IntrospectivePropTypesExtra.deprecated(bool, 'just a test')

  propType({}, 'show', 'SomeWidget', 'prop', 'show', secret)
  expect(console.error).toHaveBeenCalledTimes(0)
  propType({ show: true }, 'show', 'SomeWidget', 'prop', 'show', secret)
  expect(console.error).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledWith(
    'Warning: The prop `show` of `SomeWidget` is deprecated. just a test.',
  )

  console.error = errorBackup
})
