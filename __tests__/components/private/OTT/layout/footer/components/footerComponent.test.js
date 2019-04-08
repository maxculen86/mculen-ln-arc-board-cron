import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper'
import Footer from '../../../../../../../components/private/OTT/layouts/footer/components/footer';

describe('private - OTT - layouts - footer - components - footer', () => {
    const year = (new Date()).getFullYear()
    const children = <label>Soy un children</label>
    const component = mount(<Footer year={year}>{children}</Footer>);
    const html = '<p class="footer-copyright-text">Todos los derechos reservados</p>'
    
    it('testeo que dibuje el año pasado', () => {
        testHelper.expectProp(component, 'year', year)
    })
    
    it('testeo que contenga el html definido', () => {
        testHelper.expectHTML(component, html)    
    })
    
    testHelper.testDoNotRenderChildren(component, 'children')
    
    
});
