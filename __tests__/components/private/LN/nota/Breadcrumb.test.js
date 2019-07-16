import Consumer from 'fusion:consumer';

import React from 'react';
import { mount, render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';

import Breadcrumb from '../../../../../components/private/LN/nota/breadcrumb';

describe('features - LaNacion - Nota - ', () => {
    const component = render(
        <Breadcrumb globalContent={nota} siteProperties={siteProps} />
    );
    it('Test de snapshot Breadcrumb', () => {
        expect(component).toMatchSnapshot();
    });

    // it("Test de Breadcrumb variante 1 nivel", ()=>{
    //     expect(component.find('div')).to.have.lenghtOf(1);
    // });
});
