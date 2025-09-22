import { useEffect, useMemo } from 'react';
import { useComponentContext } from 'fusion:context';
import { changeConfigForPB } from '../_helper';
import get from '../../../../private/common/utils/get';

import getInitialData from '../utils/data-processing/getInitialData';
import useContentData from './useContentData';
import useArticleMedia from './useArticleMedia';
import { transform } from '../../../../private/LN/home/components/noteCard/noteCardHelper';
import processAuthorData from '../utils/data-processing/processAuthorData';
import { validateArticleFeature } from '../common/_helper-WebApi';
import buildCardConfig from '../utils/card-building/buildCardConfig';
import buildCardProps from '../utils/card-building/buildCardProps';

import buildBadgeConfig from '../utils/card-building/buildBadgeConfig';

const useArticleFeature = (featureId, customFields, searchableField) => {
    const { registerSuccessEvent } = useComponentContext();
    const {
        editorData,
        appData,
        chainData,
        articleId,
        onlyOneApeturaValidateForWWW
    } = getInitialData(featureId, customFields);

    const articleContent = useContentData(
        articleId,
        editorData,
        chainData,
        appData,
        onlyOneApeturaValidateForWWW
    );

    const sourcePromoItems = get(articleContent, 'promo_items');

    const finalTransformedArticle = useMemo(
        () => transform(articleContent, customFields, sourcePromoItems),
        [articleContent, customFields, sourcePromoItems]
    );

    const { withMedia, mediaData, typeOfMedia, image, videoBackground } =
        useArticleMedia({
            editorData,
            chainData,
            appData,
            transformedArticle: finalTransformedArticle,
            onlyOneApeturaValidateForWWW
        });

    const { badgetText, badgetStyle, widgetOverlay } = buildBadgeConfig(
        finalTransformedArticle,
        editorData,
        chainData,
        withMedia,
        typeOfMedia
    );

    const { marqueeImg, marquee, authorsQuantity } = processAuthorData({
        transformedArticle: finalTransformedArticle,
        editorData,
        chainConfig: get(chainData, 'config', {})
    });

    const articleValidationError = validateArticleFeature({
        id: get(editorData, 'id', ''),
        content: finalTransformedArticle,
        image,
        video: videoBackground,
        layout: get(chainData, 'layout', ''),
        imageId: get(editorData, 'imageId', null),
        videoId: get(editorData, 'videoId', null),
        config: get(chainData, 'config'),
        variant: get(editorData, 'variant', ''),
        variantsDisabled: get(chainData, 'config.variantsDisabled', []),
        isBomba: get(chainData, 'isBomba', false),
        chapita: get(editorData, 'chapita', ''),
        cllBoard: get(editorData, 'cllBoard', false),
        isHtml: get(editorData, 'isHtml', false)
    });

    useEffect(() => {
        if (get(appData, 'isAdmin', false) && !articleValidationError) {
            changeConfigForPB({
                setConfig: get(chainData, 'setConfig'),
                featureId,
                renderables: get(appData, 'renderables', [])
            });
        }
    }, [
        featureId,
        get(appData, 'isAdmin', false),
        get(chainData, 'layout', ''),
        get(appData, 'renderables', []),
        articleValidationError
    ]);

    const buildCardConfigData = {
        articleData: {
            content: articleContent,
            transformed: finalTransformedArticle
        },
        configData: {
            chainData,
            appData,
            editorData,
            customFields
        },
        authorData: {
            quantity: authorsQuantity,
            marqueeImg
        },
        mediaData: {
            type: typeOfMedia,
            withMedia
        },
        displayData: {
            searchableField
        }
    };

    const {
        hasCustomVoice,
        finalCardSize,
        finalVariant,
        finalClassName,
        sectionContent,
        subheadContent,
        searchableFieldContent
    } = buildCardConfig(buildCardConfigData);

    const articleData = {
        content: articleContent,
        transformed: finalTransformedArticle,
        id: articleId
    };

    const editorConfig = {
        data: editorData,
        featureId,
        variant: finalVariant,
        className: finalClassName
    };

    const mediaConfig = {
        data: mediaData,
        withMedia,
        marquee,
        marqueeImg,
        customVoice: hasCustomVoice,
        overlay: widgetOverlay
    };

    const badgeConfig = {
        text: badgetText,
        style: badgetStyle
    };

    const layoutConfig = {
        chainData,
        cardSize: finalCardSize,
        section: sectionContent,
        subhead: subheadContent,
        searchableField: searchableFieldContent
    };

    const baseCardProps = buildCardProps({
        articleData,
        editorConfig,
        mediaConfig,
        badgeConfig,
        layoutConfig
    });

    const cardProps = {
        ...baseCardProps,
        onClick: () => chainData.hasVariants && registerSuccessEvent()
    };

    return {
        error: articleValidationError,
        isAdmin: get(appData, 'isAdmin', false),
        transformedArticle: finalTransformedArticle,
        articleContent,
        cardProps,
        featureId
    };
};

export default useArticleFeature;
