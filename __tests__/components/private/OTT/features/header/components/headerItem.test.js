//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import HeaderComponent from '../../../../../../../components/private/OTT/features/header/containers/headerItem';

describe('OTT - layout - headerItem - components', () => {

    const data = {'data-event': 'LinkClick', 'data-section': 'HeaderOTT' }
    const props = {
        description: 'descripcion',
        href: '#gogle',
        alt: 'description',
        data: data
    }
    

    const container = mount(
        <HeaderComponent
            {...props}
        />
    )
    const link = container.find('a')


    it('Testeo que renderee el link', () => {
        expect(link.length).toEqual(1)
    });

    it('Testeo que lleguen las props que envien', () => {
        expect(container.prop('href')).toEqual(props.href)
        expect(container.text()).toEqual(props.description)
        expect(container.prop('alt')).toEqual(props.alt)
        expect(link.prop('data-section')).toEqual(props.data["data-section"])
        expect(link.prop('data-event')).toEqual(props.data["data-event"])
    });

})
