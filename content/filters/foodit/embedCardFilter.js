export default `
{
    _id
    type
    subtype
    headlines {
        basic
        meta_title
    }
    description {
        basic
    }
    subheadlines {
        basic
    }
    canonical_url
    website_url
    website
    publish_date
    created_date
    display_date
    last_updated_date
    credits {
        by {
            name
            type
        }
    }
    label {
        autor {
            text
        }
    }
    taxonomy {
        primary_section {
            name
            path
        }
        sections {
            name
            path
        }
    }
    promo_items {
        basic {
            url
            alt_text
            resized_urls {
                resizedUrl
                option {
                    width
                    height
                    media
                }
            }
        }
        receta {
            embed {
                config {
                    prepTime
                    cookTime
                    counterTime
                    counterPortion
                    title
                    cookingTypes
                    occasions
                    regions
                }
            }
        }
        video_jw {
            _id
            embed {
                config {
                    idPlayer
                    idVideo
                }
            }
        }
        audio_nota {
            _id
            embed {
                config {
                    audio_id
                    audio_url
                }
            }
        }
    }
    workflow {
        status_code
    }
    revision {
        revision_id
    }
}`;
