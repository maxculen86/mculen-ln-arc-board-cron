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
`;

const article = `
    _id 
    canonical_url
    promo_items {
        basic {
            ${image}
        }
    }
    headlines {
        basic
    }
    subheadlines {
        basic
    }
    content_elements {
        _id
        type
        content
        ${image}
    }
    display_date
    imageResizePresets {
        apertura_small {
            media
            class
        }
        apertura_medium{
            media
            class
        }
        apertura_big{
            media
            class
        }
        cuerpo_small{
            media
            class
        }
        cuerpo_medium{
            media
            class
        }
        cuerpo_big   {
            media
            class
        } 
    }
`;

export default `
{
    content_elements {
        ${article}
    }
}
`;
