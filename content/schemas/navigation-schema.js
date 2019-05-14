const schema = `
type SiteInfo {
    site_url: String
}
type OTT_Program{
    image_program_id: String
    small_image_program_id: String
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
    OTT_Program: OTT_Program

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
