const boxPositionLN10Main = {
    Hashtag: {
        type: 0,
        sectionAliasMobile: 'ranking',
        position: 'bottom'
    },
    Content: {
        type: 0,
        sectionAliasMobile: 'ranking',
        position: 'start'
    },
    Canales_1: {
        type: 0,
        sectionAliasMobile: 'ranking',
        position: 'start'
    }
};
const configRankingPositionbySection = layout => {
    const boxPositionsMerge = {
        'LN10-Home_Main': boxPositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configRankingPositionbySection;
