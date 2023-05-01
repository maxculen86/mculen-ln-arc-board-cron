const boxPositionLN10Main = {
    hashtag: {
        type: 0,
        sectionAliasMobile: 'ranking',
        position: 'bottom'
    }
};
const configRankingPositionbySection = layout => {
    const boxPositionsMerge = {
        'LN10-Home_Main': boxPositionLN10Main
    };

    return boxPositionsMerge[layout];
};

export default configRankingPositionbySection;
