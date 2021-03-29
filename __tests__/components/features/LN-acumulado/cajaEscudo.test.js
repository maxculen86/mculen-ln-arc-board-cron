jest.mock(
    '../../../../components/private/common/mod-shield',
    () => 'ModShield'
);

import React from 'react';
import { useContent } from 'fusion:content';
import CajaEscudo from '../../../../components/features/LN-acumulado/cajaEscudo';
import SHIELD_DATA from '../../../../__mocks__/data/shields/shields';
import { shallow } from 'enzyme';

describe('Features - LN-acumulado - Caja Escudo Feature =>', () => {
    describe('with a valid response', () => {
        useContent.mockImplementation(() => SHIELD_DATA);

        const wrapper = shallow(<CajaEscudo />);
        const result = wrapper.first();
        const ModShieldComponent = result.find('ModShield');

        it('should render ModShield component with correctly props', () => {
            const { data, title } = ModShieldComponent.props();
            const { title: titleMock } = SHIELD_DATA;

            expect(data.length).toBe(27);
            expect(title).toStrictEqual(titleMock);
        });
    });
});
