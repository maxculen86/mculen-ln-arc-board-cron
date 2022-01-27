import React from 'react';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import CajaHoroscopos from '../../../../components/features/LN-acumulado/cajaHoroscopos';
import API_RESPONSE_ZODIAC from '../../../../__mocks__/data/apiHoroscope/horoscoposZodiaco';
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
    customFields: { title: 'Seleccioná tu signo...' },
    id: 'f0fTek5ovhrk51V'
};
const globalContent = {
    _id: '/horoscopo'
};

describe('Features - LN-acumulado - Caja Horoscopos Feature =>', () => {
    describe('without data response nothing renders ', () => {
        it('Should return null', () => {
            useContent.mockImplementation(() => {});

            Context.useAppContext = jest.fn(() => ({
                globalContent
            }));

            const wrapper1 = shallow(<CajaHoroscopos {...props} />);

            useContent.mockImplementation(() => ({
                data: undefined
            }));

            const wrapper2 = shallow(<CajaHoroscopos {...props} />);

            expect(wrapper1.html() && wrapper2.html()).toBeNull();
        });
    });

    describe('With a valid response', () => {
        it('should render HoroscopeBox component with correct props', () => {
            useContent.mockImplementation(() => API_RESPONSE_ZODIAC);

            const wrapper = shallow(<CajaHoroscopos {...props} />);
            const result = wrapper.first();
            const HoroscopeBoxComponent = result.find('HoroscopeBox');

            const { signos: signosProps } = HoroscopeBoxComponent.props();

            Context.useAppContext = jest.fn(() => ({
                globalContent
            }));

            const { data } = API_RESPONSE_ZODIAC;

            expect(HoroscopeBoxComponent.exists()).toBeTruthy();
            expect(signosProps).toStrictEqual(data.signos);
            expect(signosProps.length).toBe(12);
        });
    });
    describe('Render feature CajaHoroscopos and child components - snapshot', () => {
        it('Should match snapshot', () => {
            useContent.mockImplementation(() => API_RESPONSE_ZODIAC);

            Context.useAppContext = jest.fn(() => ({
                globalContent,
                contextPath,
                deployment
            }));

            const wrapper = render(<CajaHoroscopos {...props} />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
