jest.mock(
    '../../../../../../components/private/LN/common/ranking',
    () => 'ranking-mock'
);

jest.mock('fusion:consumer', component => {
    return function(component) {
        class element extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }

            fetchContent() {
                return { content_elements: [
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
                ]};
            }

            getContent() {return {}}

        }

        return element;
    };
});
import React from 'react';
import Consumer from 'fusion:consumer';
import { render, mount, shallow } from 'enzyme';
import WithRankingData from '../../../../../../components/private/LN/common/hocs/WithRankingData';
import filter from '../../../../../../content/filters/LN/nota/articleRanking';
import Ranking from '../../../../../../components/private/LN/common/ranking';

import articleCollections from '../../../../../../__mocks__/data/articleCollections/politica';

describe('Private - LN - Common - hocs - WithRankingData', () => {
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
    const component = props => <Ranking {...props} />;

    const ComponentWithRankingData = WithRankingData(component, filter, 'm');

    let wrapper = shallow(<ComponentWithRankingData {...articleCollections} />);

    it('Render OK', () => {
        wrapper = shallow(<ComponentWithRankingData {...articleCollections} />);
        expect(wrapper).toBeDefined();
    });

    it('Atributos pasados al componente correctamente', () => {
        wrapper = shallow(<ComponentWithRankingData {...articleCollections} />);
        expect(wrapper.prop('title')).toBe('Más leídas de Política');
        expect(wrapper.prop('dataSection')).toBe('/politica');
        //TODO: fix este test
        //expect(wrapper.prop('articles')).toStrictEqual(articles);
    });
});
