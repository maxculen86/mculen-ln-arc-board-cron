import React from 'react';
import { render } from '@testing-library/react';
import SnippetNoticia from '../../../../../../components/private/LN/nota/snippet/noticia';

jest.mock('fusion:environment', () => ({
    ARC_STATIC: 'https://arc-static.glanacion.com',
    SITE_LANACION: 'https://www.lanacion.com.ar'
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
    taxonomy: {
        primary_section: { name: 'Test section' },
        tags: []
    },
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
    content_elements: [{ type: 'text' }]
};

const mockContextPath = '/pf';
const mockDeployment = value => value;

describe('SnippetNoticia', () => {
    describe('default subtype (NewsArticle)', () => {
        it('should render a NewsArticle JSON-LD script when type is "story"', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={mockGlobalContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const script = container.querySelector('script');
            expect(script).toBeInstanceOf(HTMLScriptElement);
            expect(script).toHaveAttribute('type', 'application/ld+json');
            expect(script).toHaveAttribute('id', 'Schema_NewsArticle');

            const jsonData = JSON.parse(script.innerHTML);
            expect(jsonData).toMatchSnapshot();
            expect(jsonData).toMatchObject({
                '@context': 'https://schema.org',
                '@type': 'NewsArticle',
                headline: 'Test title',
                url: 'https://www.lanacion.com.ar/news-test',
                articleSection: 'Test section',
                isAccessibleForFree: true,
                hasPart: {
                    '@type': 'WebPageElement',
                    isAccessibleForFree: true,
                    cssSelector: '.nota'
                },
                author: {
                    '@type': 'Organization',
                    name: 'LA NACION'
                },
                creator: [],
                keywords: [],
                publishingPrinciples:
                    'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/'
            });
        });
    });

    describe('OPINION subtype', () => {
        const mockOpinionContent = {
            ...mockGlobalContent,
            subtype: '3'
        };

        it('should render OpinionNewsArticle schema for OPINION subtype', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={mockOpinionContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const script = container.querySelector('script');
            const jsonData = JSON.parse(script.innerHTML);

            expect(jsonData).toMatchObject({
                '@type': 'OpinionNewsArticle',
                articleSection: 'Opinión',
                author: {
                    '@type': 'Person',
                    name: 'Redacción LA NACION'
                }
            });
        });

        it('should NOT include Schema_NewsArticle id for OPINION subtype', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={mockOpinionContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const script = container.querySelector('script');
            expect(script).not.toHaveAttribute('id');
        });
    });

    describe('dates format', () => {
        it('dates must comply with ISO 8601 standard', () => {
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
    });

    describe('non story content', () => {
        it('should not render anything if the type is not "story"', () => {
            const globalContentCopy = {
                ...mockGlobalContent,
                type: 'video'
            };

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

    describe('review schema', () => {
        it('should render Schema_Review when numeric_rating exists', () => {
            const reviewContent = {
                ...mockGlobalContent,
                subtype: '1',
                canonical_url: '/espectaculos/cine/test-review',
                content_elements: [
                    {
                        type: 'numeric_rating',
                        numeric_rating: 4.5,
                        min: 0.5,
                        max: 5
                    }
                ]
            };

            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={reviewContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const reviewScript = container.querySelector('#Schema_Review');
            expect(reviewScript).toBeInstanceOf(HTMLScriptElement);

            const reviewSchemaData = JSON.parse(reviewScript.innerHTML);
            expect(reviewSchemaData).toMatchObject({
                '@context': 'https://schema.org',
                '@graph': [
                    {
                        '@type': 'NewsMediaOrganization',
                        '@id': 'https://www.lanacion.com.ar/#organization'
                    },
                    {
                        '@type': 'Review',
                        '@id': 'https://www.lanacion.com.ar/espectaculos/cine/test-review/#review',
                        reviewRating: {
                            '@type': 'Rating',
                            ratingValue: '4.5',
                            bestRating: '5',
                            worstRating: '0.5'
                        }
                    }
                ]
            });
        });

        it('should use Organization as author when note has no byline', () => {
            const reviewContent = {
                ...mockGlobalContent,
                subtype: '1',
                content_elements: [
                    {
                        type: 'numeric_rating',
                        numeric_rating: 3
                    }
                ],
                credits: { by: [] }
            };

            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={reviewContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const reviewSchemaData = JSON.parse(
                container.querySelector('#Schema_Review').innerHTML
            );
            const reviewNode = reviewSchemaData['@graph'].find(
                node => node['@type'] === 'Review'
            );

            expect(reviewNode.author).toMatchObject({
                '@type': 'Organization',
                name: 'LA NACION',
                url: 'https://www.lanacion.com.ar/'
            });
        });

        it('should set itemReviewed as Thing for non-cine urls', () => {
            const reviewContent = {
                ...mockGlobalContent,
                subtype: '1',
                canonical_url: '/revista-living/nota-test',
                content_elements: [
                    {
                        type: 'numeric_rating',
                        numeric_rating: 4
                    }
                ]
            };

            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={reviewContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const reviewSchemaData = JSON.parse(
                container.querySelector('#Schema_Review').innerHTML
            );
            const reviewNode = reviewSchemaData['@graph'].find(
                node => node['@type'] === 'Review'
            );

            expect(reviewNode.itemReviewed).toMatchObject({
                '@type': 'Thing',
                name: 'Test title'
            });
        });

        it('should NOT render Schema_Review for non-NOTICIA subtype', () => {
            const reviewContent = {
                ...mockGlobalContent,
                subtype: '3',
                content_elements: [
                    {
                        type: 'numeric_rating',
                        numeric_rating: 4
                    }
                ]
            };

            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={reviewContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            expect(container.querySelector('#Schema_Review')).toBeNull();
        });
    });
});
