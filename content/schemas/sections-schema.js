const schema = `
type OTT_Program{
    image_program_id: String
}
type Site{
    site_url: String
}
type Section{
    _id: String
    site: Site
    OTT_Program: [OTT_Program]
    _website: String
    name: String
    
    inactive: Bool
    node_type: String
}

type Query {
    q_results: [Section]
}`;

export default schema;
