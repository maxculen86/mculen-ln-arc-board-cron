import { imageResizedUrl } from '../common';

const image = `
    type
    resized_urls {
        ${imageResizedUrl}
    }
    url
    subtitle
    width
    height
`;

export default `
{
    type
    content_elements {
        _id
        promo_items {
            basic {
                ${image}
            }
        }
    }
    next
}`;
