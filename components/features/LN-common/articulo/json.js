import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import { renderProps } from '../../../private/LN/api/global/components/features/article/LN/renderProps';
import { articleSourceNotaSourceInclude } from '../../../private/LN/api/global/components/features/article/common/sources/articleSourceNotaSourceInclude';
import get from '../../../private/common/utils/get';
import { getChainConfig } from '../../LN-10/article/common/_helper-WebApi';

class ArticleFeature {
    constructor(props) {
        this.props = props;
        const {
            customFields: { noteId, imageId },
            id: featureId,
            arcSite
        } = props;

        const renderables = get(props, 'renderables', null);
        const sourceInclude = articleSourceNotaSourceInclude('default');
        let imageConfig = null;
        this.state = {};
        if (renderables) {
            const { cajaTemaConfig } = getProperties(arcSite);

            imageConfig = getChainConfig({
                isBomba: false,
                featureId,
                renderables,
                cajaTemaConfig
            }).imageConfig;
        }
        if (noteId) {
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
        }

        if (imageId && imageId.trim()) {
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
    }

    render() {
        try {
            const { articleSourceNota, articleImage } = this.state || {};
            if (!articleSourceNota) {
                return null;
            }
            return renderProps(
                articleSourceNota,
                articleImage,
                null,
                this.props
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
