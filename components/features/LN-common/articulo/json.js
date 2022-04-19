import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import GetCajaTemaConfig from '../../../private/LN/home/components/noteCard/noteCardImageHelper';

class ArticleFeature {
    constructor(props) {
        this.props = props;
        const {
            id: featureId,
            customFields: { noteId, imageId },
            arcSite,
            renderables
        } = props;
        this.state = {};

        const { cajaTemaConfig } = getProperties(arcSite);

        const { imageConfig } = GetCajaTemaConfig(
            featureId,
            renderables,
            cajaTemaConfig,
            false
        );

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
            const {
                noteId,
                title,
                authors,
                lead,
                chapita,
                opinion
            } = this.props.customFields;

            if (!articleSourceNota) {
                return null;
            }

            const additionalProperties = {
                noteId,
                title,
                authors,
                lead,
                chapita,
                opinion,
                image: articleImage || null
            };
            return { ...articleSourceNota, additionalProperties };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
