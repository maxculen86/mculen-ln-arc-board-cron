import React from 'react';
import { render } from '@testing-library/react';
import SnippetNoticia from '../../../../../../components/private/LN/nota/snippet/noticia';
import { useContent } from 'fusion:content';

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
const mockAuthorWithProfile = {
    _id: 'gaston-roitberg-35',
    name: 'Gaston Roitberg',
    type: 'author',
    url: '/autor/gaston-roitberg-35/',
    image: {
        url: 'https://author-service-images.example.com/gaston.png'
    },
    additional_properties: {
        original: {
            bio_page: '/autor/gaston-roitberg-35/',
            byline: 'Gaston Roitberg',
            longBio: 'Bio completa del autor',
            expertise: 'Digital, medios, periodismo',
            affiliations: 'FOPEA',
            languages: 'Espanol, Ingles',
            twitter: '@grmadryn'
        }
    }
};
const mockAuthorWithPartialProfile = {
    _id: 'luciano-roman-10462',
    name: 'Luciano Roman',
    type: 'author',
    url: '/autor/luciano-roman-10462/',
    image: {
        url: 'https://author-service-images.example.com/luciano.png'
    },
    additional_properties: {
        original: {
            bio_page: '/autor/luciano-roman-10462/',
            byline: 'Luciano Roman',
            longBio: ''
        }
    }
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

        it('should render enriched author data for NewsArticle schema', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        credits: { by: [mockAuthorWithProfile] }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                '@type': 'NewsArticle',
                author: [
                    {
                        '@type': 'Person',
                        name: 'Gaston Roitberg',
                        url: 'https://www.lanacion.com.ar/autor/gaston-roitberg-35/',
                        image: {
                            '@type': 'ImageObject',
                            url: 'https://author-service-images.example.com/gaston.png'
                        },
                        description: 'Bio completa del autor',
                        knowsAbout: ['Digital, medios, periodismo'],
                        affiliation: [
                            {
                                '@type': 'Organization',
                                name: 'FOPEA'
                            }
                        ],
                        knowsLanguage: ['Espanol', 'Ingles'],
                        sameAs: ['https://twitter.com/grmadryn/']
                    }
                ],
                creator: ['Gaston Roitberg']
            });
        });

        it('should render multiple authors for NewsArticle schema', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        credits: {
                            by: [
                                mockAuthorWithProfile,
                                mockAuthorWithPartialProfile
                            ]
                        }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData.author).toHaveLength(2);
            expect(jsonData.author).toMatchObject([
                {
                    '@type': 'Person',
                    name: 'Gaston Roitberg',
                    description: 'Bio completa del autor',
                    knowsAbout: ['Digital, medios, periodismo'],
                    sameAs: ['https://twitter.com/grmadryn/']
                },
                {
                    '@type': 'Person',
                    name: 'Luciano Roman',
                    url: 'https://www.lanacion.com.ar/autor/luciano-roman-10462/',
                    image: {
                        '@type': 'ImageObject',
                        url: 'https://author-service-images.example.com/luciano.png'
                    }
                }
            ]);
            expect(jsonData.creator).toEqual([
                'Gaston Roitberg',
                'Luciano Roman'
            ]);
            expect(jsonData.author[1].description).toBeUndefined();
            expect(jsonData.author[1].knowsAbout).toBeUndefined();
        });

        it('should keep basic author data for non NewsArticle or OpinionNewsArticle schemas', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        credits: { by: [mockAuthorWithProfile] },
                        label: { trust: { text: 'Análisis' } }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                '@type': 'AnalysisNewsArticle',
                author: [
                    {
                        '@type': 'Person',
                        name: 'Gaston Roitberg',
                        url: 'https://www.lanacion.com.ar/autor/gaston-roitberg-35/'
                    }
                ],
                creator: ['Gaston Roitberg']
            });
            expect(jsonData.author[0].knowsAbout).toBeUndefined();
            expect(jsonData.author[0].affiliation).toBeUndefined();
            expect(jsonData.author[0].knowsLanguage).toBeUndefined();
            expect(jsonData.author[0].sameAs).toBeUndefined();
        });

        it('should include contentLocation built from K&L Location label', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockGlobalContent,
                        label: {
                            ...mockGlobalContent.label,
                            location: { text: 'US | Michigan' }
                        }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData.contentLocation).toEqual({
                '@type': 'Place',
                name: 'Michigan',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Michigan',
                    addressCountry: 'US'
                }
            });
        });

        it('should omit contentLocation from the schema when K&L Location is missing', () => {
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

            expect(jsonData.contentLocation).toBeUndefined();
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

        it('should render enriched author data for OpinionNewsArticle schema', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...mockOpinionContent,
                        credits: { by: [mockAuthorWithProfile] }
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('script').innerHTML
            );

            expect(jsonData).toMatchObject({
                '@type': 'OpinionNewsArticle',
                author: [
                    {
                        '@type': 'Person',
                        name: 'Gaston Roitberg',
                        description: 'Bio completa del autor',
                        knowsAbout: ['Digital, medios, periodismo'],
                        affiliation: [
                            {
                                '@type': 'Organization',
                                name: 'FOPEA'
                            }
                        ],
                        knowsLanguage: ['Espanol', 'Ingles'],
                        sameAs: ['https://twitter.com/grmadryn/']
                    }
                ],
                creator: ['Gaston Roitberg']
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
                        itemReviewed: {
                            '@type': 'Movie',
                            name: 'Test title'
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
                canonical_url: '/espectaculos/cine/test-review',
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

        it('should NOT render Schema_Review for non-eligible review urls', () => {
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

            expect(container.querySelector('#Schema_Review')).toBeNull();
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

    describe('acuOgImg - primaryImageOfPage in final JSON-LD', () => {
        const mockAcuOgImg = {
            url: 'https://www.lanacion.com.ar/custom-og.jpg',
            height: '630',
            width: '1200',
            additional_properties: { mime_type: 'image/jpeg' }
        };

        const globalContentWithAcuOgImg = {
            ...mockGlobalContent,
            promo_items: {
                basic: {
                    type: 'image',
                    url: 'https://sandbox-resizer.glanacion.com/promo-img.jpg',
                    caption: 'Promo caption'
                }
            },
            acumuladoColor: { id_logo_compartir: 'logo-id-123' }
        };

        beforeEach(() => {
            useContent.mockReturnValueOnce(mockAcuOgImg);
        });

        afterEach(() => {
            useContent.mockReset();
        });

        it('uses acuOgImg URL in primaryImageOfPage for NewsArticle', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={globalContentWithAcuOgImg}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const jsonData = JSON.parse(
                container.querySelector('#Schema_NewsArticle').innerHTML
            );

            expect(jsonData['@type']).toBe('NewsArticle');
            expect(jsonData.mainEntityOfPage.primaryImageOfPage).toMatchObject({
                '@type': 'ImageObject',
                url: 'https://www.lanacion.com.ar/custom-og.jpg',
                width: 1200,
                height: 630
            });
        });

        it('uses acuOgImg URL in primaryImageOfPage for OpinionNewsArticle', () => {
            const { container } = render(
                <SnippetNoticia
                    siteProperties={mockSiteProperties}
                    globalContent={{
                        ...globalContentWithAcuOgImg,
                        subtype: '3'
                    }}
                    contextPath={mockContextPath}
                    deployment={mockDeployment}
                />
            );

            const script = container.querySelector('script');
            const jsonData = JSON.parse(script.innerHTML);

            expect(jsonData['@type']).toBe('OpinionNewsArticle');
            expect(jsonData.mainEntityOfPage.primaryImageOfPage).toMatchObject({
                '@type': 'ImageObject',
                url: 'https://www.lanacion.com.ar/custom-og.jpg',
                width: 1200,
                height: 630
            });
        });
    });
});
