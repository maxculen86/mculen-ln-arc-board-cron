const schema = `
type AditionalProperties {
    published: Boolean
    resizeUrl: String
    originalUrl: String
}
type Source {
    edit_url: String
    system: String
}
type Query {
    _id: String
    url: String
    type: String
    additional_properties: AditionalProperties
    source: Source
    subtitle: String
    alt_text: String
}

`;

export default schema;
