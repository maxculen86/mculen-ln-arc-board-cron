import { checkUserRealoadAction } from './ctrTracker';
import { addEventToDataLayerV2 } from '../../../LN/common/utils/addEventToDataLayer';
import get from '../get';

const getArticleId = elem =>
    get(elem, 'dataset.id') ||
    get(elem, 'dataset.notaid') ||
    elem?.getAttribute?.('data-id');

const getComboIds = articles =>
    articles.map(getArticleId).filter(Boolean).join(', ');

const getComboPositions = articles =>
    articles
        .map(article => get(article, 'ctr_position'))
        .filter(Boolean)
        .join(',');

const addPositionInBox = (elem, brand, elemPosition, indexElem) => {
    const index = indexElem + 1;
    const position = index <= 9 ? `0${index}` : index;

    if (elem) {
        return Object.assign(elem, {
            ctr_brand: brand,
            ctr_position: `${elemPosition}${position}`
        });
    }
    return null;
};

const boxArticleEventBuilder = {
    masNotas: ({ grid = 9, sectionTitle, isAperturaHome }) => {
        if (grid === 3 && sectionTitle === 'OtrasNoticias') {
            const boxArticlesOtherNews = document.querySelectorAll(
                '[data-block-name="n_otras_noticias"] div article'
            );

            boxArticlesOtherNews.forEach((boxArt3, i) => {
                addPositionInBox(boxArt3, 'otrasNoticias', '0600', i);
            });

            return boxArticlesOtherNews;
        }

        const boxArticlesLastNews = document.querySelectorAll(
            '[data-block-name="n_ultimas_noticias"] div article'
        );

        boxArticlesLastNews.forEach((boxArt, i) => {
            addPositionInBox(
                boxArt,
                isAperturaHome ? 'aperturaHome' : 'ultimasNoticias',
                '1000',
                i
            );
        });

        return boxArticlesLastNews;
    },
    seguirLeyendo: () => {
        const keepReadingArticles = document.querySelectorAll(
            '[data-block-name="n_segui_leyendo"] div article'
        );

        keepReadingArticles.forEach((keepReadArt, i) => {
            addPositionInBox(keepReadArt, 'seguiLeyendo', '0601', i);
        });

        return keepReadingArticles;
    },
    ranking: () => {
        const rankingArticles = document.querySelectorAll(
            '[data-article-box="Ranking"]'
        );

        rankingArticles.forEach((rankArt, i) => {
            addPositionInBox(rankArt, 'ranking', '0700', i);
        });

        return rankingArticles;
    },
    tePuedeInteresar: ({ articles }) =>
        articles.map((article, index) =>
            addPositionInBox(article, 'cajaTePuedeinteresar', '1011', index)
        )
};

const getArticleRowTop = article => {
    const top = get(article?.getBoundingClientRect?.(), 'top');
    return Number.isFinite(top) ? top : article?.offsetTop || 0;
};

const getRowGroups = articles =>
    articles
        .reduce((groups, article) => {
            const rowTop = getArticleRowTop(article);
            const lastGroup = groups[groups.length - 1];

            if (!lastGroup || Math.abs(rowTop - lastGroup.rowTop) > 2) {
                return [...groups, { rowTop, articles: [article] }];
            }

            lastGroup.articles.push(article);
            return groups;
        }, [])
        .map(group => group.articles);

const getRowGroupForArticle = (articles, target) =>
    getRowGroups(articles).find(group => group.includes(target)) || [target];

const addClickEvent = element => {
    const sendClickEvent = () => {
        addEventToDataLayerV2({
            event: 'clicknota',
            articleId: getArticleId(element),
            ctr_brand: element.ctr_brand,
            ctr_position: element.ctr_position
        });
    };

    element.addEventListener('click', sendClickEvent);
    element.addEventListener('auxclick', sendClickEvent);
};

const addImpressionEvent = articles => {
    const comboNotas = getComboIds(articles);

    addEventToDataLayerV2({
        event: 'impressioncajanota',
        ctr_brand: get(articles, '[0].ctr_brand'),
        ctr_position: getComboPositions(articles),
        rest: {
            ...(comboNotas && { combo_notas: comboNotas })
        }
    });
};

export const articleBoxesTracker = ({
    boxType,
    diagramation,
    sectionTitle,
    articles = [],
    isAperturaHome = false
}) => {
    const refresh = checkUserRealoadAction(window);

    const articlesToTrack = [
        ...(boxArticleEventBuilder[boxType]?.({
            grid: diagramation,
            sectionTitle,
            articles,
            isAperturaHome
        }) || [])
    ].filter(Boolean);

    if (!refresh) {
        const sentArticles = new Set();
        let observer;

        const callback = entries => {
            entries.forEach(article => {
                if (article.isIntersecting) {
                    const { target } = article;

                    if (sentArticles.has(target)) return;

                    const group = getRowGroupForArticle(
                        articlesToTrack,
                        target
                    ).filter(groupArticle => !sentArticles.has(groupArticle));

                    if (!group.length) return;

                    addImpressionEvent(group);

                    group.forEach(groupArticle => {
                        sentArticles.add(groupArticle);
                        observer.unobserve(groupArticle);
                    });
                }
            });
        };

        observer = new IntersectionObserver(callback);

        articlesToTrack.forEach(art => {
            addClickEvent(art);
            observer.observe(art);
        });
    }
};
