const getTooltip = (key, siteService) => {
    const { tooltips = [] } = siteService || {};
    return tooltips.find(t => t.text === key);
};

export default getTooltip;
