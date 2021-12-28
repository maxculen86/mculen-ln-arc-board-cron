import React from 'react';
import { render } from 'enzyme';
import TePuedeInteresar from '../../../../components/features/LN-nota/tePuedeInteresar/default';
import Consumer from 'fusion:consumer';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Te puede interesar default test', () => {
    it('Matches Snapshot', () => {
        const wrapper = render(<TePuedeInteresar />);
        expect(component).toMatchSnapshot();
    });
});
