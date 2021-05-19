// jest.mock(
//     '../../../../components/private/common/com-advance',
//     () => 'ComAdvance'
// );

import React from 'react';
import CajaPromo from '../../../../components/features/LN-common/cajaPromo/default';
import { shallow, mount } from 'enzyme';

describe('Private - Feature - CajaAnticipo =>', () => {
    const mock = {
        text:
            'La información más completa del mercado inmobiliario minuto a minuto.',
        link: 'https://www.lanacion.com.ar/',
        logoName: 'propiedades'
    };

    describe('with a valid response', () => {
        const wrapper = shallow(<CajaPromo customFields={{ ...mock }} />);

        const result = wrapper.first();
        const ModPromoComponent = result.find('ModPromo');

        it('should render ModPromo component with correctly props', () => {
            const { text, link, logoName } = ModPromoComponent.props();

            expect(text).toStrictEqual(mock.text);
            expect(link).toStrictEqual(mock.link);
            expect(logoName).toStrictEqual(mock.logoName);
        });

        it('Snapshot Caja Promo', () => {
            const component = mount(<CajaPromo customFields={{ ...mock }} />);
            expect(component).toMatchSnapshot();
        });
    });
});
