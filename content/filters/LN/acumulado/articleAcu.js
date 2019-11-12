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
    type
    content_elements {
        _id
        subtype
        promo_items {
            basic {
                ${image}
            }
        }
        taxonomy {
            tags {
                text
                slug
            }
            primary_section {
                _id
                additional_properties {
                    original {
                        style {
                            section_style_name
                        }
                    }
                    
                }
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
        display_date
        website_url       
    }
    next
    
}`;
