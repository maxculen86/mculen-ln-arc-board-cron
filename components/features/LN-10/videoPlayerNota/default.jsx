import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { Card } from '@ln/contenidos-ui-card';
import { transform } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import {
    getDataAuthor,
    getDataAttributesForViewability,
    articleCustomFields,
    validateSubhead,
    showSubheadText,
    changeConfigForPB,
    showSection,
    showExtraClass,
    shouldHighlightCustomVoice
} from '../article/_helper';
import {
    getChainConfig,
    validateArticleFeature,
    checkForId
} from '../article/common/_helper-WebApi';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import ErrorBoundary from '../../../private/common/ErrorBoundary';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import MarqueeHighlight from '../../LN-10-global/common/marqueeHighlight/default';
import VideoCommonJw from '../../LN-10-global/common/videoCommon/default';
import { validateVideoPlayer } from '../videoPlayer/_helper';
import useTermica from '../../../private/common/hooks/useTermica';
import useGetVideoData from './common/hooks/useGetVideoConfig';

function LN10VideoPlayerNota({ id: featureId, customFields }) {
    const {
        noteId: id,
        video: videoId,
        lead,
        title,
        authors,
        description,
        hideAuthors
    } = customFields ?? {};

    const articleId = checkForId(id);
    const { isAdmin, renderables, layout: layoutPageBuilder } = useAppContext();

    const { layoutsName = {} } = siteConfig || {};
    const termicaCajaSegmentada = useTermica('caja_segmentada');

    const {
        config: initialConfig = {},
        index,
        layout,
        imageConfig,
        boxPosition
    } = getChainConfig({ featureId, renderables, termicaCajaSegmentada });

    const extraOpts = getDataAttributesForViewability(
        articleId,
        boxPosition,
        index
    );
    const [config, setConfig] = useState(initialConfig);

    const articleContent = useContent({
        source: articleId ? 'lnHomeBaseArticleSource' : null,
        query: {
            id: articleId,
            published: true,
            imageConfig,
            checkExclusiveAccess: false,
            isAdmin,
            isHome: layoutPageBuilder === layoutsName.HomeLN10
        },
        staticMode: isSSR(),
        filter
    });

    const article = transform(articleContent, customFields);

    const withSubhead = validateSubhead(config, false, customFields, 'regular');

    const videoData = useGetVideoData({
        videoId,
        imageConfig: 'videoHorizontal',
        staticMode: true
    });

    const { title: videoTitle, playlist } = videoData || {};

    const videoConfig = {
        videoId,
        mediaId: featureId,
        title: videoTitle,
        playerId: 'XD8x4oQD',
        instanceConfig: {
            playlist,
            autostart: true,
            aspectratio: '16:9'
        }
    };

    const {
        withSection,
        withMarquee,
        withMarqueeImg,
        extraClass,
        cardSize,
        className
    } = config || {};

    const videoValidationError = validateVideoPlayer({
        video: videoData,
        videoId
    });

    const error =
        videoValidationError ||
        validateArticleFeature({
            id,
            content: article,
            video: videoData,
            layout,
            videoId,
            config
        });

    useEffect(() => {
        if (isAdmin && !error) {
            changeConfigForPB({ setConfig, featureId, renderables });
        }
    }, [featureId, isAdmin, layout, renderables, error]);

    const { marqueeImg, marquee } = getDataAuthor({
        article,
        authors,
        hideAuthors,
        withMarquee,
        withMarqueeImg
    });

    if (isAdmin && !!error) {
        return (
            <article data-feature-id={featureId}>
                <WarningMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    if (!isAdmin && (!article || !articleContent)) return null;

    const hasCustomVoice = shouldHighlightCustomVoice(articleContent, config);

    const sectionText = hasCustomVoice ? (
        <MarqueeHighlight />
    ) : (
        showSection({
            withSection,
            article,
            authors,
            authorPhoto: marqueeImg
        })
    );

    return (
        !error && (
            <ErrorBoundary>
                <VideoCommonJw
                    videoId={videoId}
                    mediaId={featureId}
                    videoConfig={videoConfig}
                    extraOpts={{
                        ...extraOpts,
                        'data-skip-product-click': true,
                        'data-skip-impression': true
                    }}
                    ratio="ratio-16-9"
                    isAdmin={isAdmin}
                    videoData={videoData}
                />
                <Card
                    data-feature-id={featureId}
                    lead={lead || get(article, 'label.volanta.text')}
                    title={title || get(article, 'headlines.basic', 'titulo')}
                    titleTag={get(config, 'titleTag')}
                    href={get(article, 'website_url', '')}
                    withMedia={false}
                    subheadTag={get(config, 'subheadTag')}
                    marquee={marquee}
                    marqueeImg={marqueeImg}
                    marqueeAIHighlight={hasCustomVoice}
                    cardSize={cardSize || 'xl-l'}
                    section={sectionText}
                    {...extraOpts}
                    subhead={showSubheadText({
                        description,
                        withSubhead,
                        article
                    })}
                    variant="regular"
                    aspectRatio={get(config, 'aspectRatio', 'ratio-3-2')}
                    className={showExtraClass(className, extraClass)}
                />
            </ErrorBoundary>
        )
    );
}

LN10VideoPlayerNota.label = 'LN10 VideoPlayerNota';

LN10VideoPlayerNota.propTypes = {
    id: PropTypes.string.isRequired,
    tree: PropTypes.shape({
        children: PropTypes.array
    }).isRequired,
    customFields: PropTypes.shape({
        video: PropTypes.string.tag({
            name: 'ID de video JW',
            description: 'Ingrese aquí el ID del video',
            required: true,
            default: ''
        }),
        noteId: articleCustomFields.noteId,
        title: articleCustomFields.title,
        lead: articleCustomFields.lead,
        authors: articleCustomFields.authors,
        hideAuthors: articleCustomFields.hideAuthors,
        description: articleCustomFields.description,
        hideDescription: articleCustomFields.hideDescription
    }).isRequired
};

export default Consumer(LN10VideoPlayerNota);
