const boxPositionLN10Main = {
    'ln-common/ln10_editorial': {
        type: 4,
        sectionAliasMobile: 'Title',
        parameterSectionToClone: 'ln-common/ln10_opinion',
        position: 'start'
    }
};
const configTitlePositionbySection = layout => {
    const boxPositionsMerge = {
        'LN10-Home_Main': boxPositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configTitlePositionbySection;
