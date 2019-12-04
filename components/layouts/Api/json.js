const apiLayout = ({ children }) => {
    // Only return the data from the first child (body)
    return Array.isArray(children) ? children[0] : null;
};

apiLayout.sections = ['Body'];

export default apiLayout;
