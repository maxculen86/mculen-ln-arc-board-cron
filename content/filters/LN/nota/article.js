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
    additional_properties {
        iptc_source
    }
    resized_urls {
        ${imageResizedUrl}             
    }
    resized_urls_zoom {
        ${imageResizedUrl}             
    }
    height
    alt_text
    url
    width
    subtitle
    caption
    distributor {
        name
    }
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
    vanity_credits {
        affiliation {
            name
            type
        }
        by {
            name
            type
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
        nodeType
        iptc_source
        advertising {
            playAds
        }
        headlines {
            basic
        }
    }
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
    vanity_credits {
        affiliation {
            name
            type
        }
        by {
            name
            type
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
        volanta {
            text
            display
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
            alt_text
            additional_properties {
                iptc_source
            }
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
            image {
                url
            }
            additional_properties {
                original {
                    role
                }
            }
        }
    }
    headlines {
        basic
        mobile
        meta_title
    }
    description {
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
    syndication {
        external_distribution
        search
    }
    related_content {
        basic {
            type
            _id
            headlines {
                basic
            }
            ${labels}
            website_url
        }
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
        alt_text
        additional_properties {
            iptc_source
        }
        ${image}
        ${customReceta}
        ${gallery}
        ${video}
        content_elements {
            _id
            additional_properties {
                iptc_source
            }
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
