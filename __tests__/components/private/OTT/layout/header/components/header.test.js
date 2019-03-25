
//retorno un elemento que luego busco en el container
jest.mock('../../../../../../../components/private/OTT/features/header/containers/headerItem',
    () => 'mock-component');

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import HeaderComponent from '../../../../../../../components/private/OTT/features/header/components/header';

describe('OTT - layout - header - components', () => {
    const child = <hijos>soy un child default</hijos>
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
        }]
    const data = { dataEvent: 'link 2' }
    const container = mount(
        <HeaderComponent
            items={items}
            children={child}
            data={data}
        />
    )
    const children = container.find('hijos')
    const container1 = container.find('mock-component').at(0)
    const container2 = container.find('mock-component').at(1)
    const mockedContainers = container.find('mock-component')

    it('Testeo que no renderee los children', () => {
        expect(children.length).toEqual(0)
    });
    it('Test 2 items - Testeo que el item 1 reciba las props del item 1', () => {
        expect(container1.prop('description')).toEqual(items[0].description)
        expect(container1.prop('alt')).toEqual(items[0].description)
        expect(container1.prop('href')).toEqual(items[0].href)
        expect(container1.prop('data')).toEqual(data)
    });
    it('Test 2 items - Testeo que el item 2 reciba las props del item 2', () => {
        expect(container2.prop('description')).toEqual(items[1].description)
        expect(container2.prop('alt')).toEqual(items[1].description)
        expect(container2.prop('href')).toEqual(items[1].href)
        expect(container2.prop('data')).toEqual(data)
    });
    it('Test 2 items - Testeo que no exista un item 3', () => {
        expect(mockedContainers.length).toEqual(2)
    });
});