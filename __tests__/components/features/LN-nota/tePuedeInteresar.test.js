import React from 'react';
import { render, shallow } from 'enzyme';
import TePuedeInteresar from '../../../../components/features/LN-nota/tePuedeInteresar/default';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';

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
    const props = {
        customFields: {}
    };

    it('Matches Snapshot', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent,
            requestUri
        }));
        const component = shallow(<TePuedeInteresar {...props} />);
        expect(component).toMatchSnapshot();
    });
});
