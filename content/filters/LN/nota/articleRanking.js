import { imageResizedUrl } from '../common';

const image = `
    type
    resized_urls {
        ${imageResizedUrl}             
    }
    auth {
        1
    }
    url
    subtitle
    height
    width
`;

export default `{
    _id
    size
    name
    articles {    
            _id
            subtype
            promo_items {
                basic {
                    ${image}
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
            headlines {
                basic
                mobile
                web
            }
            label {
                volanta {
                    text
                }
                republicar_audio {
                    text
                } 
            }
            display_date
            first_publish_date
            canonical_url
            website_url
            source {
                system
            }
            planning {
                story_length {
                    word_count_actual
                }
            }  
            taxonomy {
                primary_section {
                    _id
                }
            }
        }
}`;
