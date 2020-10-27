import React from 'react';
/*
jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
*/
import Consumer from 'fusion:consumer';
import { mount, shallow, render } from 'enzyme';
import MetaDescription from '../../../../../components/private/common/metaDescription';
import MetaDescriptionAcumulado from '../../../../../components/private/LN/acumulado/metaDescriptionAcumulado';

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

    it('MetaDescriptionAcumulado', () => {
        const props = {
            size: '5',
            title:'Politica',
            sectionId:'/politica',
            globalContent: { type: {}, _id: '/politica'}
        };
     
        const wrapper = render(<MetaDescriptionAcumulado {...props} />);
        expect(wrapper).toMatchSnapshot();

    });
});
