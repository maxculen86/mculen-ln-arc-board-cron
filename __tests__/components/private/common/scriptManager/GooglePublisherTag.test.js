import React from 'react';
import { mount } from 'enzyme';
import GooglePublisherTag from '../../../../../components/private/common/scriptManager/googlePublisherTag';

describe('GooglePublisherTag', () => {
    const props = {
        location: 'header',
        globalContent: {
            _id: '6WTWFSCNKBGHTPTZUBF7WOPC5M',
            type: 'story',
            canonical_url: '/economia/ultima-prueba-syndication-nid14052020/',
            credits: {
                by: [
                    {
                        name: 'John Doe'
                    }
                ]
            },
            taxonomy: {
                primary_section: {
                    name: 'Turismo'
                },
                sections: [
                    {
                        _id: '/economia',
                        _website: 'la-nacion-ar',
                        additional_properties: {},
                        name: 'Economía',
                        parent_id: '/',
                        path: '/economia'
                    },
                    {
                        _id: '/revista-jardin',
                        _website: 'la-nacion-ar',
                        additional_properties: { original: {} },
                        name: 'Revista Jardín',
                        parent_id: '/',
                        path: '/revista-jardin'
                    }
                ],
                tags: [
                    {
                        text: 'comun',
                        description: 'comun',
                        slug: 'comun'
                    },
                    {
                        text: 'turismo',
                        description: 'turismo',
                        slug: 'turismo'
                    }
                ]
            },
            syndication: { search: false, external_distribution: false },
            label: {
                recomendar: {
                    text: 'No'
                }
            }
        }
    };
    it('Builds the json object accordingly', () => {
        const component = mount(<GooglePublisherTag {...props} />);

        const script =
            "googletag.pubads().setTargeting('tags_nuevos', ['ca_economia','ca_revista_jardin', 'te_comun','te_turismo', 'au_john_doe', 'url_economia_ultima-prueba-syndication-nid14052020', 'te_6WTWFSCNKBGHTPTZUBF7WOPC5M'])";

        expect(component.find('script')).toHaveLength(2);
        expect(
            component
                .find('script')
                .filterWhere(item => item.prop('type') === 'text/javascript')
        ).toHaveLength(1);
        expect(component.html()).toContain(script);
    });
});
