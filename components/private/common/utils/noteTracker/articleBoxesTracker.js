import { checkUserRealoadAction } from './ctrTracker';
import { eventListenerAttacher } from '../linksTracker';
import { addEventToDataLayerV2 } from '../../../LN/common/utils/addEventToDataLayer';

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
    masNotas: ({ grid = 9, sectionTitle }) => {
        if (grid === 3 && sectionTitle === 'OtrasNoticias') {
            const boxArticlesOtherNews = document.querySelectorAll(
                '[data-block-name="n_otras_noticias"] div article'
            );

            boxArticlesOtherNews.forEach((boxArt3, i) => {
                addPositionInBox(boxArt3, 'otrasNoticias_diag3', '0600', i);
            });

            return boxArticlesOtherNews;
        }

        const boxArticlesLastNews = document.querySelectorAll(
            '[data-block-name="n_ultimas_noticias"] div article'
        );

        boxArticlesLastNews.forEach((boxArt, i) => {
            addPositionInBox(boxArt, `ultimasNoticias_diag${grid}`, '1000', i);
        });

        return boxArticlesLastNews;
    },
    seguirLeyendo: () => {
        const keepReadingArticles = document.querySelectorAll(
            '[data-block-name="h_SeguiLeyendotema-toi"] div article'
        );

        keepReadingArticles.forEach((keepReadArt, i) => {
            addPositionInBox(keepReadArt, 'seguiLeyendo_diag3', '0601', i);
        });

        return keepReadingArticles;
    },
    ranking: () => {
        const rankingArticles = document.querySelectorAll(
            '[data-block-name="n_ranking"] div article'
        );

        rankingArticles.forEach((rankArt, i) => {
            addPositionInBox(rankArt, 'ranking_diag4', '0700', i);
        });

        return rankingArticles;
    },
    tePuedeInteresar: ({ articles }) =>
        articles.map((article, index) =>
            addPositionInBox(article, 'puedeInteresar_diag15', '1011', index)
        )
};

export const articleBoxesTracker = ({
    boxType,
    diagramation,
    sectionTitle,
    articles = []
}) => {
    const { dataLayer } = window;

    const refresh = checkUserRealoadAction(window);

    const articlesToTrack =
        boxArticleEventBuilder[boxType]({
            grid: diagramation,
            sectionTitle,
            articles
        }) || [];

    if (!refresh) {
        const callback = entries => {
            entries.forEach(article => {
                if (article.isIntersecting) {
                    const { target } = article;

                    const { ctr_brand: ctrBrand, ctr_position: ctrPosition } =
                        target;

                    addEventToDataLayerV2({
                        event: 'impressionNota',
                        ctr_brand: ctrBrand,
                        ctr_position: ctrPosition
                    });

                    observer.unobserve(target);
                }
            });
        };

        const observer = new IntersectionObserver(callback);

        articlesToTrack.forEach(art => {
            eventListenerAttacher(art, dataLayer);
            observer.observe(art);
        });
    }
};
