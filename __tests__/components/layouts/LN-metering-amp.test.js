import React from 'react';
import { shallow } from 'enzyme';
import LNMeteringAmp from '../../../components/layouts/LN-metering-amp';
import Consumer from 'fusion:consumer';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('layout LN-meteting-amp', () => {
    const props = {
        queryParams: {
            id: '/espectaculos/luz-camara-accion-nid574/'
        },
        params: ['comun', 'BL4RTKROKZFUXKO5IJZ25PYG2I']
    };
    it('should return  meteringAMP script', () => {
        const wrapper = shallow(<LNMeteringAmp globalContent={props} />);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should return  empty frame', () => {
        const wrapper = shallow(<LNMeteringAmp />);
        expect(wrapper.html()).toEqual('');
    });
});
