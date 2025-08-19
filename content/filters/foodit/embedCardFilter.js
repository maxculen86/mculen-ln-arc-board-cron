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
    canonical_website
    publish_date
    created_date
    display_date
    last_updated_date
    credits {
        by {
            name
        }
    }
    author
    taxonomy {
        primary_section {
            name
        }
        sections {
            name
        }
        tags
    }
    section {
        name
    }
    promo_items {
        basic {
            url
            resized_urls
            alt_text
        }
        receta {
            embed {
                config
            }
        }
        video_jw {
            embed {
                config
            }
        }
        audio_nota {
            embed {
                config
            }
        }
    }
    content_elements {
        type
        subtype
        embed {
            config
        }
    }
    workflow {
        status_code
    }
    revision {
        revision_id
    }
}`;
