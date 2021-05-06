import Consumer from 'fusion:consumer';

class ArticleFeature {
    constructor(props) {
        this.props = props;

        const {
            id: featureId,
            customFields: { noteId: id, imageId }
        } = props;
        this.state = { id, imageId, featureId };

        this.fetchContent({
            articleSourceNota: {
                source: 'articleSourceNota',
                query: { id, published: true }
            }
        });
    }

    render() {
        try {
            const { articleSourceNota } = this.state || {};

            if (!articleSourceNota) {
                return null;
            }
            return articleSourceNota;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
