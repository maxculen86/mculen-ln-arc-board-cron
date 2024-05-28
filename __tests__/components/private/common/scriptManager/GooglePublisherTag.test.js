import React from 'react';
import { render } from '@testing-library/react';
import GooglePublisherTag from '../../../../../components/private/common/scriptManager/googlePublisherTag';

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

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
        const { container } = render(<GooglePublisherTag {...props} />);
        const scriptElements = container.querySelectorAll('script');

        expect(scriptElements.length).toBe(3);
    });
});
