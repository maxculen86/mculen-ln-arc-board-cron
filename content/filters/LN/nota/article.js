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
    subtitle
`;

const video = `
    type
    _id
    additional_properties {
        advertising {
            playAds
        }
        headlines {
            basic
        }
    }
`;

export default `
{
    _id
    subtype
    promo_items {
        basic {
            ${image}
            ${video}
        }
        receta {
            embed {
                config {
                    title
                    counterTime
                    counterPortion
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
