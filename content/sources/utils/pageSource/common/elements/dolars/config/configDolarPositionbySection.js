const boxPositionLN10Main = {
    Apertura: {
        id: 2000,
        type: 5,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    }
};
const configDolarPositionbySection = layout => {
    const boxPositionsMerge = {
        'LN10-Home_Main': boxPositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configDolarPositionbySection;
