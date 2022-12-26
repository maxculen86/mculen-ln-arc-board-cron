const checkHydrateOnly = ({ nodeType, layout }) => {
    const conditions = [
        layout === 'LN-Home_Main',
        ['distributor', 'section'].includes(nodeType)
    ];

    return conditions.some(Boolean);
};

export default checkHydrateOnly;
