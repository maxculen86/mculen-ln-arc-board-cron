const configToDividebyDiagramation = layout => {
    const diagramation1 = 'grillaUltimasNoticias';
    const diagramation2 = 'left-focal';
    const boxDiagramation = {
        'LN-acumulado': [diagramation1, diagramation2],
        'LN-Home_Main': [diagramation1, diagramation2],
        'LN-Home_Sports': [diagramation1, diagramation2],
        'LN10-Home_Main': [diagramation1, diagramation2, 'opinion4', 'opinion8']
    };

    return boxDiagramation[layout];
};

export default configToDividebyDiagramation;
