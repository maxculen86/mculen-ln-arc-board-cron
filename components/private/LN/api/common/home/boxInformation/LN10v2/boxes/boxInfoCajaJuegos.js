export const boxInfoCajaJuegos = (information, section, typeSection) => {
    const sectionAlias = section && section.toLowerCase();
    const type = typeSection[sectionAlias] || typeSection.default;

    if (information && !information.hideTitle) {
        return {
            ...type,
            parameters: {
                title: 'Juegos',
                url: information.link,
                logoId: information?.logoId
            }
        };
    }
    return null;
};
