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
    type
    content_elements {
        _id
        subtype
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
        credits {
            by {
                _id
                name
                type
                slug
                image {
                    url
                    resized_urls {
                        ${imageResizedUrl}
                    }
                }
                additional_properties {
                    original {
                        image
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
            type
            content
        }
        display_date
        publish_date
        website_url
        display_date
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
    }
    next
}`;
