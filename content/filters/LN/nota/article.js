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
        url
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
    content_elements {
        ${image}
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
        level
        content
        ${image}
        ${customReceta}
        ${gallery}
    }
    display_date,
    created_date,
    first_publish_date
}`;
