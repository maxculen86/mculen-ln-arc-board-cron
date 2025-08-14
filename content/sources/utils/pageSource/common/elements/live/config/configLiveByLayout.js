const boxPositionLN10Main = {
    element: {
        sectionAliasMobile: 'LN-common/LN10_En_Vivo'
    },
    bottomTo: {
        sectionAliasMobile: 'apertura'
    },
    upperTo: {
        sectionAliasMobile: 'dolar'
    }
};
const configBannerByLayout = layout => {
    const boxPositionsMerge = {
        'LN10-Home_Main': boxPositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configBannerByLayout;
