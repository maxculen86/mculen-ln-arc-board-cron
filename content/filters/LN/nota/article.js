import imageResizedUrl from '../common';

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
                section_style_name
            }
        }
    }
}`;

const image = `
    type
    resized_urls {
        ${imageResizedUrl}             
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
            ${customReceta}
        }
    }
    credits {
        by {
            _id
            name
            type
            url
            slug
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
}`;
