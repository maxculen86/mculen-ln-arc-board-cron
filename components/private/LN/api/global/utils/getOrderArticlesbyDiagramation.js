const boxMoveArticlesPositionLNMain = {};
const boxMoveArticlesPositionLNAcumulado = {};
const boxMoveArticlesPositionLNSports = {};
const boxMoveArticlesPositionLN10Main = {
    bn2Focal1Mas2: [{ keyFrom: 'T3', keyTo: 'T1' }],
    grilla3: [{ keyFrom: 'T3', keyTo: 'T1' }]
};

const getOrderArticlesbyDiagramation = layout => {
    const boxPositionsArticlesMerge = {
        'LN-acumulado': boxMoveArticlesPositionLNAcumulado,
        'LN-Home_Main': boxMoveArticlesPositionLNMain,
        'LN-Home_Sports': boxMoveArticlesPositionLNSports,
        'LN10-Home_Main': boxMoveArticlesPositionLN10Main
    };

    return boxPositionsArticlesMerge[layout];
};

export default getOrderArticlesbyDiagramation;
