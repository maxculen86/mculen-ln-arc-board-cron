const schema = `
type _id: String
type subtype: String
type headlines {
    basic: String
}
type promo_items {
    basic: {
        type: String,
        additional_properties {
            resizeUrl: String
        }
        url: String
    }
},
type credits {
    by [{
        type: String
        name: String
    }]
}
type taxonomy {
    tags: [{
        text: String
        description: String
        slug: String
    }]
}


`


export default schema