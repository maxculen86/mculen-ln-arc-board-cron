import { imageResizedUrl } from '../common';

export default `
{
    _id
    type
    subtype
    promo_items {
        basic {
            type
            resized_urls {
                ${imageResizedUrl}
            }
            url
        }
    }
    credits
    headlines {
        basic
    }
    taxonomy {
        tags
    }
}`;
