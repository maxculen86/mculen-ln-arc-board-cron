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
                },
                eje_subeje: {
                    text: 'Trends'
                }
            }
        }
    };

    it('Builds the json object accordingly', () => {
        const { container } = render(<GooglePublisherTag {...props} />);

        const asyncScript = document.head.querySelector(
            'script[src*="gpt.js"]'
        );
        const metadataScript = container.querySelector(
            '#googlePublisherTag-metadata'
        );

        expect(asyncScript).toBeInTheDocument();
        expect(metadataScript).toBeInTheDocument();
    });

    it('Includes the googlePublisherTag-metadata script in the DOM', () => {
        const { container } = render(<GooglePublisherTag {...props} />);
        // In React 19, scripts with defer and other attributes stay in container
        const googlePublisherTagScript = container.querySelector(
            '#googlePublisherTag-metadata'
        );
        expect(googlePublisherTagScript).toBeInTheDocument();
    });

    it('Generates the correct new-tags', () => {
        const { container } = render(<GooglePublisherTag {...props} />);
        // In React 19, scripts with defer and other attributes stay in container
        const googlePublisherTagScript = container.querySelector(
            '#googlePublisherTag-metadata'
        );
        const newTags = JSON.parse(
            googlePublisherTagScript.getAttribute('data-new-tags')
        );

        expect(newTags).toContain('te_6WTWFSCNKBGHTPTZUBF7WOPC5M');
        expect(newTags).toContain('ca_economia,ca_revista_jardin');
        expect(newTags).toContain('te_comun');
        expect(newTags).toContain('te_turismo');
        expect(newTags).toContain('au_john_doe');
        expect(newTags).toContain(
            'url_economia_ultima-prueba-syndication-nid14052020'
        );
        expect(newTags).toContain('Trends');
    });
});
