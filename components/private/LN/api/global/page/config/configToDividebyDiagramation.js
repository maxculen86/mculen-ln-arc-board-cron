const configToDividebyDiagramation = layout => {
    const diagramation1 = 'grillaUltimasNoticias';
    const diagramation2 = 'left-focal';
    const diagramation3 = 'bn_6_timeline';
    const boxDiagramation = {
        'LN-acumulado': [diagramation1, diagramation2, diagramation3],
        'LN-Home_Main': [diagramation1, diagramation2, diagramation3],
        'LN-Home_Sports': [diagramation1, diagramation2, diagramation3],
        'LN10-Home_Main': [
            diagramation1,
            diagramation2,
            diagramation3,
            'opinion4',
            'opinion8'
        ]
    };

    return boxDiagramation[layout];
};

export default configToDividebyDiagramation;
