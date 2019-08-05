const schema = `
type Headlines {
    basic: String
    mobile: String
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

type Article {
    _id: String
    taxonomy: Taxonomy
    credits: Credits
    promo_items: PromoItems
    headlines: Headlines
    subtype: String

}

type Query {
    content_elements: [Article]
}

`;

export default schema;
