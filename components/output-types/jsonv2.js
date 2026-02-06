// Only return the data from the first child.
const jsonV2 = ({ children }) =>
    Array.isArray(children) ? children[0] : children || null;

jsonV2.contentType = 'application/json';
jsonV2.fallback = ['json', 'default'];

export default jsonV2;
