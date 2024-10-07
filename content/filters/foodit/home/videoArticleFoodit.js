export default `
{   
    _id
    website_url
    canonical_url
    promo_items {
        receta {
            embed {
                config {
                    counterTime
                }
            }
        }
    }
    subtype
    taxonomy {
        sections {
            name
        }
        primary_section {
            name
        }
    }
    headlines {
        basic
        mobile
    }
    subheadlines {
        basic
    }
    credits {
        by {
            _id
            name
            type
        }
    }
    content_restrictions {
        content_code
    }
    label {
        autor{
            text
        }
    }
}`;
