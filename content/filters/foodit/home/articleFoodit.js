import { imageResizedUrl } from '../../LN/common';

const image = `
    height
    width
    alt_text
    resized_urls {
        ${imageResizedUrl}          
    }
    url
`;

export default `
{   
    _id
    website_url
    promo_items {
        basic {
            ${image}
        }
        receta {
            embed {
                config {
                    counterTime
                }
            }
        }
    }
    subtype
    taxonomy {
        sections {
            name
        }
    }
    headlines {
        basic
    }
    credits {
        by {
            _id
            name
            type
        }
    }
}`;
