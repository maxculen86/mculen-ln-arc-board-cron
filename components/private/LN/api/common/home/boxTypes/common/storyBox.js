import get from '../../../../../../common/utils/get';
import { orderArticles } from '../../utils/helpers';

const articlesMap = (articles, informationBox, articleFn, paramsFromPage) => {
    const { sectionAliasMobile } = informationBox;

    return articles.reduce((result, f) => {
        if (f) {
            try {
                const article = articleFn({
                    ...f,
                    informationBox,
                    storyType: 'home'
                });
                result.push(article);
            } catch (error) {
                const websiteUrl = get(paramsFromPage, 'rootPath', '');
                if (get(error, 'name', null) === 'ErrorIdArticle') {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `SectionAliasMobile:${sectionAliasMobile || ''} - ${get(
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
    const { information, sectionAliasMobile } = element;
    const informationBox = {
        sectionAliasMobile,
        ...information
    };

    const articles = get(element, 'articles', []);

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
            notas: resultArticles
        };
    }
    return null;
};

export default storyBox;
