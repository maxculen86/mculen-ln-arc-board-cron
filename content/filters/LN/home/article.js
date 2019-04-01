export default `
{
    _id,
    subtype,
    promo_items {
        basic {
            type,
            additional_properties {
                resizeUrl
            },
            url
        }
    },
    credits,
    headlines {
        basic
    },
    taxonomy {
        tags
    }
}`