// Only return the data from the first child.
const opening = ({ children }) =>
    Array.isArray(children) ? children[0] : children || null;

opening.contentType = 'application/json';
opening.fallback = ['jsonv2', 'json'];

export default opening;
