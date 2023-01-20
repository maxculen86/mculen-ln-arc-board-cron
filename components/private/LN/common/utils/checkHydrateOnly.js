const checkHydrateOnly = ({ nodeType, layout }) => {
    const conditions = [
        ['LN-Home_Main', 'LN10-Home_Main'].includes(layout),
        ['distributor', 'section', 'tags', 'author'].includes(nodeType)
    ];

    return conditions.some(Boolean);
};

export default checkHydrateOnly;
