import { imageResizedUrl } from '../LN/common';

export default `
{
    name
    node_type
    canonical_url
    byline
    image {
        url
        type
        resized_urls {
            ${imageResizedUrl}
        }
    }
}`;
