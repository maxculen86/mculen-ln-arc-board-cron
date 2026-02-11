import { imageResizedUrl } from '../../LN/common';

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
    auth {
        1
    }
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
            auth {
                1
            }
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

const labels = `
    label {
        showcase{
            text
            display
        }
        autor{
            text
        }
        conversion_porciones{
            text
        }
        info_nutricional{
            text
        }
        leyenda_imagenes_ia{
            text
        }
    }
`;

const table = `
    header {
        _id
        content
        type
    }
    rows {
        _id
        content
        type
    }
`;

const videoJwObject = `
    title
    description,
    kind,
    playlist {
        created,
        description,
        duration,
        pubdate,
        image,
        images {
            src,
            type,
            width
        },
        link,
        mediaid,
        sources {
            file,
            type,
            bitrate,
            filesize,
            framerate,
            height,
            label,
            type,
            width
        },
        title,
        tracks {
            file,
            kind
        },
        variations
    }
`;

const configPowerUpVideoJw = `
    idVideo
    videoJw {
        ${videoJwObject}    
    }
    idPlayer
`;

const customVideoJw = `
    subtype
    embed {
        config {
            ${configPowerUpVideoJw}
        }
    }
`;

const customPowerUps = `
    subtype
    embed {
        config {
            imageId {
                id
                url
                width
                height
                focalPoint
                caption
                resized_urls {
                    resizedUrl
                    option {
                        width
                        height
                        media
                        minScreenWidth
                        useFullSize
                        proportions
                        media_preload
                    }
                }
            }
            items {
                abbreviation
                amount
                fullIngredientString
                includeInShoppingList
                ingredient
                isMainIngredient
                unit
                text
                value
            }
            title
            paragraph
            typeList
            titleList
            date
            time
            isoDate
            ${configPowerUpVideoJw}  
            altTextImage
            arcData {
                _id
                canonical_url
                headlines {
                    basic
                }
                credits {
                    by {
                        name
                        type
                    }
                }
                taxonomy {
                    primary_section {
                        _id
                        name
                        path
                        type
                    }
                    sections {
                        _id
                        name
                        path
                        type
                    }
                }
                content_restrictions {
                    content_code
                }
            }
            author
            category
            description
            image
            noteId
            preparationTime
            publishDate
            url
            hasVideo {
                _id
            }
            sections {
                _id
                _website
                name
                path
                type
                parent_id
            }
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
            prepTime
            cookTime
            counterTime
            counterPortion
            cookingTypes
            occasions
            regions
        }
    }
`;

const listCommonProps = `
    content
    type
   _id  
`;

const nutritionalInfo = `
    _id
    type
    subtype
    embed {
        config {
            items {
                carbohydrates
                calories
                protein
                totalFat
                sodium
                fiber
            }
        }
        id
        url
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
            _id
            type
            content
            additional_properties {
                iptc_source
            }
            ${image}
            ${video}
            ${customVideoJw}
            auth {
                1
            }
        }
        storytelling {
            _id
            ${video}
            ${customVideoJw}
        }
        storytelling_mobile {
            _id
            ${image}
            auth {
                1
            }
        }
        receta {
            ${customReceta}
        }
        video_jw {
            ${customVideoJw}
        }
        apertura_multimedia {
            _id
            type
            ${video}
            content
            ${customVideoJw}
        }
        nutritional_information {
            ${nutritionalInfo}
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
                resized_urls {
                    ${imageResizedUrl}
                }
                auth {
                    1
                }
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
        sections ${section}
        primary_section ${section}
        seo_keywords
    }
    content_elements {
        _id
        type
        url
        content
        list_type
        items {
            items {
                items {
                    items {
                        items
                        ${listCommonProps}
                    }
                    ${listCommonProps}
                }
                ${listCommonProps}
            }
            ${listCommonProps}
        }
        level
        powerUp{
            _id
            type
            subtype
            ${table}
            embed{
                config{
                    items{
                        text
                        value
                        unit
                    }
                    titleList
                    typeList
                }
            }
        }
        citation {
            type
            content
        }
        ${image}
        ${customPowerUps}
        ${video}
        ${oembed}
        ${table}
        auth {
            1
        }
        content_elements {
            _id
            content
            items {
                _id
                content
            }
            ${image}
            auth {
                1
            }
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
    revision {
        published
    }
    subscription,
    paywallEnabled,
    withSponsoredLink
    category
}`;

export {
    section,
    image,
    video,
    oembed,
    labels,
    table,
    customPowerUps,
    customReceta,
    listCommonProps,
    nutritionalInfo
};
