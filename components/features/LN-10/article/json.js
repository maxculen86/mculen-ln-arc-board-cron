import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import get from '../../../private/common/utils/get';
import resultArticle from '../../../private/LN/api/global/home/features/article/index';
import { getFieldsArticlesByTypeChain } from '../../../private/LN/api/global/home/features/article/utils/helpers';
import { validatePropsFeatures } from '../../../private/LN/api/global/home/features/utils/validatePropsFeatures';
import getChainConfig, {
    validateArticleFeature
} from './common/_helper-WebApi';

class ArticleFeature {
    constructor(props) {
        this.props = validatePropsFeatures(props);
        const {
            customFields: { noteId, imageId, video: videoId },
            id: featureId,
            arcSite,
            renderables = null
        } = this.props;

        const sourceInclude = getFieldsArticlesByTypeChain('default');
        let imageConfig = null;
        let layout = null;
        this.state = {};

        if (renderables) {
            const { cajaTemaConfig } = getProperties(arcSite);
            ({ layout, imageConfig } = getChainConfig(
                featureId,
                renderables,
                cajaTemaConfig
            ));
        }
        this.layout = layout;
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
                customFields: { noteId, imageId, video: videoId }
            } = this.props;

            // if (!articleSourceNota) {
            //     return null;
            // }
            const error = validateArticleFeature({
                id: noteId,
                content: articleSourceNota,
                articleImage,
                video: articleVideo,
                layout: this.layout,
                imageId,
                videoId
            });
            if (error) {
                return null;
            }

            return resultArticle(
                articleSourceNota,
                articleImage,
                articleVideo,
                this.props
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
