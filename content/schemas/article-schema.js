const schema = `
type Headlines {
    basic: String
}
type PromoItems {
    Basic: {
        type: String
        resized_urls: [String]
        url: String
    }
}
type Credit {
    type: String
    name: String
}
type Credits {
    by: [Credit]
}
type Tag {
    text: String
    description: String
    slug: String
}
type Taxonomy {
    tags: [Tag]
}

type Query {
    _id: String
    taxonomy: Taxonomy
    credits: Credits
    promo_items: PromoItems
    headlines: Headlines
    subtype: String
}

`;

export default schema;
