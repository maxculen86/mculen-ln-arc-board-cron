jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock('../../../../components/private/common/utils/tags', () => ({
    getOrderAndCountTags: jest.fn()
}));

jest.mock(
    '../../../../components/private/common/snippet/snippetRender',
    () =>
        function SnippetRender({ data }) {
            return (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            );
        }
);

import React from 'react';
import { render } from '@testing-library/react';
import CollectionPageSchema from '../../../../components/private/LN/common/collectionPageSchema';
import { getOrderAndCountTags } from '../../../../components/private/common/utils/tags';

const SITE = 'https://www.lanacion.com.ar';

const mockArticles = [
    {
        canonical_url: '/seccion/nota-1-123/',
        headlines: { basic: 'Título noticia 1' }
    },
    {
        canonical_url: '/seccion/nota-2-456/',
        headlines: { basic: 'Título noticia 2' }
    }
];

const mockTags = [
    { text: 'política' },
    { text: 'economía' },
    { text: 'sociedad' }
];

const defaultProps = {
    articlesList: mockArticles,
    acuName: 'Política',
    requestUri: '/politica/?page=2'
};

function getSchema(container) {
    const script = container.querySelector(
        'script[type="application/ld+json"]'
    );
    return JSON.parse(script.innerHTML);
}

beforeEach(() => {
    getOrderAndCountTags.mockReturnValue(mockTags);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('CollectionPageSchema', () => {
    it('renders a script tag with type application/ld+json', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        expect(
            container.querySelector('script[type="application/ld+json"]')
        ).toBeInTheDocument();
    });

    it('sets @context and @type correctly', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        const schema = getSchema(container);
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('CollectionPage');
    });

    it('strips query string from requestUri for @id and url', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        const schema = getSchema(container);
        expect(schema['@id']).toBe(`${SITE}/politica/#collectionpage`);
        expect(schema.url).toBe(`${SITE}/politica/`);
    });

    it('sets name from acuName', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        expect(getSchema(container).name).toBe('Política');
    });

    it('builds description with acuName and tags joined by comma', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        expect(getSchema(container).description).toBe(
            'Últimas noticias de Política, política, economía, sociedad'
        );
    });

    it('sets copyrightYear to the current year', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        expect(getSchema(container).copyrightYear).toBe(
            new Date().getFullYear()
        );
    });

    it('sets inLanguage to es-AR', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        expect(getSchema(container).inLanguage).toBe('es-AR');
    });

    it('sets isPartOf, publisher, copyrightHolder and sourceOrganization to the org @id', () => {
        const { container } = render(
            <CollectionPageSchema {...defaultProps} />
        );
        const schema = getSchema(container);
        const orgId = { '@id': `${SITE}/#organization` };
        expect(schema.isPartOf).toEqual({ '@id': `${SITE}/#website` });
        expect(schema.publisher).toEqual(orgId);
        expect(schema.copyrightHolder).toEqual(orgId);
        expect(schema.sourceOrganization).toEqual(orgId);
    });

    describe('mainEntity', () => {
        it('has correct @type, @id, name and itemListOrder', () => {
            const { container } = render(
                <CollectionPageSchema {...defaultProps} />
            );
            const { mainEntity } = getSchema(container);
            expect(mainEntity['@type']).toBe('ItemList');
            expect(mainEntity['@id']).toBe(`${SITE}/politica/#itemlist`);
            expect(mainEntity.name).toBe('Últimas noticias de Política');
            expect(mainEntity.itemListOrder).toBe(
                'https://schema.org/ItemListOrderDescending'
            );
        });

        it('sets numberOfItems to articlesList length', () => {
            const { container } = render(
                <CollectionPageSchema {...defaultProps} />
            );
            expect(getSchema(container).mainEntity.numberOfItems).toBe(
                mockArticles.length
            );
        });

        it('maps each article to a ListItem with 1-based position', () => {
            const { container } = render(
                <CollectionPageSchema {...defaultProps} />
            );
            const { itemListElement } = getSchema(container).mainEntity;
            expect(itemListElement).toHaveLength(2);
            expect(itemListElement[0].position).toBe(1);
            expect(itemListElement[1].position).toBe(2);
        });

        it('sets headline from headlines.basic', () => {
            const { container } = render(
                <CollectionPageSchema {...defaultProps} />
            );
            const { itemListElement } = getSchema(container).mainEntity;
            expect(itemListElement[0].item.headline).toBe('Título noticia 1');
            expect(itemListElement[1].item.headline).toBe('Título noticia 2');
        });

        it('builds url from SITE_LANACION + canonical_url', () => {
            const { container } = render(
                <CollectionPageSchema {...defaultProps} />
            );
            const { itemListElement } = getSchema(container).mainEntity;
            expect(itemListElement[0].item.url).toBe(
                `${SITE}/seccion/nota-1-123/`
            );
            expect(itemListElement[1].item.url).toBe(
                `${SITE}/seccion/nota-2-456/`
            );
        });

        it('sets @type NewsArticle on each item', () => {
            const { container } = render(
                <CollectionPageSchema {...defaultProps} />
            );
            const { itemListElement } = getSchema(container).mainEntity;
            itemListElement.forEach(entry => {
                expect(entry['@type']).toBe('ListItem');
                expect(entry.item['@type']).toBe('NewsArticle');
            });
        });
    });

    describe('edge cases', () => {
        it('renders with empty articlesList', () => {
            getOrderAndCountTags.mockReturnValue([]);
            const { container } = render(
                <CollectionPageSchema
                    articlesList={[]}
                    acuName="Política"
                    requestUri="/politica/"
                />
            );
            const schema = getSchema(container);
            expect(schema.mainEntity.numberOfItems).toBe(0);
            expect(schema.mainEntity.itemListElement).toHaveLength(0);
            expect(schema.description).toBe('Últimas noticias de Política');
        });

        it('handles missing headlines gracefully', () => {
            const articles = [
                { canonical_url: '/seccion/nota-1/', headlines: {} }
            ];
            getOrderAndCountTags.mockReturnValue([]);
            const { container } = render(
                <CollectionPageSchema
                    articlesList={articles}
                    acuName="Test"
                    requestUri="/test/"
                />
            );
            const { itemListElement } = getSchema(container).mainEntity;
            expect(itemListElement[0].item.headline).toBeUndefined();
        });
    });
});
