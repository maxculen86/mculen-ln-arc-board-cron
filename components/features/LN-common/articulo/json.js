import Consumer from 'fusion:consumer';

class ArticleFeature {
    constructor(props) {
        this.props = props;
        const {
            customFields: { noteId, imageId }
        } = props;
        this.state = {};

        noteId &&
            this.fetchContent({
                articleSourceNota: {
                    source: 'articleSourceNota',
                    query: { id: noteId, published: true }
                }
            });
        if (imageId) {
            this.fetchContent({
                articleImage: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId,
                        published: true,
                        imageConfig: 'm',
                        'arc-site': 'la-nacion-ar'
                    }
                }
            });
        }
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
