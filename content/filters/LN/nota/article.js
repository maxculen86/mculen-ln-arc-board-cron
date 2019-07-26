const section = `
{
    _id
    _website
    name
    path
    parent_id
    additional_properties {
        original {
            ancestors {
                default
            }
        }
    }
}`;

const image = `
    type
    resized_urls {
        apertura_small
        apertura_medium
        apertura_big
        cuerpo_small
        cuerpo_medium
        cuerpo_big                
    }
    url
    subtitle
`;

export default `
{
    _id
    subtype
    promo_items {
        basic {
            ${image}
        }
    }
    credits
    headlines {
        basic
    }
    subheadlines {
        basic
    }
    taxonomy { 
        tags {
            text
            description
            slug
        }
        sections ${section}
        primary_section ${section}
    }
    content_elements {
        _id
        type
        content
        ${image}
    }
    imageResizePresets {
        apertura_small {
            media
            class
        }
        apertura_medium{
            media
            class
        }
        apertura_big{
            media
            class
        }
        cuerpo_small{
            media
            class
        }
        cuerpo_medium{
            media
            class
        }
        cuerpo_big   {
            media
            class
        } 
    }
}`;
