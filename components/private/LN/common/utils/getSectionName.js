const getSectionName = ({ nodeType, type, arcSite, canonicalUrl = '' }) => {
    const SECTIONS = {
        HOME: 'home',
        STORY: 'nota',
        VIDEO: 'video',
        ACUMULADO: 'acumulado',
        NODE_TYPES: ['section', 'tags', 'author', 'distributor']
    };
    // TODO: limpieza OTT - Borrar en iteración 5 de 5 o ajustar logica
    // TODO: UNA VEZ ELIMINADO OTT, REFACTORIZAR PARA QUE SIEMPRE TOME LA FUNCION COMO JW
    const transformType = canonicalUrl.startsWith('/carrousel/')
        ? 'videoJw'
        : type;

    const options = {
        story: () => SECTIONS.STORY,
        // TODO: limpieza OTT - Borrar en iteración 5 de 5
        video: () => arcSite === 'ott' && SECTIONS.VIDEO,
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
