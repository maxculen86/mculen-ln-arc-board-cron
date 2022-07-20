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
        subtype
        promo_items {
            basic {
                ${image}
            }
        }
        headlines {
            basic
            mobile
        }
        subheadlines {
            basic
        }
        content_elements {
            type
            content
        }
        display_date
        publish_date
        website_url
        display_date
        website_url
        marquesina
        label  {
            recomendar {
                text
            }
            volanta {
                text
                display
            }
        }
        related_content {
            basic {
                _id
                type
                referent {
                    type
                }
            }
        }
    }
    next
}`;
