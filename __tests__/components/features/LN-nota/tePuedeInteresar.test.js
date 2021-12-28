import React from 'react';
import { render, shallow, mount } from 'enzyme';
import TePuedeInteresar from '../../../../components/features/LN-nota/tePuedeInteresar/default';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes(arr.length)
    }
});

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const requestUri = '';

const globalContent = {};

describe('Te puede interesar default test', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent,
        requestUri
    }));

    const props = {
        customFields: {},
        outputType: 'default',
        siteProperties: {}
    };

    const component = mount(<TePuedeInteresar {...props} />);

    it('Validates props', () => {
        expect(component.props().outputType).toEqual('default');
        expect(component.props().customFields).toEqual({});
        expect(component.props().siteProperties).toEqual({});
    });

    it('Renders component', () => {
        expect(component).toBeDefined;
    });

    it('Matches Snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});
