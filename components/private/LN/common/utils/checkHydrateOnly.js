const checkHydrateOnly = ({ nodeType, layout }) => {
    const conditions = [
        layout === 'LN-Home_Main',
        layout === 'LN10-Home_Main',
        nodeType === 'distributor'
    ];

    return conditions.some(Boolean);
};

export default checkHydrateOnly;
