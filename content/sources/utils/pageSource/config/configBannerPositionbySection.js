const boxPositionLN10Main = {
    Apertura: {
        id: 502,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    Pre_Apertura: {
        id: 501,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
};
const boxPositionLNMain = {
    Apertura_1: {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    Apertura_2: {
        id: 2000,
        type: 1,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    },
    Breaking_1: {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    Breaking_2: {
        id: 404,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    Breaking_3: {
        id: 405,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    Opinion: {
        id: 406,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
};
const boxPositionLNAcumulado = {
    'Pre-Apertura': {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    Apertura: {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    }
};
const boxPositionLNSports = {
    Apertura_1: {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    Apertura_2: {
        id: 2000,
        type: 1,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    },
    Breaking_1: {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    Breaking_2: {
        id: 404,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    Breaking_3: {
        id: 405,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    Opinion: {
        id: 406,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
};
const configBannerPositionbySection = layout => {
    const boxPositionsMerge = {
        'LN-acumulado': boxPositionLNAcumulado,
        'LN-Home_Main': boxPositionLNMain,
        'LN-Home_Sports': boxPositionLNSports,
        'LN10-Home_Main': boxPositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configBannerPositionbySection;
