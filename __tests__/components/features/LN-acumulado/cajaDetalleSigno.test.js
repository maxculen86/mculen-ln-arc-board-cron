import React from 'react';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import CajaDetalleSigno from '../../../../components/features/LN-acumulado/cajaDetalleSigno';
import API_RESPONSE_SIGN from '../../../../__mocks__/data/apiHoroscope/signoZodiaco';
import { shallow, render } from 'enzyme';

jest.mock('fusion:static', () => 'mock-static');
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const contextPath = '/pf';
const deployment = deploymentValue => deploymentValue;
const props = {
    id: 'f0fe94FFTrEC80O'
};
const globalContent = {
    _id: '/horoscopo/tauro'
};

describe('Features - LN-acumulado - Caja Detalle Signo Feature =>', () => {
    describe('Without data response ', () => {
        it('should return null', () => {
            useContent.mockImplementation(() => {});

            Context.useAppContext = jest.fn(() => ({
                globalContent
            }));

            const wrapper1 = shallow(<CajaDetalleSigno {...props} />);
            useContent.mockImplementation(() => ({
                data: undefined
            }));

            const wrapper2 = shallow(<CajaDetalleSigno {...props} />);

            expect(wrapper1.html() && wrapper2.html()).toBeNull();
        });
    });

    describe('With a valid response', () => {
        it('Should render CajaDetalleSigno component with correct props', () => {
            useContent.mockImplementation(() => API_RESPONSE_SIGN);

            const wrapper = shallow(<CajaDetalleSigno {...props} />);

            const result = wrapper.first();
            const CajaDetalleSignoComponent = result.find('DailyHoroscope');

            const { data: signosProps } = CajaDetalleSignoComponent.props();

            Context.useAppContext = jest.fn(() => ({
                globalContent
            }));

            expect(CajaDetalleSignoComponent.exists()).toBeTruthy();
            expect(signosProps).toStrictEqual(API_RESPONSE_SIGN.data);
            expect(Object.keys(signosProps).length).toBe(5);
        });
    });
    describe('Render feature CajaDetalleSigno and child components - snapshot', () => {
        it('Should match snapshot', () => {
            useContent.mockImplementation(() => API_RESPONSE_SIGN);

            Context.useAppContext = jest.fn(() => ({
                globalContent,
                contextPath,
                deployment
            }));

            const wrapper = render(<CajaDetalleSigno {...props} />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
