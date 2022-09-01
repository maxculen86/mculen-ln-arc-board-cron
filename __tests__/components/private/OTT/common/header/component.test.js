import Context from 'fusion:context';
//jest.mock('fusion:context', () => 'a')
//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../components/private/OTT/common/header/headerItem',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../utils/testHelper';
import HeaderComponent from '../../../../../../components/private/OTT/common/header/component';

describe('OTT - layout - header - components', () => {
    let items = [
        {
            description: 'description 1',
            href: 'href 1/',
            alt: 'alt 1'
        },
        {
            description: 'description 2',
            href: 'href 2/',
            alt: 'alt 2'
        }
    ];
    const data = { dataEvent: 'link 2' };
    const container = mount(<HeaderComponent items={items} data={data} />);
    const container1 = container.find('mock-component').at(0);
    const container2 = container.find('mock-component').at(1);
    const mockedContainers = container.find('mock-component');

    it('Test 2 items - Testeo que el item 1 reciba las props del item 1', () => {
        testHelper.expectProp(container1, 'description', items[0].description);
        testHelper.expectProp(container1, 'alt', items[0].alt);
        testHelper.expectProp(container1, 'href', items[0].href);
        testHelper.expectProp(container1, 'data', data);
    });
    it('Test 2 items - Testeo que el item 2 reciba las props del item 2', () => {
        testHelper.expectProp(container2, 'description', items[1].description);
        testHelper.expectProp(container2, 'alt', items[1].alt);
        testHelper.expectProp(container2, 'href', items[1].href);
        testHelper.expectProp(container2, 'data', data);
    });
    it('Test 2 items - Testeo que no exista un item 3', () => {
        testHelper.expectSameValue(mockedContainers.length, 2);
    });

    it('Snapshot Test', () => {
        //const jsonComponent = container.toJSON();
        expect(container).toMatchSnapshot();
    });
});

describe('OTT - layout - header - components - cambio de items', () => {
    let items = [
        {
            description: 'description 1',
            href: 'href 1/',
            alt: 'alt 1'
        },
        {
            description: 'description 2',
            href: 'href 2/',
            alt: 'alt 2'
        }
    ];
    const data = { dataEvent: 'link 2' };
    const container = mount(<HeaderComponent items={items} data={data} />);

    //cambio los items
    items = [
        {
            description: 'description 3',
            href: 'href 3/',
            alt: 'alt 3'
        }
    ];

    container.setProps({ items: items });
    const newMockedComponents = container.find('mock-component');

    it('Test 1 items - Testeo que solo tenga un item', () => {
        testHelper.expectSameValue(newMockedComponents.length, 1);
    });
    const newMockItem = container.find('mock-component').at(0);
    it('Test 1 items - Testeo que el item nuevo reciba las props del item nuevo 1', () => {
        testHelper.expectProp(newMockItem, 'description', items[0].description);
        testHelper.expectProp(newMockItem, 'alt', items[0].alt);
        testHelper.expectProp(newMockItem, 'href', items[0].href);
        testHelper.expectProp(newMockItem, 'data', data);
    });
});
