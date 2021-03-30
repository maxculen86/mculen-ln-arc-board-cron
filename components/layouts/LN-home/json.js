const LNHome = ({ children }) => {
    // Only return the data from the first child (body)
    return Array.isArray(children) ? children : null;
};

LNHome.sections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside'
];

export default LNHome;