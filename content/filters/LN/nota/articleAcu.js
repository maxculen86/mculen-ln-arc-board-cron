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
    _id
    type
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
    }
    label {
        volanta {
            text
            display
        }
    }
    display_date
    marquesina
}`;
