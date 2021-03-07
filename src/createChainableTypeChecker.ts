// copied from react prop-types

export default function createChainableTypeChecker(validate: any) {
  function checkType(
    isRequired: boolean,
    props: object,
    propName: string,
    componentName: string,
    location: object,
    propFullName: string,
  ) {
    var componentNameSafe = componentName || '<<anonymous>>'
    var propFullNameSafe = propFullName || propName

    // @ts-ignore
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          'Required ' +
            location +
            ' `' +
            propFullNameSafe +
            '` was not specified ' +
            ('in `' + componentNameSafe + '`.'),
        )
      }

      return null
    }

    for (
      var _len = arguments.length,
        args = Array(_len > 6 ? _len - 6 : 0),
        _key = 6;
      _key < _len;
      _key++
    ) {
      args[_key - 6] = arguments[_key]
    }

    return validate.apply(
      undefined,
      [props, propName, componentNameSafe, location, propFullNameSafe].concat(
        args,
      ),
    )
  }

  var chainedCheckType = checkType.bind(null, false)

  // @ts-ignore
  chainedCheckType.isRequired = checkType.bind(null, true)

  return chainedCheckType
}
