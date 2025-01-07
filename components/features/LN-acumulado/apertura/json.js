import Consumer from 'fusion:consumer';
import filter from '../../../../content/filters/LN/acumulado/articleHomeMobile';
import isAllowedSection from '../../../private/LN/common/utils/isAllowedSection';
import sitesProperties from '../../../../properties/sites/la-nacion-ar';
import allowSectionAndLayout from '../../../private/LN/common/media/helpers/allowSectionAndLayout';
import get from '../../../private/common/utils/get';

class AperturaFeature {
    constructor(props) {
        this.props = props;

        this.id =
            props?.globalContent?.acumuladoGeneral?.id_collection_promo_items;

        this.imageConfig = isAllowedSection({
            props,
            listOfAllowedSection: allowSectionAndLayout,
            layout: get(
                sitesProperties,
                'layoutsName.Acumulado',
                'LN-acumulado'
            )
        });

        this.collectionProps = {
            id: this.id && this.id.trim(),
            size: 2,
            website: 'la-nacion-ar',
            imageConfig: this.imageConfig
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
