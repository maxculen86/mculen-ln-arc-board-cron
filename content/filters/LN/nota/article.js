import { imageResizedUrl } from '../common';

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
            site
        }
    }
}`;

const image = `
    type
    resized_urls {
        ${imageResizedUrl}             
    }
    height
    url
    width
    subtitle
    credits {
        affiliation {
            name
            type
        }
        by {
            byline
            name
            type
            referent {
                id
                provider
                type
            }
        }
    }
    description {
        basic
    }
`;

const video = `
    type
    _id
    publish_date
    duration
    headlines {
        basic
    }
    streams {
        height
        width
        url
        stream_type
    }
    promo_items {
        basic {
            url
        }
    }
    additional_properties {
        advertising {
            playAds
        }
        headlines {
            basic
        }
    }
`;

const label = `
    text
`;

const labels = `
    label {
        livefyre_entrada_id {
            ${label}
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

const gallery = `
    subtype
    _id
    publish_date
    headlines {
        basic
    }
    promo_items {
        basic {
            ${image}
        }
    }
`;

export default `
{
    _id
    canonical_url
    type
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
        seo_keywords
    }
    content_elements {
        _id
        type
        list_type
        items {
            _id
            content
            type
        }
        level
        content
        citation {
            type
            content
        }
        ${image}
        ${customReceta}
        ${gallery}
        ${video}
        content_elements {
            _id
            content
            ${image}
        }
    }
    display_date,
    created_date,
    first_publish_date,
    publish_date,
    website_url,
    ${labels}
}`;
