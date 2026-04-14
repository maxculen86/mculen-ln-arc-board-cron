import React from 'react';
import { render } from '@testing-library/react';
import SnippetNoticia from '../../../../../../components/private/LN/nota/snippet/noticia';

jest.mock('fusion:environment', () => ({
    ARC_STATIC: 'https://arc-static.glanacion.com',
    SITE_LANACION: 'https://www.lanacion.com.ar',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    API_ENV: 'sandbox',
    IS_STAGING: 'false'
}));

jest.mock('fusion:properties', () => () => ({
    host: 'https://www.lanacion.com.ar'
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
const mockBodyContentElements = [
    {
        type: 'text',
        content: 'Primer <b>parrafo</b>.'
    },
    {
        type: 'image'
    },
    {
        type: 'text',
        content: 'Segundo parrafo.'
    }
];
const mockBodyContentElementsWithList = [
    {
        type: 'text',
        content: 'Primer <b>parrafo</b>.'
    },
    {
        type: 'list',
        items: [
            {
                _id: 'list-item-1',
                type: 'text',
                content: 'Primer bullet'
            },
            {
                _id: 'list-item-2',
                type: 'text',
                content: 'Segundo <strong>bullet</strong>'
            }
        ]
    },
    {
        type: 'text',
        content: 'Segundo parrafo.'
    }
];

const mockPromoImage = {
    type: 'image',
    url: 'https://sandbox-resizer.glanacion.com/resizer/v2/el-28-de-septiembre-de-2004-rafael-juniors-solich-3YRGESSOH5A5TBN5HGJBCFH42M.png?auth=822e93af946ad74abe52eb6f306bb3d63ad3c455f8eaabaa4a14b14f67a9d3d7&width=880&height=586&quality=70&smart=true',
    caption:
        'El 28 de septiembre de 2004, Rafael Juniors Solich asesinó a tres compañeros en una escuela de Carmen de Patagones',
    resized_urls: [
        {
            resizedUrl:
                'https://sandbox-resizer.glanacion.com/resizer/v2/el-28-de-septiembre-de-2004-rafael-juniors-solich-3YRGESSOH5A5TBN5HGJBCFH42M.png?auth=822e93af946ad74abe52eb6f306bb3d63ad3c455f8eaabaa4a14b14f67a9d3d7&width=880&height=586&quality=70&smart=true',
            option: {
                width: 880,
                height: 586
            }
        }
    ]
};

const mockBodyImage = {
    type: 'image',
    url: 'https://sandbox-resizer.glanacion.com/resizer/v2/un-alumno-ingreso-armado-a-un-colegio-de-santa-fe-EILA5UAAWFGPFHPQID4T42RSF4.jpg?auth=9e502bc440814e8ea6270c5065a0773a95513c44263675b901b3b9af24bc894d&width=768&height=432&quality=70&smart=true',
    caption:
        'Un alumno ingresó armado a un colegio de Santa Fe y mató a un compañero',
    resized_urls: [
        {
            resizedUrl:
                'https://sandbox-resizer.glanacion.com/resizer/v2/un-alumno-ingreso-armado-a-un-colegio-de-santa-fe-EILA5UAAWFGPFHPQID4T42RSF4.jpg?auth=9e502bc440814e8ea6270c5065a0773a95513c44263675b901b3b9af24bc894d&width=768&height=432&quality=70&smart=true',
            option: {
                width: 768,
                height: 432
            }
        }
    ]
};

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
                author: {
                    '@type': 'Organization',
                    name: 'LA NACION'
                },
                creator: [],
                keywords: [],
                publishingPrinciples:
                    'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/'
            });
            expect(jsonData.hasPart).toBeUndefined();
        });

        it('should set isAccessibleForFree as true when content_code is undefined', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        content_restrictions: {}
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                isAccessibleForFree: true
            });
            expect(jsonData.hasPart).toBeUndefined();
        });

        it('should set isAccessibleForFree as false when content_code is cerrada', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        content_restrictions: { content_code: 'cerrada' }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                isAccessibleForFree: false
            });
            expect(jsonData.hasPart).toBeUndefined();
        });

        it('should use the canonical site host for the schema url', () => {
            const siteProperties = {
                ...mockSiteProperties,
                host: 'https://www.lanacion.com.ar/'
            };

            const { container } = render(
                <SnippetNoticia
                    siteProperties={siteProperties}
                    globalContent={mockGlobalContent}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData.url).toBe('https://www.lanacion.com.ar/news-test');
            expect(jsonData.mainEntityOfPage).toMatchObject({
                '@type': 'WebPage',
                '@id': 'https://www.lanacion.com.ar/news-test/'
            });
        });

        it('should render the full schema image structure when promo and body images exist', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        promo_items: {
                            basic: mockPromoImage
                        },
                        content_elements: [
                            { type: 'text', content: 'Primer parrafo.' },
                            mockBodyImage
                        ]
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchSnapshot();
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

    describe('NewsArticle schema variations by primary section', () => {
        const mockSectionContent = {
            ...mockGlobalContent,
            subheadlines: { basic: 'Bajada test' },
            content_elements: mockBodyContentElements
        };

        it('should add description and full articleBody and omit hasPart for automovilismo', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockSectionContent,
                        taxonomy: {
                            primary_section: {
                                name: 'Automovilismo',
                                _id: '/deportes/automovilismo'
                            },
                            tags: []
                        }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                description: 'Bajada test',
                articleBody: 'Primer parrafo. Segundo parrafo.'
            });
            expect(jsonData.hasPart).toBeUndefined();
        });

        it('should add description and full articleBody and omit hasPart for horoscopo', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockSectionContent,
                        taxonomy: {
                            primary_section: {
                                name: 'Horoscopo',
                                _id: '/horoscopo'
                            },
                            tags: []
                        }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                description: 'Bajada test',
                articleBody: 'Primer parrafo. Segundo parrafo.'
            });
            expect(jsonData.hasPart).toBeUndefined();
        });

        it('should add description and full articleBody and omit hasPart for opinion section', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockSectionContent,
                        taxonomy: {
                            primary_section: {
                                name: 'Opinion',
                                _id: '/opinion'
                            },
                            tags: []
                        }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                description: 'Bajada test',
                articleBody: 'Primer parrafo. Segundo parrafo.'
            });
            expect(jsonData.hasPart).toBeUndefined();
        });

        it('should add description from first paragraph and full articleBody and omit hasPart for sociedad subsection', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        content_elements: mockBodyContentElements,
                        taxonomy: {
                            primary_section: {
                                name: 'Sociedad',
                                _id: '/sociedad/transito'
                            },
                            tags: []
                        }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                description: 'Primer parrafo.',
                articleBody: 'Primer parrafo. Segundo parrafo.'
            });
            expect(jsonData.hasPart).toBeUndefined();
        });

        it('should include list items in articleBody for sections with full articleBody', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        subheadlines: { basic: 'Bajada test' },
                        content_elements: mockBodyContentElementsWithList,
                        taxonomy: {
                            primary_section: {
                                name: 'Horoscopo',
                                _id: '/horoscopo/escorpio'
                            },
                            tags: []
                        }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                description: 'Bajada test',
                articleBody:
                    'Primer parrafo. Primer bullet Segundo bullet Segundo parrafo.'
            });
            expect(jsonData.hasPart).toBeUndefined();
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
                        '@type': 'Review',
                        '@id': 'https://www.lanacion.com.ar/espectaculos/cine/test-review/#review',
                        publisher: {
                            '@id': 'https://www.lanacion.com.ar/#organization'
                        },
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
