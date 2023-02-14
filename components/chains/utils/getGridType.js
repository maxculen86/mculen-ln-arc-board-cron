const getGridType = layout => {
    const gridTypeBn8And4 = 'bn-4-8';

    const options = {
        bnGrilla8: gridTypeBn8And4,
        bnGrilla4: gridTypeBn8And4,
        'hash-1-2-2-2_grid': 'hash-1-2-2-2_grid'
    };

    return options[layout] || layout;
};

export default getGridType;
