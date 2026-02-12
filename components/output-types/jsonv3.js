// Only return the data from the first child.
const jsonV3 = ({ children }) =>
    Array.isArray(children) ? children[0] : children || null;

jsonV3.contentType = 'application/json';
jsonV3.fallback = ['jsonv2', 'json', 'default'];

export default jsonV3;
