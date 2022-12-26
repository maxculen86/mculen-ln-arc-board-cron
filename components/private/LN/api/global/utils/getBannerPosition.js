const boxPositionLNMain = {
    Apertura_1: { id: 402, type: 1, feature: 'Banner', position: 'bottom' },
    Apertura_2: { id: 2000, type: 1, feature: 'Dolar', position: 'bottom' },
    Breaking_1: { id: 403, type: 1, feature: 'Banner', position: 'start' },
    Breaking_2: { id: 404, type: 1, feature: 'Banner', position: 'start' },
    Breaking_3: { id: 405, type: 1, feature: 'Banner', position: 'start' },
    Opinion: { id: 406, type: 1, feature: 'Banner', position: 'start' }
};
const boxPositionLNAcumulado = {
    'Pre-Apertura': { id: 402, type: 1, feature: 'Banner', position: 'start' },
    Apertura: { id: 403, type: 1, feature: 'Banner', position: 'bottom' }
};
const boxPositionLNSports = {
    Apertura_1: { id: 402, type: 1, feature: 'Banner', position: 'bottom' },
    Apertura_2: { id: 2000, type: 1, feature: 'Dolar', position: 'bottom' },
    Breaking_1: { id: 403, type: 1, feature: 'Banner', position: 'start' },
    Breaking_2: { id: 404, type: 1, feature: 'Banner', position: 'start' },
    Breaking_3: { id: 405, type: 1, feature: 'Banner', position: 'start' },
    Opinion: { id: 406, type: 1, feature: 'Banner', position: 'start' }
};
const getBannerPosition = layout => {
    const boxPositionsMerge = {
        'LN-acumulados': boxPositionLNAcumulado,
        'LN-Home_Main': boxPositionLNMain,
        'LN-Home_Sports': boxPositionLNSports
    };

    return boxPositionsMerge[layout];
};

export default getBannerPosition;
