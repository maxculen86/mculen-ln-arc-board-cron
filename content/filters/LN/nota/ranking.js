import { imageResizedUrl } from '../common';

const image = `
    type
    resized_urls {
        ${imageResizedUrl}             
    }
    url
    subtitle
`;

export default `{
type
content_elements {    
        _id
        subtype
        promo_items {
            basic {
                ${image}
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
            mobile
        }
        related_content
        label {
            volanta
            recomendar
        }
        subheadlines
        canonical_url
        display_date
        website_url
    }
}`;
