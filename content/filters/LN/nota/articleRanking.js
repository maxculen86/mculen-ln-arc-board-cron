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
                republicar_audio {
                    text
                } 
            }
            display_date
            first_publish_date
            canonical_url
            website_url
            source {
                system
            }
            taxonomy {
                primary_section {
                    _id
                }
            }
            content_elements {
                type
            }
        }
}`;
