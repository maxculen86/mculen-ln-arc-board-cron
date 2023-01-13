import LN10HomeMainDiagramation from '../../../../../layouts/config/api-diagramations/LN10-Home_Main.json';
import LNHomeMainDiagramation from '../../../../../layouts/config/api-diagramations/LN-Home_Main.json';

const getDiagramations = layout => {
    const boxPositionsMerge = {
        'LN-acumulado': {},
        'LN-Home_Main': LNHomeMainDiagramation,
        'LN-Home_Sports': {},
        'LN10-Home_Main': LN10HomeMainDiagramation
    };

    return boxPositionsMerge[layout];
};

export default getDiagramations;
