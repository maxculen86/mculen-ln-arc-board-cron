import Consumer from 'fusion:consumer';
import filter from '../../../../content/filters/LN/acumulado/articleHomeMobile';

class AperturaFeature {
    constructor(props) {
        this.props = props;

        this.id =
            props?.globalContent?.acumuladoGeneral?.id_collection_promo_items;

        this.collectionProps = {
            id: this.id && this.id.trim(),
            size: 2,
            website: 'la-nacion-ar'
        };

        this.fetchContent({
            collectionsSourceResult: {
                source: 'collectionsSource',
                query: this.collectionProps,
                filter
            }
        });
    }

    render() {
        try {
            const { customFields, collectionsSourceResult } = this.state || {};
            return {
                information: customFields,
                articles: collectionsSourceResult?.content_elements
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(AperturaFeature);
