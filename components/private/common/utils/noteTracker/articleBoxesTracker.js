import { checkUserRealoadAction } from './ctrTracker';
import { eventListenerAttacher } from '../linksTracker';

const articleBoxesTracker = ({ boxType, diagramation }) => {
    const { dataLayer } = window;
    const refresh = checkUserRealoadAction(window);

    const articlesToTrack = boxArticleEventBuilder[boxType]({
        grid: diagramation
    });
    if (!refresh) {
        const callback = entries => {
            entries.forEach(article => {
                if (article.isIntersecting) {
                    const { target } = article;

                    const {
                        ctr_brand: ctrBrand,
                        ctr_position: ctrPosition
                    } = target;

                    dataLayer.push({
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

const addPositionInBox = (elem, brand, elemPosition, indexElem) => {
    const index = indexElem + 1;
    const position = index <= 9 ? `0${index}` : index;

    if (elem) {
        return Object.assign(elem, {
            ctr_brand: brand,
            ctr_position: `${elemPosition}${position}`
        });
    }
    return true;
};

const boxArticleEventBuilder = {
    masNotas: ({ grid }) => {
        if (grid === 3) {
            const boxArticlesThree = document.querySelectorAll(
                '[data-block-name="n_otras_noticias"] div article'
            );

            boxArticlesThree.forEach((boxArt3, i) => {
                addPositionInBox(boxArt3, 'otrasNoticias_diag3', '0600', i);
            });

            return boxArticlesThree;
        }
        const boxArticlesNine = document.querySelectorAll(
            '[data-block-name="n_ultimas_noticias"] div article'
        );

        boxArticlesNine.forEach((boxArt9, i) => {
            addPositionInBox(boxArt9, 'ultimasNoticias_diag9', '1000', i);
        });

        return boxArticlesNine;
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
    tePuedeInteresar: () => {
        const itMayInterestArticles = document.querySelectorAll(
            '[data-block-name="n_te_puede_interesar"] div article'
        );

        itMayInterestArticles.forEach((interestArt, i) => {
            addPositionInBox(interestArt, 'puedeInteresar_diag15', '1011', i);
        });

        return itMayInterestArticles;
    }
};

export default articleBoxesTracker;
