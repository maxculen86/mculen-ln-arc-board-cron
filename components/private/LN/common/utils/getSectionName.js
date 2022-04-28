export default function({ nodeType, type, arcSite }) {
    const SECTIONS = {
        HOME: 'home',
        STORY: 'nota',
        VIDEO: 'video',
        ACUMULADO: 'acumulado',
        NODE_TYPES: ['section', 'tags', 'author', 'distributor']
    };

    const options = {
        story: () => SECTIONS.STORY,
        video: () => arcSite === 'ott' && SECTIONS.VIDEO,
        checkNodeTypes: () =>
            SECTIONS.NODE_TYPES.includes(nodeType || type) && SECTIONS.ACUMULADO
    };

    return (
        (options[type] && options[type]()) ||
        options.checkNodeTypes() ||
        SECTIONS.HOME
    );
}
