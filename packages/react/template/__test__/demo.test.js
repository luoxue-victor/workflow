/* eslint-env jest */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { App } from '../demo.js';

Enzyme.configure({
    adapter: new Adapter()
});

describe('app', () => {
    // Snapshot
    it('Snapshot', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    // React Demo
    it('app shows "React Demo"', () => {
        const app = shallow(<App />);
        expect(app.find('h1').text()).toEqual('React Demo');
    });
});
