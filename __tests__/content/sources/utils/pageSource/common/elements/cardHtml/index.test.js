import 'regenerator-runtime/runtime';
import { transformHtmlCardsByLayout } from '../../../../../../../../content/sources/utils/pageSource/common/elements/cardHtml/index';

const CARD_HTML_FEATURE = 'LN-10/CardHtml';
const ANEXO_ALIAS = 'ln-common/anexo';
const ANEXO_FEATURE = 'LN-common/anexo';
const ANEXO_LAYOUT = 'grilla1';

const parentConfigurations = { arcSite: 'la-nacion-ar' };
const parentSectionWeb = 'Apertura';

const buildCardHtmlBox = ({
    id,
    html,
    originPosition = null,
    information = {},
    configurations = parentConfigurations,
    sectionWeb = parentSectionWeb
}) => ({
    type: 2,
    sectionAliasMobile: ANEXO_ALIAS,
    information: {
        ...information,
        hideCaja: false,
        layout: information.layout || ANEXO_LAYOUT,
        nameFeature: ANEXO_FEATURE,
        idRender: id || information.idRender
    },
    articles: [
        {
            html,
            additionalProperties: {
                originPosition,
                nameFeature: null,
                idRender: null
            }
        }
    ],
    configurations,
    sectionWeb
});

const buildParentElement = (articles, overrides = {}) => ({
    type: 0,
    sectionAliasMobile: 'apertura',
    information: {},
    articles,
    configurations: parentConfigurations,
    sectionWeb: parentSectionWeb,
    ...overrides
});

const buildRegularArticle = id => ({
    _id: id,
    type: 'LN-10/article'
});

const buildCardHtmlArticle = ({
    id = 'card-html-1',
    html = '<div>card html</div>',
    identifier = 'type'
}) => {
    const article = {
        id,
        html,
        additionalProperties: {
            idRender: id,
            originPosition: 2
        }
    };

    if (identifier === 'type') {
        article.type = CARD_HTML_FEATURE;
    } else if (identifier === 'additionalProperties') {
        article.additionalProperties.nameFeature = CARD_HTML_FEATURE;
    } else if (identifier === 'information') {
        article.information = { nameFeature: CARD_HTML_FEATURE };
    }

    return article;
};

describe('cardHtml - transformHtmlCardsByLayout', () => {
    const transformCardHtmlFeatures =
        transformHtmlCardsByLayout['LN10-Home_Main'];

    it('exposes transformCardHtmlFeatures for LN10-Home_Main layout', () => {
        expect(transformCardHtmlFeatures).toEqual(expect.any(Function));
    });

    it('returns input when elementsPage is not an array', () => {
        expect(transformCardHtmlFeatures(null)).toBeNull();
        expect(transformCardHtmlFeatures(undefined)).toBeUndefined();
        expect(transformCardHtmlFeatures('invalid')).toBe('invalid');
    });

    it('returns empty array when elementsPage is empty', () => {
        expect(transformCardHtmlFeatures([])).toEqual([]);
    });

    it('keeps elements without CardHtml articles unchanged', () => {
        const elements = [
            buildParentElement([
                buildRegularArticle('article-1'),
                buildRegularArticle('article-2'),
                buildRegularArticle('article-3'),
                buildRegularArticle('article-4')
            ])
        ];

        expect(transformCardHtmlFeatures(elements)).toEqual(elements);
    });

    it('keeps elements without articles array unchanged', () => {
        const element = {
            type: 0,
            sectionAliasMobile: 'envivo',
            configurations: parentConfigurations,
            sectionWeb: parentSectionWeb
        };

        expect(transformCardHtmlFeatures([element])).toEqual([element]);
    });

    it('transforms standalone type 13 element into CardHtml box', () => {
        const element = {
            type: 13,
            id: 'standalone-card',
            html: '<section>standalone</section>',
            configurations: parentConfigurations,
            sectionWeb: parentSectionWeb
        };

        const [result] = transformCardHtmlFeatures([element]);

        expect(result).toEqual(
            buildCardHtmlBox({
                id: 'standalone-card',
                html: '<section>standalone</section>'
            })
        );
    });

    it('extracts CardHtml article identified by type and keeps remaining articles', () => {
        const cardArticle = buildCardHtmlArticle({
            id: 'card-by-type',
            html: '<div>by type</div>'
        });
        const regularArticle = buildRegularArticle('regular-article');
        const parentElement = buildParentElement([regularArticle, cardArticle]);

        const [updatedParent, cardBox] = transformCardHtmlFeatures([
            parentElement
        ]);

        expect(updatedParent).toEqual({
            ...parentElement,
            articles: [regularArticle]
        });
        expect(cardBox).toEqual(
            buildCardHtmlBox({
                id: 'card-by-type',
                html: '<div>by type</div>',
                originPosition: 2
            })
        );
    });

    it('extracts CardHtml article identified by additionalProperties.nameFeature', () => {
        const cardArticle = buildCardHtmlArticle({
            id: 'card-by-additional',
            html: '<div>by additional</div>',
            identifier: 'additionalProperties'
        });
        const parentElement = buildParentElement([cardArticle]);

        const [, cardBox] = transformCardHtmlFeatures([parentElement]);

        expect(cardBox).toEqual(
            buildCardHtmlBox({
                id: 'card-by-additional',
                html: '<div>by additional</div>',
                originPosition: 2
            })
        );
    });

    it('extracts CardHtml article identified by information.nameFeature', () => {
        const cardArticle = buildCardHtmlArticle({
            id: 'card-by-information',
            html: '<div>by information</div>',
            identifier: 'information'
        });
        const parentElement = buildParentElement([cardArticle]);

        const [, cardBox] = transformCardHtmlFeatures([parentElement]);

        expect(cardBox).toEqual(
            buildCardHtmlBox({
                id: 'card-by-information',
                html: '<div>by information</div>',
                originPosition: 2
            })
        );
    });

    it('creates one box per CardHtml article preserving parent order', () => {
        const firstCard = buildCardHtmlArticle({
            id: 'card-1',
            html: '<div>first</div>'
        });
        const secondCard = buildCardHtmlArticle({
            id: 'card-2',
            html: '<div>second</div>',
            identifier: 'additionalProperties'
        });
        const regularArticle = buildRegularArticle('regular-article');
        const parentElement = buildParentElement([
            firstCard,
            regularArticle,
            secondCard
        ]);

        const [updatedParent, firstBox, secondBox] = transformCardHtmlFeatures([
            parentElement
        ]);

        expect(updatedParent.articles).toEqual([regularArticle]);
        expect(firstBox).toEqual(
            buildCardHtmlBox({
                id: 'card-1',
                html: '<div>first</div>',
                originPosition: 2
            })
        );
        expect(secondBox).toEqual(
            buildCardHtmlBox({
                id: 'card-2',
                html: '<div>second</div>',
                originPosition: 2
            })
        );
    });

    it('uses article.additionalProperties.idRender when article.id is missing', () => {
        const cardArticle = buildCardHtmlArticle({
            id: 'render-id-only',
            html: '<div>render id</div>'
        });
        delete cardArticle.id;

        const parentElement = buildParentElement([cardArticle]);
        const [, cardBox] = transformCardHtmlFeatures([parentElement]);

        expect(cardBox.information.idRender).toBe('render-id-only');
    });

    it('uses custom layout from information when provided in type 13 element', () => {
        const element = {
            type: 13,
            id: 'custom-layout-card',
            html: '<section>custom layout</section>',
            information: { layout: 'custom-grid' },
            configurations: parentConfigurations,
            sectionWeb: parentSectionWeb
        };

        const [result] = transformCardHtmlFeatures([element]);

        expect(result.information.layout).toBe('custom-grid');
    });

    it('adds height-mobile to div when missing using heightMobile', () => {
        const element = {
            type: 13,
            id: 'f0fgfxoY5jjn7Ek',
            html: '<div height="690"><ln-mundial-2026-predictivo-versus></ln-mundial-2026-predictivo-versus></div>',
            heightDesktop: 690,
            heightTablet: 688,
            heightMobile: 690,
            configurations: parentConfigurations,
            sectionWeb: 'Breaking_1'
        };

        const [result] = transformCardHtmlFeatures([element]);

        expect(result.articles[0].html).toContain('height-mobile="690"');
    });

    it('falls back to heightTablet when heightMobile is missing', () => {
        const element = {
            type: 13,
            id: 'card-fallback-tablet',
            html: '<div height="690"><content></content></div>',
            heightDesktop: 690,
            heightTablet: 688,
            configurations: parentConfigurations,
            sectionWeb: parentSectionWeb
        };

        const [result] = transformCardHtmlFeatures([element]);

        expect(result.articles[0].html).toContain('height-mobile="688"');
    });

    it('falls back to heightDesktop when heightMobile and heightTablet are missing', () => {
        const element = {
            type: 13,
            id: 'card-fallback-desktop',
            html: '<div height="690"><content></content></div>',
            heightDesktop: 690,
            configurations: parentConfigurations,
            sectionWeb: parentSectionWeb
        };

        const [result] = transformCardHtmlFeatures([element]);

        expect(result.articles[0].html).toContain('height-mobile="690"');
    });

    it('keeps existing height-mobile attribute unchanged', () => {
        const element = {
            type: 13,
            id: 'f0fgfxoY5jjn7Ek',
            html: '<div height="690" height-mobile="660"><ln-mundial-2026-predictivo-versus></ln-mundial-2026-predictivo-versus></div>',
            heightDesktop: 690,
            heightTablet: 688,
            heightMobile: 690,
            configurations: parentConfigurations,
            sectionWeb: 'Breaking_1'
        };

        const [result] = transformCardHtmlFeatures([element]);

        expect(result.articles[0].html).toContain('height-mobile="660"');
        expect(result.articles[0].html).not.toContain('height-mobile="690"');
    });

    it('adds height-mobile to embedded CardHtml article when missing', () => {
        const cardArticle = {
            type: CARD_HTML_FEATURE,
            id: 'embedded-card',
            html: '<div height="500"><content></content></div>',
            heightDesktop: 500,
            heightTablet: 480,
            heightMobile: 460,
            additionalProperties: { idRender: 'embedded-card' }
        };
        const parentElement = buildParentElement([cardArticle]);

        const [, cardBox] = transformCardHtmlFeatures([parentElement]);

        expect(cardBox.articles[0].html).toContain('height-mobile="460"');
    });
});
