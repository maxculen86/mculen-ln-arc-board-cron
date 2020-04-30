const getCreditsTitle = data => {
    const { credits: creditsObj = {} } = data || {};
    const { by = [] } = creditsObj;

    let credits = by ? 'Crédito' : '';
    credits = `${credits}${by.length > 1 ? 's' : ''}`;

    return credits;
};

export default getCreditsTitle;
