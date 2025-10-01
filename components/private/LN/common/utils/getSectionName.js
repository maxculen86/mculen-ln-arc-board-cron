const getSectionName = ({ nodeType, type, canonicalUrl = '' }) => {
    const SECTIONS = {
        HOME: 'home',
        STORY: 'nota',
        ACUMULADO: 'acumulado',
        NODE_TYPES: ['section', 'tags', 'author', 'distributor']
    };

    // TODO: UNA VEZ ELIMINADO OTT, REFACTORIZAR PARA QUE SIEMPRE TOME LA FUNCION COMO JW
    const transformType = canonicalUrl.startsWith('/carrousel/')
        ? 'videoJw'
        : type;

    const options = {
        story: () => SECTIONS.STORY,
        checkNodeTypes: () =>
            SECTIONS.NODE_TYPES.includes(nodeType || type) &&
            SECTIONS.ACUMULADO,
        videoJw: () => transformType
    };

    return (
        (options[transformType] && options[transformType]()) ||
        options.checkNodeTypes() ||
        SECTIONS.HOME
    );
};

export default getSectionName;
