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
            headlines {
                basic
                mobile
            }
            label {
                volanta {
                    text
                }
            }
            canonical_url
            website_url
        }
}`;
