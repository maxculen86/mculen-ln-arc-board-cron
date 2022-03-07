/* eslint-disable no-console */
import Consumer from 'fusion:consumer';
import filter from '../../../../../content/filters/LN/acumulado/promoItemsRelatedImage';
import get from '../../../common/utils/get';

class addRelatedImage {
    constructor(props) {
        this.state = {};

        const { article } = props;

        this.test = this.test.bind(this);
        this.test(article);
    }

    async test(article) {
        const relatedContent = get(article, 'related_content.basic', []);

        const { _id: id } =
            (relatedContent &&
                relatedContent.find(
                    item =>
                        get(item, 'referent.type', null) === 'image' ||
                        get(item, 'type') === 'image'
                )) ||
            {};

        const withoutPromoItems =
            !get(article, 'promo_items.basic') ||
            get(article, 'promo_items.basic.type', null) !== 'image';

        id &&
            withoutPromoItems &&
            id.trim() &&
            (await this.fetchContent({
                imageData: {
                    source: 'relatedImageSource',
                    query: {
                        id: id.trim(),
                        subtype: get(article, 'subtype'),
                        imageConfig: 'm',
                        nid: get(article, '_id', ''),
                        boxType: 'addRelatedImage'
                    },
                    filter
                }
            }));
    }

    render() {
        try {
            return this.state.imageData;
        } catch (err) {
            return 1;
        }
    }
}

export default Consumer(addRelatedImage);
