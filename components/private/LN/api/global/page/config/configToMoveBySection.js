const boxMovePositionLNMain = {
    App_Anexo_1: { sectionWeb: 'Apertura_1', position: 'start' },
    App_Anexo_2: { sectionWeb: 'Apertura_1', position: 'bottom' }
};
const boxMovePositionLNAcumulado = {};
const boxMovePositionLNSports = {};
const boxMovePositionLN10Main = {
    App_Anexo_1: { sectionWeb: 'Apertura', position: 'start' }
};

const configToMoveBySection = layout => {
    const boxPositionsMerge = {
        'LN-acumulado': boxMovePositionLNAcumulado,
        'LN-Home_Main': boxMovePositionLNMain,
        'LN-Home_Sports': boxMovePositionLNSports,
        'LN10-Home_Main': boxMovePositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configToMoveBySection;
