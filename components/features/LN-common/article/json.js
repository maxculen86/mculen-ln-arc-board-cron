import Consumer from 'fusion:consumer';
// URL de ejemplo: http://localhost/api/v1/notas/byAuthor/Ignacio%20Madrid/params=size:12;page:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byAuthor\/(.+)\/(params.+)\/(.*)$ , donde "params" dependera del customField "paramUrlId" configurado

class ArticleFeature2 {
    constructor(props) {
        this.props = props;

        const {
            id: featureId,
            customFields: { noteId: id, imageId }
        } = props;
        this.state = { id, imageId, featureId };

        // this.state = {};

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

            const { globalContent: author, requestUri } = this.props;

            if (!articleSourceNota) {
                return null;
            }
            const { _id: notaId, canonical_url: url } = articleSourceNota;
            const articuloData = {
                NotaId: notaId,
                Url: url
            };
            return articuloData;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature2);
