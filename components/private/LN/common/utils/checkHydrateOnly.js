const checkHydrateOnly = ({ nodeType, layout }) => {
    const conditions = [
        ['LN-Home_Main', 'LN10-Home_Main'].includes(layout),
        ['distributor', 'section'].includes(nodeType)
    ];

    return conditions.some(Boolean);
};

export default checkHydrateOnly;
