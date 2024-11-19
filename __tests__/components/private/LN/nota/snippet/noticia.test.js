import React from 'react';
import { render } from '@testing-library/react';
import SnippetNoticia from '../../../../../../components/private/LN/nota/snippet/noticia';

jest.mock('fusion:environment', () => ({
    ARC_STATIC: 'https://arc-static.glanacion.com'
}));

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

const mockSiteProperties = {
    title: 'LA NACION',
    host: 'https://www.lanacion.com.ar'
};

const mockGlobalContent = {
    canonical_url: '/news-test',
    type: 'story',
    headlines: { basic: 'Test title' },
    taxonomy: { primary_section: { name: 'Test section' }, tags: [] },
    credits: { by: [] },
    created_date: '2023-01-01T00:00:00Z',
    first_publish_date: '2023-01-02T00:00:00Z',
    last_updated_date: '2023-01-03T00:00:00Z',
    display_date: '2023-01-04T00:00:00Z',
    content_restrictions: { content_code: 'abierta' },
    owner: { sponsored: false },
    distributor: { name: 'LA NACION' },
    label: { trust: { text: 'Noticia Original' } },
    promo_items: {},
    content_elements: [{ type: { text: 'text' } }]
};

const mockContextPath = '/pf';
const mockDeployment = value => value;

describe('SnippetNoticia', () => {
    it('should render a script with JSON-LD if the type is "story"', () => {
        const { container } = render(
            <SnippetNoticia
                siteProperties={mockSiteProperties}
                globalContent={mockGlobalContent}
                contextPath={mockContextPath}
                deployment={mockDeployment}
            />
        );

        expect(container.firstChild).toBeInstanceOf(HTMLScriptElement);
        expect(container.firstChild).toHaveAttribute(
            'type',
            'application/ld+json'
        );

        const jsonData = JSON.parse(
            container.querySelector('script').innerHTML
        );

        expect(jsonData).toMatchSnapshot();
        expect(jsonData).toMatchObject({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: 'Test title',
            url: 'https://www.lanacion.com.ar/news-test',
            dateCreated: '2023-01-01T00:00:00.000Z',
            datePublished: '2023-01-02T00:00:00.000Z',
            dateModified: '2023-01-04T00:00:00.000Z',
            mainEntityOfPage: 'https://www.lanacion.com.ar/news-test/',
            articleSection: 'Test section',
            isAccessibleForFree: true,
            hasPart: {
                '@type': 'WebPageElement',
                isAccessibleForFree: true,
                cssSelector: '.nota'
            },
            isPartOf: {
                '@type': ['CreativeWork', 'Product'],
                name: 'Acceso Digital Monthly Test',
                productID: 'lanacion.com.ar:acceso_digital'
            },
            author: { '@type': 'Organization', name: 'LA NACION' },
            creator: [],
            keywords: [],
            publisher: {
                '@type': 'Organization',
                name: 'LA NACION',
                url: 'https://www.lanacion.com.ar',
                logo: {
                    '@context': 'https://schema.org',
                    '@type': 'ImageObject',
                    url: 'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-600x60.jpg',
                    height: 60,
                    width: 600
                }
            },
            thumbnailUrl:
                'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-1200x800.jpg',
            image: {
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                url: 'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-1200x800.jpg',
                height: '800',
                width: '1200'
            },
            publishingPrinciples:
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/'
        });
    });

    it('Dates must comply with ISO 8601 standard', () => {
        const { container } = render(
            <SnippetNoticia
                siteProperties={mockSiteProperties}
                globalContent={mockGlobalContent}
                contextPath={mockContextPath}
                deployment={mockDeployment}
            />
        );

        const jsonData = JSON.parse(
            container.querySelector('script').innerHTML
        );

        expect(jsonData.dateCreated).toMatch(ISO_DATE_REGEX);
        expect(jsonData.datePublished).toMatch(ISO_DATE_REGEX);
        expect(jsonData.dateModified).toMatch(ISO_DATE_REGEX);
    });

    it('should not render anything if the type is not "story"', () => {
        const globalContentCopy = { ...mockGlobalContent, type: 'video' };

        const { container } = render(
            <SnippetNoticia
                siteProperties={mockSiteProperties}
                globalContent={globalContentCopy}
                contextPath={mockContextPath}
                deployment={mockDeployment}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });
});
