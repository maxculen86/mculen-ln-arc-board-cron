const image = `
    type
    resized_urls {
        apertura_small
        apertura_medium
        apertura_big
        cuerpo_small
        cuerpo_medium
        cuerpo_big                
    }
    url
    subtitle
`;

export default `{
content_elements {    
        _id
        subtype
        promo_items {
            basic {
                ${image}
            }
        }
        credits {
            by {
                name
                type
            }
        }
        headlines {
            basic
        }
        display_date
        website_url
        imageResizePresets {
            medium{
                media
                class
            }
            big{
                media
                class
            }
        }
    }
}`;
