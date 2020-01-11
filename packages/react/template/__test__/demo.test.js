/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { App } from '../demo.js'

describe('app', () => {
  // Snapshot
  it('Snapshot', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  // React Demo
  it('app shows "React Demo"', () => {
    const app = shallow(<App />)
    expect(app.find('h1').text()).toEqual('React Demo')
  })
})
