//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../../components/private/OTT/common/header/containers/headerItem',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper';
import HeaderComponent from '../../../../../../../components/private/OTT/common/header/components/header';

describe('OTT - layout - header - components', () => {
    const child = <hijos>soy un child default</hijos>;
    const items = [
        {
            description: 'description 1',
            href: 'href 1',
            alt: 'alt 1'
        },
        {
            description: 'description 2',
            href: 'href 2',
            alt: 'alt 2'
        }
    ];
    const data = { dataEvent: 'link 2' };
    const container = mount(
        <HeaderComponent items={items} children={child} data={data} />
    );
    const children = container.find('hijos');
    const container1 = container.find('mock-component').at(0);
    const container2 = container.find('mock-component').at(1);
    const mockedContainers = container.find('mock-component');

    testHelper.testDoNotRenderChildren(container, 'hijos');

    it('Test 2 items - Testeo que el item 1 reciba las props del item 1', () => {
        testHelper.expectProp(container1, 'description', items[0].description);
        testHelper.expectProp(container1, 'alt', items[0].description);
        testHelper.expectProp(container1, 'href', items[0].href);
        testHelper.expectProp(container1, 'data', data);
    });
    it('Test 2 items - Testeo que el item 2 reciba las props del item 2', () => {
        testHelper.expectProp(container2, 'description', items[1].description);
        testHelper.expectProp(container2, 'alt', items[1].description);
        testHelper.expectProp(container2, 'href', items[1].href);
        testHelper.expectProp(container2, 'data', data);
    });
    it('Test 2 items - Testeo que no exista un item 3', () => {
        testHelper.expectSameValue(mockedContainers.length, 2);
    });
});
