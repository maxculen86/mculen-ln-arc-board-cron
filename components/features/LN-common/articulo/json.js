import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import getCajaTemaConfig from '../../../private/LN/home/components/noteCard/noteCardImageHelper';
import resultArticle from '../../../private/LN/api/global/home/features/article/index';
import { getFieldsArticlesByTypeChain } from '../../../private/LN/api/global/home/features/article/utils/helpers';
import get from '../../../private/common/utils/get';

class ArticleFeature {
    constructor(props) {
        this.props = props;
        const {
            customFields: { noteId, imageId, video },
            id: featureId,
            arcSite
        } = props;

        const renderables = get(props, 'renderables', null);
        const sourceInclude = getFieldsArticlesByTypeChain('default');
        let imageConfig = null;
        this.state = {};
        if (renderables) {
            const { cajaTemaConfig } = getProperties(arcSite);

            imageConfig = getCajaTemaConfig(
                featureId,
                renderables,
                cajaTemaConfig,
                false
            ).imageConfig;
        }
        video &&
            video.trim() &&
            this.fetchContent({
                articleVideo: {
                    source: 'videoSource',
                    query: {
                        id: video && video.trim(),
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
            if (!articleSourceNota) {
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
