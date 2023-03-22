const AperturaFeature = props => {
    const { customFields } = props;
    customFields.layout = customFields.layout?.toLowerCase();

    return {
        information: customFields,
        articles: [{ additional_properties: {} }]
    };
};

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default AperturaFeature;
