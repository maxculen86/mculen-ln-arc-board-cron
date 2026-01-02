import { setQuantityByLayout } from '../../../../../../../../../chains/utils/common/_helpers-WebApi';
import { validateChildrensApi } from '../../../../common/utils/_helpers';

const LN_VIDEOPLAYER = 'LN-10/videoPlayer';

export const respChildrens = props => {
    try {
        const {
            children,
            customFields: { layout = '' }
        } = props;

        if (!validateChildrensApi(children)) {
            return null;
        }

        const itemByLayout = setQuantityByLayout({
            layout,
            countTimeline: false
        });

        const videoFeature =
            children.find(
                article => article?.type && article.type === LN_VIDEOPLAYER
            ) ?? null;

        const articleFeatures = children
            .filter(article => article && article?.type !== LN_VIDEOPLAYER)
            .slice(0, itemByLayout - 1);

        return {
            articles: articleFeatures,
            video: videoFeature
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
