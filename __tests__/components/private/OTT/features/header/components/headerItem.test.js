//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import HeaderComponent from '../../../../../../../components/private/OTT/features/header/containers/headerItem';
import testHelper from '../../../../../../utils/testHelper'
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
        testHelper.expectSameValue(link.length,1)
    });

    it('Testeo que lleguen las props que envien', () => {
        testHelper.expectProp(container, 'href', props.href)
        testHelper.expectProp(container, 'alt', props.alt)
        testHelper.expectSameValue(container.text(), props.description)
        testHelper.expectProp(link, 'data-section', props.data["data-section"])
        testHelper.expectProp(link, 'data-event', props.data["data-event"])
    });

})
