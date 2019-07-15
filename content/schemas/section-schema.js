const schema = `
type OTT_Program{
    image_program_id: String
}
type Site{
    site_url: String
}

type Query {
    _id: String
    OTT_Program: [OTT_Program]
    site: Site
    _website: String
    name: String
    inactive: Bool
    type: String
    node_type: String
}`;

export default schema;
