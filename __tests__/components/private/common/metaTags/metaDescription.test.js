import React from 'react';
import { mount } from 'enzyme';
import MetaDescription from '../../../../../components/private/common/metaDescription';

describe('LN - Common - MetaDescription', () => {
    it('MetaDescription nota snapshot', () => {
        const metaTitleBasic = mount(
            <MetaDescription
                arcSite="la-nacion-ar"
                subtype="1"
                metaTitleBasic="El Gobierno evalúa postular a una diplomática de carrera para la embajada en el Vaticano"
                firstParagraphContentElements="La postulación de la diplomática, elogiada en varias ocasiones públicamente por Felipe Solá, tomó fuerza en las últimas horas y, por ahora, no genera resistencias en el Palacio San Martín."
                description="Descripción Pruebaaaaa !!!"
            />
        );
        expect(metaTitleBasic).toMatchSnapshot();
    });
});
