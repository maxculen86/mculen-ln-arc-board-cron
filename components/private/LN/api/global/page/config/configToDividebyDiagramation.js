const configToDividebyDiagramation = layout => {
    const boxDiagramation = {
        'LN-acumulado': ['grillaUltimasNoticias', 'left-focal'],
        'LN-Home_Main': ['grillaUltimasNoticias', 'left-focal'],
        'LN-Home_Sports': ['grillaUltimasNoticias', 'left-focal'],
        'LN10-Home_Main': [
            'grillaUltimasNoticias',
            'left-focal',
            'opinion4',
            'opinion8'
        ]
    };

    return boxDiagramation[layout];
};

export default configToDividebyDiagramation;
