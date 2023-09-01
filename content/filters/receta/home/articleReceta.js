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
    taxonomy {
        tags {
            text
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
