export const dolarBox = (element, typeSection) => {
    const alias =
        element &&
        element.sectionAliasMobile &&
        element.sectionAliasMobile.toLowerCase();
    const type = typeSection[alias];
    return {
        ...type,
        idSeccion: element.id,
        tituloCaja: 'Cotización hoy',
        url: 'https://www.lanacion.com.ar/economia/dolar/',
        parameters: {
            title: 'Cotización hoy',
            url: 'https://www.lanacion.com.ar/economia/dolar/'
        }
    };
};

export default dolarBox;
