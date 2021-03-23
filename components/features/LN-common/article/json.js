import Consumer from 'fusion:consumer';
// URL de pagina: http://localhost/pf/deportes/?_website=la-nacion-ar&outputType=json

class ArticleFromBox {
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
            const { _id: notaId, canonical_url: url } = articleSourceNota;
            const articuloData = {
                id: notaId,
                url
            };
            return articuloData;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFromBox);
