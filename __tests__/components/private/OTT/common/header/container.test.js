import Consumer from 'fusion:consumer';
//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../components/private/OTT/common/header/component',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import HeaderContainer from '../../../../../../components/private/OTT/common/header/container';
import testHelper from '../../../../../utils/testHelper';

describe('OTT - layout - header - container - sin navigations', () => {
    const items = [
        { item: 'un item de prueba 1' },
        { item: 'otra item de prueba 2' }
    ];
    const dataItems = {
        'data-event': 'LinkClick',
        'data-section': 'HeaderOTT'
    };
    const container = mount(<HeaderContainer navigations={[]} />);

    const component = container.find('mock-component');

    it('Testeo que no pase items', () => {
        testHelper.expectProp(component, 'items', []);
    });
    it('Testeo que pase los data', () => {
        testHelper.expectProp(component, 'data', dataItems);
    });
});

describe('OTT - layout - header - container - con navigations', () => {
    const navigations = [
        {
            node_type: 'link',
            url: 'url del link',
            display_name: 'link con url'
        },
        {
            node_type: 'section',
            site: { site_url: 'con site url' },
            name: 'section con nombre con site'
        },
        {
            node_type: 'section',
            site: null,
            name: 'section con nombre sin site'
        }
    ];
    const dataItems = {
        'data-event': 'LinkClick',
        'data-section': 'HeaderOTT'
    };
    const container = mount(<HeaderContainer navigations={navigations} />);

    const component = container.find('mock-component');

    it('Testeo que no pase items', () => {
        testHelper.expectProp(component, 'items', [
            {
                description: navigations[0].display_name,
                href: navigations[0].url,
                alt: navigations[0].display_name
            },
            {
                description: navigations[1].name,
                href: navigations[1].site.site_url,
                alt: navigations[1].name
            },
            {
                description: navigations[2].name,
                href: '/',
                alt: navigations[2].name
            }
        ]);
    });
    it('Testeo que pase los data', () => {
        testHelper.expectProp(component, 'data', dataItems);
    });
});
