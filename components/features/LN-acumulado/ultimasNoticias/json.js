const UltimasNoticias = props => {
    const { customFields } = props;
    //const { sections, layout, size } = customFields;
    customFields.layout = customFields.layout?.toLowerCase();

    return {
        information: customFields,
        articles: [{ additional_properties: {} }]
    };
};

UltimasNoticias.label = 'LN Acumulado Ultimas Noticias';

export default UltimasNoticias;
