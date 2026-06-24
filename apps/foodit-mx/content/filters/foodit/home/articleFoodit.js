import { imageResizedUrl } from '../../LN/common';

const image = `
    height
    width
    alt_text
    caption
    subtitle
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
    hasVideo
    content_elements {
        _id
        type
        subtype
    }
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
        video_jw {
            _id
           subtype
           type
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
    content_restrictions {
        content_code
    }
    label {
        autor{
            text
        }
    }
}`;
