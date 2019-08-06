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
            style {
                section_logo_class
                section_class
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
`;

const customReceta = `
    subtype
    embed {
        config {
            titleList
            title
            typeList
            items
            counterTime
            counterPortion
        }
    }
`;

const article = `
    _id
    type
    subtype
    canonical_url
    promo_items {
        basic {
            ${image}
        }
        receta {
            ${customReceta}
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
        ${customReceta}
    }
    display_date
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
`;

export default `
{
    content_elements [{
        ${article}
    }]
}
`;
