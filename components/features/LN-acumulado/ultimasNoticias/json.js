const UltimasNoticias = props => {
    const { customFields } = props;
    customFields.layout = customFields.layout?.toLowerCase();

    return {
        information: customFields,
        articles: [{ additional_properties: {} }]
    };
};

UltimasNoticias.label = 'LN Acumulado Ultimas Noticias';

export default UltimasNoticias;
