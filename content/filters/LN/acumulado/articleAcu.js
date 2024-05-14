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
    type
    subtype
    content_elements {
        _id
        subtype
        promo_items {
            basic {
                ${image}
            }
            receta {
                embed {
                    config {
                        counterTime
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
        content_restrictions {
            content_code
        }
        credits {
            by {
                _id
                slug
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
        owner {
            sponsored
        }
        content_elements {
            type
            content
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
            enviar_a_apps {
                text
            }
            autor{
                text
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
