import keys = require('lodash/keys')
import each = require('lodash/each')
import omit = require('lodash/omit')

// @ts-ignore: "No exported module" error
// PropTypes is a circular reference and therefore not defined in types
import { PropTypes as NamedPT } from 'prop-types'
// import * as NamedPT from 'prop-types'
import { IntrospectivePropTypes as NamedIPT } from '../src/index'

import { PropTypes as NamedIPTasPT } from '../src/index'

import DefaultPT from 'prop-types'
import DefaultIPT from '../src/index'

const ES5PT = require('prop-types')
const ES5IPT = require('../src/index')

const noise = ['IntrospectivePropTypes', 'default']
function checkProperties(obj1: object, obj2: object): void {
  each(keys(omit(obj1, noise)), expect(obj2).toHaveProperty)
  each(keys(omit(obj2, noise)), expect(obj1).toHaveProperty)
}

test('Should have TS-Style named export available', () => {
  // import { IntrospectivePropTypes } from 'introspective-prop-types'
  checkProperties(NamedPT, NamedIPT)
})

test('Should have TS-Style named export alias available', () => {
  // import { PropTypes } from 'introspective-prop-types'
  checkProperties(NamedPT, NamedIPTasPT)
})

test('Should have ES6-Style default export available', () => {
  // import IntrospectivePropTypes from 'introspective-prop-types'
  checkProperties(DefaultPT, DefaultIPT)
})

test('Should have ES5-Style export available', () => {
  // const IntrospectivePropTypes = require('introspective-prop-types')
  checkProperties(ES5PT, ES5IPT)
})
