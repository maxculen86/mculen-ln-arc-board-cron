jest.mock(
    '../../../../../../components/private/LN/acumulado/cabezalRevista/linkList',
    () => 'mocked-linkList'
);

jest.mock(
    '../../../../../../components/private/LN/acumulado/cabezalRevista/social',
    () => 'mocked-social'
);

import React from 'react';
import { mount } from 'enzyme';
import CabezalRevista from '../../../../../../components/private/LN/acumulado/cabezalRevista';

describe('components - private - LN - acumulado - cabezalRevista', () => {
    const globalContent = {
        social: {
            twitter: 'https://twitter.com/RevistaOhlala',
            instagram: 'https://www.instagram.com/revistaohlala',
            facebook: 'https://www.facebook.com/ohlalarevista'
        },
        style: {
            section_style_name: 'ohlala'
        },
        name: 'Ohlala',
        _id: '/revistas/ohlala'
    };

    const component = mount(<CabezalRevista globalContent={globalContent} />);

    it('chequeo que este el componente social y que tenga las props que corresponden', () => {
        const socialComponent = component.find('mocked-social');
        expect(socialComponent.length).toEqual(1);
        expect(socialComponent.prop('twitter')).toEqual(
            globalContent.social.twitter
        );
        expect(socialComponent.prop('facebook')).toEqual(
            globalContent.social.facebook
        );
        expect(socialComponent.prop('instagram')).toEqual(
            globalContent.social.instagram
        );
    });

    it('chequeo que se dibuje el componente linkList', () => {
        const linkListComponent = component.find('mocked-linkList');
        expect(linkListComponent.length).toEqual(1);
    });
});
