import { getBadgetConfig, getCllBoard, isSubtypeLiveblog } from '../../_helper';
import { isEmptyObject } from '../../../../../private/common/utils/isEmptyObject';

const buildBadgeConfig = (
    transformedArticle,
    editorData,
    chainData,
    withMedia,
    typeOfMedia
) => {
    const widgetOverlay = getCllBoard(editorData.cllBoard?.trim());

    const { badgetStyle, badgetText } = getBadgetConfig({
        article: transformedArticle,
        style: editorData.chapitaStyle,
        text: editorData.chapita,
        isLiveblog:
            editorData.isLiveblog || isSubtypeLiveblog(transformedArticle),
        withMedia,
        typeOfMedia,
        hideBadget: !isEmptyObject(widgetOverlay) || chainData.config.hideBadget
    });

    return {
        badgetText,
        badgetStyle,
        widgetOverlay
    };
};

export default buildBadgeConfig;
