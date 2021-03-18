const LNMainHome = ({ children }) => {
    // Only return the data from the first child (body)
    return Array.isArray(children) ? children : null;
};

LNMainHome.sections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Apertura',
    'Anexo-2',
    'Breaking-1',
    'Breaking-2',
    'Breaking-3',
    'Anexo-3',
    'Opinion',
    'Breaking-4',
    'Breaking-5',
    'Comercial-1',
    'Bloque-2',
    'Comercial-2',
    'Bloque-3',
    'Bloque-4',
    'Bloque-5',
    'Bloque-6',
    'Bloque-7',
    'Bloque-8',
    'Aside'
];

export default LNMainHome;
