import Consumer from 'fusion:consumer';

class ArticleFeature {
    constructor(props) {
        this.props = props;

        const {
            customFields: { noteId }
        } = props;
        this.state = {};

        this.fetchContent({
            articleSourceNota: {
                source: 'articleSourceNota',
                query: { noteId, published: true }
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
