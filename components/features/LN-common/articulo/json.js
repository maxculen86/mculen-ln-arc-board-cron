import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import getCajaTemaConfig from '../../../private/LN/home/components/noteCard/noteCardImageHelper';
import resultArticle from '../../../private/LN/api/v1/global/home/article/index';
import get from '../../../private/common/utils/get';

class ArticleFeature {
    constructor(props) {
        this.props = props;
        const {
            customFields: { noteId, imageId, html },
            id: featureId,
            arcSite
        } = props;

        const renderables = get(props, 'renderables', null);
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

        noteId &&
            this.fetchContent({
                articleSourceNota: {
                    source: 'articleSourceNota',
                    query: {
                        id: noteId.trim(),
                        imageConfig,
                        published: true,
                        checkExclusiveAccess: false
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
            const { articleSourceNota, articleImage } = this.state || {};

            if (!articleSourceNota) {
                return null;
            }
            return resultArticle(articleSourceNota, articleImage, this.props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
