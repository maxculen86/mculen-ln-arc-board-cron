jest.mock(
    '../../../../components/private/common/com-advance',
    () => 'ComAdvance'
);

import React from 'react';
import CajaAnticipo from '../../../../components/features/LN-common/cajaAnticipo';
import { shallow } from 'enzyme';

describe('Private - Feature - CajaAnticipo =>', () => {
    const mock = {
        title: 'Prueba Anticipo',
        link: 'https://www.lanacion.com.ar/',
        hide: false
    };

    const { title: titleMock, link: linkMock } = mock;

    describe('with empty location or type', () => {
        const wrapper1 = shallow(<CajaAnticipo />);
        const wrapper2 = shallow(
            <CajaAnticipo title={titleMock} hide={true} />
        );
        const wrapper3 = shallow(<CajaAnticipo hide={false} />);
        const wrapper4 = shallow(
            <CajaAnticipo hide={true} title={titleMock} link={linkMock} />
        );

        it('should returns null', () => {
            expect(
                wrapper1.html() &&
                    wrapper2.html() &&
                    wrapper3.html() &&
                    wrapper4.html()
            ).toEqual('');
        });
    });

    describe('with a valid response', () => {
        const wrapper = shallow(<CajaAnticipo {...mock} />);

        const result = wrapper.first();
        const ComAdvanceComponent = result.find('ComAdvance');

        it('should render ComAdvance component with correctly props', () => {
            const { title, link } = ComAdvanceComponent.props();

            expect(title).toStrictEqual(titleMock);
            expect(link).toStrictEqual(linkMock);
        });
    });
});
