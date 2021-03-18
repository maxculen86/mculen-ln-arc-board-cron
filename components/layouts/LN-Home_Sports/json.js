const LNMainHome = ({ children }) => {
    // Only return the data from the first child (body)
    return Array.isArray(children) ? children : null;
};

LNMainHome.sections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Cabezal',
    'Apertura',
    'Cuerpo',
    'Aside'
];

export default LNMainHome;
