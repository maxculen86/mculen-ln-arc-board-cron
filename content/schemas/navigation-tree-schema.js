const schema = `
type Section {
    _id: String
    _website: String
    name: String
    inactive: String
    node_type: String,
    children: [Section]
}
type Query {
    _id: String
    _website: String
    name: String
    node_type: String
    children: [Section]
}
`;

export default schema;
