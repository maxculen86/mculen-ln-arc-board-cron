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
    canonical_url
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
        primary_section {
            name
        }
    }
    headlines {
        basic
        mobile
    }
    subheadlines {
        basic
    }
    credits {
        by {
            _id
            name
            type
        }
    }
    label {
        autor{
            text
        }
    }
}`;
