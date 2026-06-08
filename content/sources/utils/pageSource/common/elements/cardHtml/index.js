import { parse } from 'node-html-parser';

const CARD_HTML_FEATURE = 'LN-10/CardHtml';
const ANEXO_ALIAS = 'ln-common/anexo';
const ANEXO_FEATURE = 'LN-common/anexo';
const ANEXO_LAYOUT = 'grilla1';

const resolveHeightMobile = ({ heightMobile, heightTablet, heightDesktop }) =>
    heightMobile ?? heightTablet ?? heightDesktop ?? null;

const ensureHeightMobileInHtml = (html, heights = {}) => {
    if (!html) return html;

    const heightValue = resolveHeightMobile(heights);
    if (!heightValue) return html;

    const root = parse(html);
    const target = root.querySelector('iframe') || root.querySelector('div');

    if (!target || target.getAttribute('height-mobile')) return html;

    target.setAttribute('height-mobile', String(heightValue));

    return root.toString();
};

const isCardHtmlArticle = article =>
    article?.type === CARD_HTML_FEATURE ||
    article?.additionalProperties?.nameFeature === CARD_HTML_FEATURE ||
    article?.information?.nameFeature === CARD_HTML_FEATURE;

const createCardHtmlBox = ({
    id,
    html,
    information = {},
    configurations = {},
    sectionWeb,
    additionalProperties = {},
    heightDesktop,
    heightTablet,
    heightMobile
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
            html: ensureHeightMobileInHtml(html, {
                heightMobile,
                heightTablet,
                heightDesktop
            }),
            additionalProperties: {
                originPosition: additionalProperties.originPosition ?? null,
                nameFeature: null,
                idRender: null
            }
        }
    ],
    configurations,
    sectionWeb
});

const createCardHtmlBoxFromArticle = (article, parentElement) =>
    createCardHtmlBox({
        id: article.id || article.additionalProperties?.idRender,
        html: article.html,
        additionalProperties: article.additionalProperties,
        configurations: parentElement.configurations,
        sectionWeb: parentElement.sectionWeb,
        heightDesktop: article.heightDesktop,
        heightTablet: article.heightTablet,
        heightMobile: article.heightMobile
    });

const transformCardHtmlFeatures = elementsPage => {
    if (!Array.isArray(elementsPage)) return elementsPage;
    return elementsPage.flatMap(element => {
        if (element?.type === 13) {
            return [createCardHtmlBox(element)];
        }

        if (Array.isArray(element.articles)) {
            const cardHtmlArticles = element.articles.filter(isCardHtmlArticle);

            if (cardHtmlArticles.length === 0) {
                return [element];
            }

            const remainingArticles = element.articles.filter(
                article => !isCardHtmlArticle(article)
            );

            const cardHtmlBoxes = cardHtmlArticles.map(article =>
                createCardHtmlBoxFromArticle(article, element)
            );
            return [
                { ...element, articles: remainingArticles },
                ...cardHtmlBoxes
            ];
        }

        return [element];
    });
};

export const transformHtmlCardsByLayout = {
    'LN10-Home_Main': transformCardHtmlFeatures
};
