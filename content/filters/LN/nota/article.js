import { imageResizedUrl } from '../common';

const section = `
{
    _id
    _website
    name
    path
    type
    parent_id
    additional_properties {
        original {
            migration {
                id_section_ln9
                migrated_mob
            }
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
    caption
    additional_properties {
        iptc_source
    }
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
    created_date
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
            additional_properties {
                iptc_source
            }
            ${image}
        }
    }
    additional_properties {
        iptc_source
        nodeType
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
const oembed = `
    type
    subtype
    _id
    raw_oembed {
        url
        html
        width
        height
        type
    }
`;
const label = `
    text
`;
const labels = `
    label {
        edicion {
            text
            display
        }
        enviar_a_apps{
            url
            text
            display
        }
        livefyre_entrada_id {
            ${label}
        }
        volanta {
            text
            display
        }
        mostrar_banners {
            url
            text
            display
        }
        marca_anunciante {
            ${label}
        }
        trust {
            ${label}
        }
        recomendar {
            url
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

const sectionSites = `{
    additional_properties{
        original{
            migration{
                id_section_ln9
                migrated_mob
            }
            _id
        }
    }
}`;

export default `
{
    _id
    canonical_url
    type
    subtype
    siteService {
        tooltips {
            label
            text
        }
        banners {
            adunit
            dimensions
        }
        termicas {
            key
            value
        }
        adserver {
            key
            value
        }
    }
    distributor {
        name
        category
        reference_id
    }
    promo_items {
        basic {
            _id
            type
            content
            additional_properties {
                iptc_source
            }
            ${image}
            ${video}
        }
        storytelling {
            _id
            ${video}
        }
        storytelling_mobile {
            _id
            ${image}
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
                    byline
                    image
                    role
                    bio_page
                    author_type
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
        sites ${sectionSites}
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
            canonical_url
            referent {
                type
                ${image}
            }
        }
        redirect {
            redirect_url
        }
    }
    content_elements {
        _id
        type
        url
        content
        additional_properties {
            iptc_source
        }
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
        ${oembed}
        content_elements {
            _id
            content
            items {
                _id
                content
            }
            ${image}
        }
    }
    display_date,
    created_date,
    first_publish_date,
    last_updated_date,
    publish_date,
    owner {
        sponsored
    }
    website_url,
    ${labels},
    comments {
        display_comments
        allow_comments
    }
    content_restrictions {
        content_code
    }
}`;
