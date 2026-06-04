import {
    getDataAttributesForViewability,
    getLiveblogTitles
} from '../../_helper';
import get from '../../../../../private/common/utils/get';
import getCustomBadge from '../../../../LN/common/utils/getCustomBadge';

const buildCardProps = ({
    articleData,
    editorConfig,
    mediaConfig,
    badgeConfig,
    layoutConfig
}) => {
    const {
        content: articleContent,
        transformed: transformedArticle,
        id: articleId,
        rating = null
    } = articleData;

    const {
        data: editorData,
        featureId,
        variant: finalVariant,
        className: finalClassName
    } = editorConfig;

    const {
        data: mediaData,
        withMedia,
        marquee,
        marqueeImg,
        customVoice: hasCustomVoice,
        overlay: widgetOverlay
    } = mediaConfig;

    const { text: badgetText, style: badgetStyle } = badgeConfig;
    const isSubscriber = badgetStyle === 'subscriber';

    const {
        chainData,
        cardSize: finalCardSize,
        section: sectionContent,
        subhead: subheadContent,
        searchableField: searchableFieldContent
    } = layoutConfig;

    const dataTestId = get(editorData, 'videoComercial', false)
        ? 'vivoYoutube-container-article-disabled'
        : null;

    return {
        'data-testid': dataTestId,
        'data-feature-id': featureId,
        lead:
            get(editorData, 'lead', '') ||
            get(transformedArticle, 'label.volanta.text', ''),
        title:
            get(editorData, 'title', '') ||
            get(transformedArticle, 'headlines.basic', 'titulo'),
        titleTag: get(chainData, 'config.titleTag'),
        href: get(transformedArticle, 'website_url', ''),
        withMedia,
        subheadTag: get(chainData, 'config.subheadTag'),
        marquee,
        marqueeImg,
        marqueeAIHighlight: hasCustomVoice,
        badgeText: isSubscriber ? null : badgetText,
        badgeType: isSubscriber ? null : badgetStyle,
        mediaData,
        widgetOverlay,
        cardSize: finalCardSize,
        imagePosition: get(chainData, 'config.imagePosition'),
        section: sectionContent,
        searchableField: searchableFieldContent,
        ...getDataAttributesForViewability(
            articleId,
            get(chainData, 'boxPosition', 0),
            get(chainData, 'index', 0)
        ),
        subhead: subheadContent,
        variant: finalVariant,
        liveblogList: getLiveblogTitles(articleContent),
        aspectRatio: get(chainData, 'config.aspectRatio', 'ratio-3-2'),
        className: finalClassName,
        customBadge: getCustomBadge({ rating, isSubscriber })
    };
};

export default buildCardProps;
