import { imageResizedUrl } from '../common';

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
    distributor {
        name
        category
        reference_id
        mode
    }
    promo_items {
        basic {
            ${image}
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
    owner {
        sponsored
    }
    content_restrictions {
        content_code
    }
    credits {
        by {
            name
            type
            image {
                url
                resized_urls {
                    ${imageResizedUrl}
                }
            }
            additional_properties {
                original {
                    author_type
                    image
                    voice
                }
            }
        }
    }
    headlines {
        basic
        mobile
    }
    subheadlines {
        basic
    }
    content_elements {
        _id
        type
        numeric_rating
        min
        max
        units
    }
    display_date
    publish_date
    website_url
    marquesina
    label  {
        recomendar {
            text
        }
        volanta {
            text
            display
        }
        chapita {
            text
            display
        }
    }
    related_content {
        basic{
            _id
            type
            referent {
                type
            }
        }
    }
}`;
