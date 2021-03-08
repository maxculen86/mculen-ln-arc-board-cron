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
        type
        promo_items {
            basic {
                ${image}
            }
        }
        taxonomy {
            tags {
                text
                slug
            }
        }
        credits {
            by {
                name
                type
            }
        }
        headlines {
            basic
            shortTitle
        }
        display_date
        publish_date
        website_url 
        description {
            basic
        }
    }
    next
}`;
