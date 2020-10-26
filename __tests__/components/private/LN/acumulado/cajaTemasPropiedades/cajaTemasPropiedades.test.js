jest.mock('fusion:content', () => ({
    useContent: () => ({
        content_elements: [
            {
                _id: 'PFWVOTLZFJDGVPC7ZAE7M3LUL4',
                credits: {},
                display_date: '2020-07-14T20:25:31.279Z',
                headlines: {
                    basic:
                        'Daniel Scioli: "El servicio militar obligatorio es una etapa superada"'
                },
                subtype: '1',
                taxonomy: {
                    primary_section: { _id: '/politica', name: 'Política' },
                    tags: []
                },
                website_url:
                    '/politica/daniel-scioli-servicio-militar-obligatorio-nid1686560/'
            },
            {
                _id: '3WBPOJBXLZGOBLTIPIZBMOCYVY',
                credits: { by: [] },
                display_date: '2020-07-14T19:45:30.019Z',
                headlines: {
                    basic:
                        'Un acuerdo que somete al país a duras obligaciones por largos años'
                },
                subtype: '1',
                taxonomy: {
                    primary_section: { _id: '/politica', name: 'Política' },
                    tags: []
                },
                website_url:
                    '/politica/un-acuerdo-que-somete-al-pais-a-duras-obligaciones-por-largos-anos-nid1685019/'
            },
            {
                _id: 'OP64F67GVJEQJNG35PYVYS4BKE',
                credits: { by: [] },
                display_date: '2020-07-14T18:55:22.468Z',
                headlines: {
                    basic: 'Imagen de perfección alejada de la realidad'
                },
                subtype: '3',
                taxonomy: {
                    primary_section: { _id: '/politica', name: 'Política' },
                    tags: []
                },
                website_url:
                    '/politica/imagen-de-perfeccion-alejada-de-la-realidad-nid1668703/'
            }
        ]
    })
}));

jest.mock(
    '../../../../../../components/private/LN/acumulado/cajaTemasPropiedades/index',
    () => 'caja-tema-propiedades-mock'
);
jest.mock(
    '../../../../../../components/private/common/com-title',
    () => 'com-title-mock'
);

import React from 'react';
import { render, mount, shallow } from 'enzyme';
import withCollections from '../../../../../../components/private/LN/acumulado/hocs/withCollections';
import filter from '../../../../../../content/filters/LN/acumulado/collections';
import CajaTemasPropiedades from '../../../../../../components/private/LN/acumulado/cajaTemasPropiedades/index';

describe('Private - Common - hocs - withCollections => ', () => {
    const articles = [
        {
            _id: 'PFWVOTLZFJDGVPC7ZAE7M3LUL4',
            credits: {},
            display_date: '2020-07-14T20:25:31.279Z',
            headlines: {
                basic:
                    'Daniel Scioli: "El servicio militar obligatorio es una etapa superada"'
            },
            subtype: '1',
            taxonomy: {
                primary_section: { _id: '/politica', name: 'Política' },
                tags: []
            },
            website_url:
                '/politica/daniel-scioli-servicio-militar-obligatorio-nid1686560/'
        },
        {
            _id: '3WBPOJBXLZGOBLTIPIZBMOCYVY',
            credits: { by: [] },
            display_date: '2020-07-14T19:45:30.019Z',
            headlines: {
                basic:
                    'Un acuerdo que somete al país a duras obligaciones por largos años'
            },
            subtype: '1',
            taxonomy: {
                primary_section: { _id: '/politica', name: 'Política' },
                tags: []
            },
            website_url:
                '/politica/un-acuerdo-que-somete-al-pais-a-duras-obligaciones-por-largos-anos-nid1685019/'
        },
        {
            _id: 'OP64F67GVJEQJNG35PYVYS4BKE',
            credits: { by: [] },
            display_date: '2020-07-14T18:55:22.468Z',
            headlines: {
                basic: 'Imagen de perfección alejada de la realidad'
            },
            subtype: '3',
            taxonomy: {
                primary_section: { _id: '/politica', name: 'Política' },
                tags: []
            },
            website_url:
                '/politica/imagen-de-perfeccion-alejada-de-la-realidad-nid1668703/'
        }
    ];

    const props = {
        idCollection: 'QJ3BOEZVQNEYZEVBXHF4C7KAWY',
        title:'Titulo',
        url:'https://google.com',
        outputType:'default', 
        size:'6',
        articles
    };

    const component = props => <CajaTemasPropiedades {...props} />;

    const ComponentWithCollections = withCollections(
        component(props),
        filter,
        'notaM'
    );

    it('Render OK', () => {
        const wrapper = shallow(<ComponentWithCollections {...props} />);
        expect(wrapper).toBeDefined();
    });

    it('Render NOTOK', () => {
        const props = {};

        const component = props => <CajaTemasPropiedades {...props} />;

        const ComponentWithCollections = withCollections(
            component(props),
            filter,
            'notaM'
        );

        const wrapper = render(<ComponentWithCollections {...props} />);
        expect(wrapper).toBeDefined();
        expect(wrapper.html()).toBeNull();
    });

    it('Atributos pasados al componente correctamente', () => {
        const wrapper = shallow(<ComponentWithCollections  {...props} />);
        expect(wrapper.find('caja-tema-propiedades-mock')).toBeTruthy();
        expect(wrapper.prop('articles').length).toStrictEqual(3);
        expect(wrapper.prop('articles')).toStrictEqual(articles);
    });
});
