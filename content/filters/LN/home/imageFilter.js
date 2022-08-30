import { imageResizedUrl } from '../common';

export default `{
    promo_items {
        basic {
            type
            resized_urls {
                ${imageResizedUrl}
            }
            url
            subtitle
            width
            height
        }
    }
    _id
}`;
