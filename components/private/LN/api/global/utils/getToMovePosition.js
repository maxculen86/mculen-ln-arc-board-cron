const boxMovePositionLNMain = {
    Anexo_1: { sectionWeb: 'Apertura_1', position: 'start' },
    Anexo_2: { sectionWeb: 'Apertura_1', position: 'bottom' }
};
const boxMovePositionLNAcumulado = {};
const boxMovePositionLNSports = {};
const getToMovePosition = layout => {
    const boxPositionsMerge = {
        'LN-acumulado': boxMovePositionLNAcumulado,
        'LN-Home_Main': boxMovePositionLNMain,
        'LN-Home_Sports': boxMovePositionLNSports
    };

    return boxPositionsMerge[layout];
};

export default getToMovePosition;
