const apiJson = ({ children }) => {
    // Only return the data from the first child.
    return Array.isArray(children) ? children[0] : null;
};

// Specify content type
apiJson.contentType = 'application/json';

export default apiJson;
