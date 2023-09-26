const boxPositionLN10Main = [
    { id: 2000, type: 5, sectionAliasMobile: 'Dolar', position: 'bottom' }
];
const boxPositionLNMain = [];
const boxPositionLNAcumulado = [];
const boxPositionLNSports = [];
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
