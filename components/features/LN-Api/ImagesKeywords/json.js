import Consumer from 'fusion:consumer';
import { removeEmptyItems } from '../../../private/LN/api/common/utils/responseCleaner';
import { getKeywords, getNextUri, PHOTOCENTER_LIMIT } from './helpers/helper';

class ImagesKeywords {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const { globalContent, globalContentConfig } = this.props;

            const response = {
                cantidad: globalContent.length,
                keywords: getKeywords(globalContentConfig.query),
                next:
                    globalContent.length === PHOTOCENTER_LIMIT
                        ? getNextUri(globalContentConfig.query)
                        : null,
                imagenes: globalContent
            };

            return removeEmptyItems(response);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ImagesKeywords);
