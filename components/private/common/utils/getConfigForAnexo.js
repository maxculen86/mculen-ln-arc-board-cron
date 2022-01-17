const getConfigForAnexo = (anexoData = '') => {
    const anexoConfigElements = anexoData.replace(/ /g, '').split('|', 2) || [];
    const anexoUrl = anexoConfigElements[0] || '';
    const anexoHeight = anexoConfigElements[1] || '';

    return {
        anexoUrl,
        anexoHeight
    };
};

export default getConfigForAnexo;
