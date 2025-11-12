import { imageResizedUrl } from '../common';

const label = `
    text
`;
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
    auth {
        1
    }
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
                owner {
                    sponsored
                }
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
            sections ${section}
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
                        author_type
                        image
                    }
                }
            }
        }
        distributor {
            name
            category
            reference_id
            mode
        }
        headlines {
            basic
            mobile
        }
        owner {
            sponsored
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
            marca_anunciante {
                ${label}
            }
            republicar_audio {
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
        planning {
            story_length {
                word_count_actual
            }
        }    
    }
    next
}`;
