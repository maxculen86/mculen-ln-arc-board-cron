/* eslint-disable import/prefer-default-export */

export const getDimsFromSiteService = config => slotGroup => finalSlot => {
    if (!config || !slotGroup) return null;

    const position = config.find(
        item => item.adunit === `${slotGroup}_${finalSlot}`
    );
    if (!position || !position.dimensions || position.dimensions === '')
        return null;
    const dimensions = position.dimensions.split(',');
    return dimensions.map(dimension =>
        dimension.split('x').map(size => parseInt(size, 10))
    );
};

export const getSlotForDevice = device => slots =>
    slots.find(slot => slot.name === device)
        ? slots.find(slot => slot.name === device).slot || null
        : null;

export const isPrimarySectionInBannerSegments = primarySection => segments => {
    if (!segments || !primarySection) return [false, null];

    const base = primarySection.split('/').filter(Boolean);
    const section = base.find(x => segments.includes(x)) || base.shift();
    const included = segments.includes(section);

    return [included, section];
};
