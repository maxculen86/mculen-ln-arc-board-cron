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

export default `
{
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
    imageResizePresets {
        articleAcu_small {
            media
            class
        }
        articleAcu_medium{
            media
            class
        }
        articleAcu_big{
            media
            class
        }
    }
}`;
