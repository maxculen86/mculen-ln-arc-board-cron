// Only return the data from the first child.
const jsonV4 = ({ children }) =>
    Array.isArray(children) ? children[0] : children || null;

jsonV4.contentType = 'application/json';
jsonV4.fallback = ['jsonv3', 'jsonv2', 'json', 'default'];

export default jsonV4;
