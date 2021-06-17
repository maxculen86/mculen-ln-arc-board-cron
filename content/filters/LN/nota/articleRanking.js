import { imageResizedUrl } from '../common';

const image = `
    type
    resized_urls {
        ${imageResizedUrl}
    }
    url
    subtitle
`;

export default `
{
    type
    content_elements {
        _id
        subtype
        promo_items {
            basic {
                ${image}
            }
        }
        headlines {
            basic
            shortTitle
            mobile
        }
        subheadlines{
            basic
        }
        website_url
        related_content {
            basic{
                _id
                type
                referent {
                    type
                }
            }
        }
    }

}`;
