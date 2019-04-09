import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper'
import Footer from '../../../../../../../components/private/OTT/layouts/footer/containers/footer';

describe('private - OTT - layouts - footer - containers - footer', () => {

    const children = <label>Soy un child</label>
    const component = mount(<Footer>{children}</Footer>);
    const html = '<p class="footer-copyright-text">Todos los derechos reservados</p>'

    testHelper.testDoNotRenderChildren(component, 'children')

    it('testeo que contenga el html definido dentro', () => {
        testHelper.expectHTML(component, html)    
    })
})