import Consumer from 'fusion:consumer';
import {
    checkForId,
    getChainConfig,
    isInApertura
} from '../article/common/_helper-WebApi';
import { videoJWM3u8 } from '../../../private/LN/api/common/elements/videoJW';
import { articleSourceNotaSourceInclude } from '../../../private/LN/api/global/components/features/article/common/sources/articleSourceNotaSourceInclude';
import { validateProps } from '../../../private/LN/api/global/components/features/article/LN10/props/validateProps';
import { renderProps } from '../../../private/LN/api/global/components/features/article/LN10/renderProps';
import validateVideoPlayerNota from './common/_helper-WebApi';

class videoPlayerNotaFeature {
    constructor(props) {
        this.state = {};
        this.jwVideoId = undefined;
        this.NoteId = undefined;

        const {
            arcSite: website,
            customFields: { noteId, video, variant },
            id: featureId,
            renderables = [],
            layout: layoutPageBuilder
        } = props;

        this.configs = getChainConfig({ featureId, renderables }) || {};
        const { config = {}, index } = this.configs;
        this.onlyOneApeturaValidateForWWW = isInApertura({
            layoutPageBuilder,
            renderables,
            featureId,
            config,
            articlePosition: index
        });

        const typeCard = variant || 'default';
        const sourceInclude = articleSourceNotaSourceInclude(typeCard);
        this.props = validateProps(props, this.configs);

        const source = 'videosJwSource';
        const videoId = checkForId(video);

        if (videoId) {
            this.jwVideoId = videoId;
            this.fetchContent({
                videosJwData: {
                    source,
                    query: { id: videoId, website }
                }
            });
        }

        if (noteId) {
            this.fetchContent({
                articleSourceNota: {
                    source: 'articleSourceNota',
                    query: {
                        id: noteId.trim(),
                        published: true,
                        checkExclusiveAccess: false,
                        isInApertura: this.onlyOneApeturaValidateForWWW,
                        sourceInclude
                    }
                }
            });
        }
    }

    render() {
        try {
            const { articleSourceNota, videosJwData } = this.state || {};

            if (!articleSourceNota && !videosJwData) {
                return null;
            }

            const {
                poster: posterUrl,
                duration: fullVideoDuration,
                posterVideo: previewVideoUrl,
                title
            } = videosJwData;
            const fullVideoUrl = videoJWM3u8(videosJwData.sources);

            const articleResponse = renderProps(
                articleSourceNota,
                null,
                null,
                this.props
            );

            const {
                customFields: { noteId, video: videoId, variant }
            } = this.props;
            const validationError = validateVideoPlayerNota({
                noteId,
                video: videosJwData,
                videoId,
                variant,
                layout: this.configs?.layout
            });

            if (validationError) {
                console.warn(validationError);
                return null;
            }

            return {
                ...articleResponse,
                videoData: {
                    id: this.jwVideoId,
                    title,
                    posterUrl,
                    previewVideoUrl,
                    fullVideoUrl,
                    fullVideoDuration
                }
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(videoPlayerNotaFeature);
