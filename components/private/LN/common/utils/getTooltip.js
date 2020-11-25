const getTooltip = (key, siteService) => {
    const { tooltips = [] } = siteService || {};
    const tooltipFinded = tooltips.find(t => t.text === key);
    return tooltipFinded;
};

export default getTooltip;
