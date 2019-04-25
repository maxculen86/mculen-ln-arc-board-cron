const schema = `
type Image{
    url: String
}
type PromoItems{
    basic: Image
}
type Headlines {
    basic: String
    meta_title: String
}
type VideoDescription {
    basic: String
}

type Query {
    type: String
    canonical_url: String
    canonical_website: String
    short_url: String
    first_publish_date: String
    publish_date: String
    headlines: Headlines
    description: VideoDescription
    promo_items: PromoItems
    _id: String
}`;

export default schema;
