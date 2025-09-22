import { imageResizedUrl } from '../../common';

const image = `
    type
    resized_urls {
        ${imageResizedUrl}
    }
    url
    subtitle
    width
    height
`;

export default `
{
    _id
    subtype
    website_url
    content_restrictions {
        content_code
    }
    headlines {
        basic
        mobile
        meta_title
        web
    }
    subheadlines {
        basic
    }
    label {
        volanta {
            text
        }
        chapita {
            text
        }
    }
    promo_items {
        basic {
            ${image}
        }
        audio_nota {
            embed {
                config {
                    audio_status
                }
            }
        }
    }
    taxonomy {
        tags {
            text
            slug
        }
        primary_section {
            _id
            name
            path
            additional_properties {
                original {
                    style {
                        section_style_name
                    }
                }

            }
        }
    }
    distributor {
        name
        category
        subcategory
        reference_id
        mode
      }
    credits {
        by {
            _id
            name
            type
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
                }
            }
        }
    }
}`;
