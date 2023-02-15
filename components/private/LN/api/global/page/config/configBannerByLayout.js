const boxPositionLN10Main = [
    {
        id: 801,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    {
        id: 802,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
];
const boxPositionLNMain = [
    {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    {
        id: 2000,
        type: 1,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    },
    {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        id: 404,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        id: 405,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        id: 406,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
];
const boxPositionLNAcumulado = [
    {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    }
];
const boxPositionLNSports = [
    {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    {
        id: 2000,
        type: 1,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    },
    {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        id: 404,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        id: 405,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        id: 406,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    }
];
const configBannerByLayout = layout => {
    const boxPositionsMerge = {
        'LN-acumulado': boxPositionLNAcumulado,
        'LN-Home_Main': boxPositionLNMain,
        'LN-Home_Sports': boxPositionLNSports,
        'LN10-Home_Main': boxPositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configBannerByLayout;
