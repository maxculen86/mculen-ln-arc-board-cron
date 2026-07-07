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
        mime_type
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
        chapita {
            text
            display
        }
        metarefresh {
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
        showcase{
            text
            display
        }
        eje_subeje{
            text
            display
        }
        location {
            ${label}
        }
        mostrar_caja_dolar {
            ${label}
        }
        mostrar_caja_juegos {
            ${label}
        }
        republicar_audio {
            display
            text
        }
        glosario_nota {
            display
            text
        }
        mostrar_caja_autores{
            ${label}
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
    title,
    epigraphTitle,
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

const customLiveblog = `
    id
    mode
    authors {
        name
        photo
        link
        id
        firstName
        lastName
        role
    }
    isPinned
    pinnedAt
    customTime
    showCustomTime
`;

const galleryEmbed = `
    galleryId
    diagram
    isFotoAl100
    caption
    count
    startPosition
    galleryImages{
        url
        resized_urls{
            resizedUrl
            option{
                width
                height
                media
                minScreenWidth
                useFullSize
            }
        }
        height
        width
        id
        alt
        poster
        mp4
        type
    }
    videoPosition
`;

const openingStorytelling = `
subtype
    embed {
        config {
            diagram
            opacity
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
            title
            step
            paragraph
            typeList
            date
            time
            isoDate
            ${configPowerUpVideoJw}
            widgetUrl
            embedType
            cardColor
            cardNumber
            title
            description
            buttonText
            cardId
            useNumbering
            ${customLiveblog}
            ${galleryEmbed}
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
        }
    }
`;
const customSummary = `
    subtype
    embed {
        config {
            arrayBullets
        }
    }
`;

const customGlossary = ` 
    _id
    embed {
        config {
            arrayData 
            {
            key
            value
            }
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
            auth {
                1
            }
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

const listCommonProps = `
    content
    type
   _id  
`;

export default `
{
    externalApiRedirectUrl
    source {
        system
    }
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
        subcategory
        mode
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
            ${customVideoJw}
            auth {
                1
            }
            originalSizes {
                height
                width
            }
            subtitle
            caption
            alt_text
        }
        custom_storytelling_opening {
        ${openingStorytelling}
        }
        glossary {          
            ${customGlossary}
        }
       Storytelling {
            _id
            ${image}
            auth {
                1
            }
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
        summary {
            ${customSummary}
        }
        video_jw {
            ${customVideoJw}
        }
        apertura_multimedia {
            _id
            type
            ${video}
            embed_html
            content
            ${customVideoJw}
        },
        summary {
            _id,
            embed {
                config {
                    arrayBullets
                }
            }
        }
        audio_nota {
            embed {
                config {
                    audio_id
                    audio_status
                    audio_url
                    audio_summary_url
                    voice
                }
            }
        }
    }
    credits {
        by {
            _id
            name
            type
            url
            slug
            social_links {
                site
                url
            }
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
                    voice
                    gplus
                    bio
                    longBio
                }
            }
        }
    }
    headlines {
        basic
        mobile
        meta_title
        web
        native
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
                basic,
                mobile
            }
            ${labels}
            website_url
            canonical_url
            referent {
                type
                ${image}
                auth {
                    1
                }
            }
        }
        redirect {
            redirect_url
        }
    }
    content_elements {
        _id
        type
        numeric_rating
        min
        max
        units
        url
        content,
        alignment,
        numeric_rating,
        units,
        additional_properties {
            iptc_source
        }
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
        content
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
        ${gallery}
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
    planning {
        internal_note
        story_length {
            character_count_actual
            character_encoding
            inch_count_actual
            line_count_actual
            word_count_actual
        }
    }
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
    subscription,
    paywallEnabled,
    checkoutEnabled,
    withFirmaDistributor
    isListenable
    withSponsoredLink
    category
}`;
