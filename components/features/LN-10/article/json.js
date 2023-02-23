import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import resultArticle from '../../../private/LN/api/global/components/features/article/LN10/index';
import { getFieldsArticlesByTypeChain } from '../../../private/LN/api/global/components/features/article/utils/helpers';
import { validatePropsFeatures } from '../../../private/LN/api/global/components/features/utils/validatePropsFeatures';
import {
    getChainConfig,
    validateArticleFeature
} from './common/_helper-WebApi';

class ArticleFeature {
    constructor(props) {
        this.state = {};
        const {
            customFields: { noteId, imageId, video: videoId },
            id: featureId,
            arcSite,
            renderables = []
        } = props;

        const { cajaTemaConfig } = getProperties(arcSite);
        this.configs = getChainConfig(featureId, renderables, cajaTemaConfig);
        const imageConfig = this.configs && this.configs.imageConfig;
        const sourceInclude = getFieldsArticlesByTypeChain('default');

        this.props = validatePropsFeatures(props, this.configs);

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

            const {
                customFields: {
                    noteId,
                    imageId,
                    video: videoId,
                    variant = 'regular'
                }
            } = this.props;

            const { config = {}, layout, boxPosition, isBomba } = this.configs;
            const { variantsDisabled } = config;

            if (!articleSourceNota) {
                return null;
            }

            const error = validateArticleFeature({
                id: noteId,
                content: articleSourceNota,
                image: articleImage,
                video: articleVideo,
                layout,
                imageId,
                videoId,
                config,
                variant,
                variantsDisabled,
                isBomba
            });

            if (error) {
                return null;
            }

            return resultArticle(
                articleSourceNota,
                articleImage,
                articleVideo,
                this.props,
                this.configs
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
