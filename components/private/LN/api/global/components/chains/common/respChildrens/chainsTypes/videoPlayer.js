import { setSlicedChildren } from '../../../../../../../../../chains/utils/common/_helpers-WebApi';
import { validateChildrensApi } from '../../../../common/utils/_helpers';

const LN_VIDEOPLAYER = 'LN-10/videoPlayer';

export const respChildrens = props => {
    try {
        const {
            children,
            customFields: { layout }
        } = props;

        if (!validateChildrensApi(children)) {
            return null;
        }

        const videoFeature = children.find(
            article => article?.type && article.type === LN_VIDEOPLAYER
        );

        const otherFeatures = children.filter(
            article => article?.type !== LN_VIDEOPLAYER
        );

        const orderedArticles = [videoFeature, ...otherFeatures];

        const articles = setSlicedChildren({
            config: { layout },
            children: orderedArticles
        });

        const notesByLayout = articles.length - 1;
        const video = articles[0] || null;
        const articlesResponse = articles
            .slice(-notesByLayout)
            .filter(art => art != null);

        return {
            articles: articlesResponse,
            video
        };
    } catch (error) {
        console.error(
            JSON.stringify({
                log_details: {
                    error: JSON.stringify(error || {}),
                    message: error.message,
                    customType: 'respChildrens.videoPlayer'
                },
                name: 'BackendLnError'
            })
        );
        return null;
    }
};

export default respChildrens;
