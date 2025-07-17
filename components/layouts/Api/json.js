// Only return the data from the first child (body)
const apiLayout = ({ children }) =>
    Array.isArray(children) ? children[0] : null;

apiLayout.sections = ['Body'];

export default apiLayout;
