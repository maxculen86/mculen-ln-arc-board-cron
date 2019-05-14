const schema = `
type SiteInfo {
    site_url: String
}
type Section {
    _id: String
    _website: String
    name: String
    inactive: String
    node_type: String
    site: SiteInfo
    display_name: String
    url: String
}
type Query {
    _id: String
    website: String
    name: String
    node_type: String
    children: [Section]
}
`;

export default schema;
