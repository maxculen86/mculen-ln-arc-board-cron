import { imageResizedUrl } from '../common';

const image = `
    type
    url
    alt_text
    caption
    width
    height
    resized_urls {
        ${imageResizedUrl}               
    }
    additional_properties {
        mime_type
    }
`;

export default `
{
    promo_items {
        basic {
            ${image}
        }
    }

}`;
