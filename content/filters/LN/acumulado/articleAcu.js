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
        canonical_url
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
            receta {
                embed {
                    config {
                        counterTime
                    }
                }
            }
            audio_nota  {
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
            sections {
                name
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
            web
        }
        subheadlines {
            basic
        }
        owner {
            sponsored
        }
        content_elements {
            _id
            type
            content
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
            enviar_a_apps {
                text
            }
            autor{
                text
            }
            basic {
                url
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
        planning {
            story_length {
                word_count_actual
            }
        }   
    }
    next
    count
}`;
