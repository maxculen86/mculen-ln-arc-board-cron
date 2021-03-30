import { imageResizedUrl } from '../common';

const image = `
    type
    resized_urls {
       ${imageResizedUrl}               
    }
    url
`;

const article = `
    _id 
    canonical_url
    promo_items {
        basic {
            ${image}
        }
    }
    headlines {
        basic
    }
    subheadlines {
        basic
    }
    label {
        volanta {
            text
            display
        }
    }
    content_elements {
        _id
        type
        content
        ${image}
    }
    display_date   
`;

export default `
{   
    type
    content_elements {
        ${article}
    }
}
`;
