import PropTypes from 'prop-types'

type Check = PropTypes.Requireable<any>
type ReqCheck = PropTypes.Validator<NonNullable<any>>
type WithProperty<T> = T & { [property: string]: any }

function addHiddenProperties<T extends Check>(
  propType: T,
  property: string,
  value: any,
): WithProperty<T> {
  addHiddenProperty(propType, property, value)
  if (propType.isRequired) {
    addHiddenProperty(propType.isRequired, property, value)
  }
  return propType
}

function addHiddenProperty<T extends Check | ReqCheck>(
  propType: T,
  property: string,
  value: any,
): WithProperty<T> {
  return Object.defineProperty(propType, property, { enumerable: false, value })
}

export function addType<T extends Check>(
  propType: T,
  value: string,
): WithProperty<T> {
  return addHiddenProperties(propType, 'type', value)
}

export function addArg<T extends Check>(
  propType: T,
  value: any,
): WithProperty<T> {
  return addHiddenProperties(propType, 'arg', value)
}

export function addRequired<T extends Check>(propType: T): WithProperty<T> {
  addHiddenProperty(propType, 'required', false)
  if (propType.isRequired) {
    addHiddenProperty(propType.isRequired, 'required', true)
  }
  return propType
}
