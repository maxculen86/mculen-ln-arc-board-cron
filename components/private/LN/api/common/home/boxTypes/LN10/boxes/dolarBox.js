export const dolarBox = (element, typeSection) => {
    const alias =
        element &&
        element.sectionAliasMobile &&
        element.sectionAliasMobile.toLowerCase();
    const type = typeSection[alias];
    return {
        ...type,
        idSeccion: element.id,
        tituloCaja: 'COTIZACIÓN HOY',
        url: 'https://www.lanacion.com.ar/economia/dolar/',
        parameters: {
            title: 'COTIZACIÓN HOY',
            url: 'https://www.lanacion.com.ar/economia/dolar/'
        }
    };
};

export default dolarBox;
