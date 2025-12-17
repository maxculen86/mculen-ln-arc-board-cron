import get from '../../../../../../common/utils/get';
import { orderArticles } from '../../utils/helpers';

const videoPlayerDiagramations = ['bn_player_3_grid', 'bn_player_4_grid', 'left-focal-video-vertical'];
const articlesMap = (articles, informationBox, articleFn, paramsFromPage) => {
    const { sectionWeb } = informationBox;

    return articles.reduce((result, f, index) => {
        if (f) {
            try {
                const article = articleFn({
                    ...f,
                    index,
                    informationBox,
                    storyType: 'home'
                });
                result.push(article);
            } catch (error) {
                const websiteUrl = get(paramsFromPage, 'rootPath', '');
                if (get(error, 'name', null) === 'ErrorIdArticle') {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `sectionWeb:${sectionWeb || ''} - ${get(
                            error,
                            'message',
                            ''
                        )} `,
                        {
                            error,
                            outputType: 'json',
                            websiteUrl
                        }
                    );
                } else {
                    // eslint-disable-next-line no-console
                    console.error(error.message, {
                        error,
                        outputType: 'json',
                        websiteUrl
                    });
                }
            }
        }
        return result;
    }, []);
};

export const storyBox = (element, featureInfo, articleFn, paramsFromPage) => {
    const { information, sectionAliasMobile, sectionWeb } = element;
    const informationBox = {
        sectionAliasMobile,
        sectionWeb,
        ...information
    };

    const articles = get(element, 'articles', []);

    let video = null;

    if (videoPlayerDiagramations.includes(featureInfo?.diagramacion)) {
        video = get(element, 'video', []);
    }

    const ordererArticles = orderArticles(articles, information.layout);

    const resultArticles = articlesMap(
        ordererArticles,
        informationBox,
        articleFn,
        paramsFromPage
    );

    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            notas: resultArticles,
            video
        };
    }
    return null;
};

export default storyBox;
