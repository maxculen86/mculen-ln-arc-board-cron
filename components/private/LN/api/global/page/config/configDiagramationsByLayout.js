import LN10HomeMainDiagramation from '../../../../../../layouts/config/api-diagramations/LN10-Home_Main.json';
import LNHomeMainDiagramation from '../../../../../../layouts/config/api-diagramations/LN-Home_Main.json';

const configDiagramationsByLayout = layout => {
    const boxDiagramationsMerge = {
        'LN-acumulado': {},
        'LN-Home_Main': LNHomeMainDiagramation,
        'LN-Home_Sports': {},
        'LN10-Home_Main': LN10HomeMainDiagramation
    };

    return boxDiagramationsMerge[layout];
};

export default configDiagramationsByLayout;
