export const boxInfoBasic = (information, section, typeSection) => {
    if (!information) return null;
    const sectionAlias = section && section.toLowerCase();
    const type = typeSection[sectionAlias] || typeSection.default;

    const boxInfo = {
        ...type,
        diagramacion: information.layout || null
    };
    return boxInfo;
};
export default boxInfoBasic;
