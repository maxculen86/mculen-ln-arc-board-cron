const getGridType = layout => {
    const gridTypeBn8And4 = 'bn-4-8';

    const options = {
        bnGrilla8: gridTypeBn8And4,
        bnGrilla4: gridTypeBn8And4
    };

    return options[layout] || layout;
};

export default getGridType;
