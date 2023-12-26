export const boxInfoCajaJuegos = (information, section, typeSection) => {
    const sectionAlias = section && section.toLowerCase();
    const type = typeSection[sectionAlias] || typeSection.default;

    if (information && !information.hideTitle) {
        return {
            ...type,
            parameters: {
                title: 'Juegos',
                url: 'https://www.lanacion.com.ar/juegos/'
            }
        };
    }
    return box;
};
