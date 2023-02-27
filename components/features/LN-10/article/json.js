import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import { renderProps } from '../../../private/LN/api/global/components/features/article/LN10/renderProps';
import { articleSourceNotaSourceInclude } from '../../../private/LN/api/global/components/features/article/common/sources/articleSourceNotaSourceInclude';
import { validateProps } from '../../../private/LN/api/global/components/features/article/LN10/props/validateProps';
import { validatePropsRender } from '../../../private/LN/api/global/components/features/article/LN10/props/validatePropsRender';

import {
    getChainConfig,
    validateArticleFeature
} from './common/_helper-WebApi';

class ArticleFeature {
    constructor(props) {
        this.state = {};
        const {
            customFields: { noteId, imageId, video: videoId, variant },
            id: featureId,
            arcSite,
            renderables = []
        } = props;
        const { cajaTemaConfig } = getProperties(arcSite);
        this.configs = getChainConfig(featureId, renderables, cajaTemaConfig);
        const imageConfig = this.configs && this.configs.imageConfig;
        const typeCard = variant || 'default';
        const sourceInclude = articleSourceNotaSourceInclude(typeCard);
        this.props = validateProps(props, this.configs);

        videoId &&
            videoId.trim() &&
            this.fetchContent({
                articleVideo: {
                    source: 'videoSource',
                    query: {
                        id: videoId && videoId.trim(),
                        website: 'la-nacion-ar'
                    }
                }
            });

        noteId &&
            this.fetchContent({
                articleSourceNota: {
                    source: 'articleSourceNota',
                    query: {
                        id: noteId.trim(),
                        imageConfig,
                        published: true,
                        checkExclusiveAccess: false,
                        sourceInclude
                    }
                }
            });

        imageId &&
            imageId.trim() &&
            this.fetchContent({
                articleImage: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId.trim(),
                        published: true,
                        imageConfig,
                        'arc-site': 'la-nacion-ar',
                        nid: noteId,
                        boxType: 'ArticleFeature'
                    }
                }
            });
    }

    render() {
        try {
            const { articleSourceNota, articleImage, articleVideo } =
                this.state || {};

            const { config = {}, layout, isBomba } = this.configs;
            const { variantsDisabled } = config;

            if (!articleSourceNota) {
                return null;
            }

            const {
                propsRender,
                articleSourceNotaRender,
                articleImageRender,
                articleVideoRender
            } = validatePropsRender(
                articleSourceNota,
                articleImage,
                articleVideo,
                this.props,
                this.configs
            );

            const { customFields = {} } = propsRender;
            const {
                variant: variantRender,
                noteId: noteIdRender,
                imageId: imageIdRender,
                video: videoIdRender
            } = customFields;

            const error = validateArticleFeature({
                id: noteIdRender,
                content: articleSourceNotaRender,
                image: articleImageRender,
                video: articleVideoRender,
                layout,
                imageId: imageIdRender,
                videoId: videoIdRender,
                config,
                variant: variantRender,
                variantsDisabled,
                isBomba
            });

            if (error) {
                // eslint-disable-next-line no-console
                console.warn(error);
                return null;
            }

            return renderProps(
                articleSourceNotaRender,
                articleImageRender,
                articleVideoRender,
                propsRender,
                this.configs
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
