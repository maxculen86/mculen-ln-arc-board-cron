const checkHydrateOnly = ({ nodeType, layout }) => {
    const conditions = [
        layout === 'LN-Home_Main',
        nodeType === 'distributor',
        nodeType === 'section'
    ];

    return conditions.some(Boolean);
};

export default checkHydrateOnly;
