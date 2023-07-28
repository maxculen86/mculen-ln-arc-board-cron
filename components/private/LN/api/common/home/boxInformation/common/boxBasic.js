export const boxInfoBasic = (information, section, typeSection) => {
    if (!information) return null;
    const sectionAlias = section && section.toLowerCase();
    const type = typeSection[sectionAlias] || typeSection.default;

    return {
        ...type,
        diagramacion: information.layout || null
    };
};
export default boxInfoBasic;
