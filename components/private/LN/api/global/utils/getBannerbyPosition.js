const boxPositionLNMain = {
    1: {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    3: {
        id: 2000,
        type: 1,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    },
    5: {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    7: {
        id: 404,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    10: {
        id: 405,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    13: {
        id: 406,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
};
const boxPositionLNAcumulado = {
    0: {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    2: {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    }
};
const boxPositionLNSports = {
    0: {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    1: {
        id: 2000,
        type: 1,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    },
    2: {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    3: {
        id: 404,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    5: {
        id: 405,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    7: {
        id: 406,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
};
const getBannerbyPosition = layout => {
    const boxPositionsMerge = {
        'LN-acumulado': boxPositionLNAcumulado,
        'LN-Home_Main': boxPositionLNMain,
        'LN-Home_Sports': boxPositionLNSports,
        'LN10-Home_Main': boxPositionLNMain
    };

    return boxPositionsMerge[layout];
};

export default getBannerbyPosition;
