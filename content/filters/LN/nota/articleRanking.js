import { imageResizedUrl } from '../common';

const image = `
    type
    resized_urls {
        ${imageResizedUrl}             
    }
    url
    subtitle
    height
    width
`;

export default `{
    _id
    size
    name
    articles {    
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
                volanta {
                    text
                }
            }
            subheadlines
            canonical_url
            display_date
            website_url
        }
}`;
