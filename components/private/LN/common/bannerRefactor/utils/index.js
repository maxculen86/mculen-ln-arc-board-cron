/* eslint-disable import/prefer-default-export */

export const getDimsFromSiteService = config => slotGroup => finalSlot => {
    if (!config || !slotGroup) return null;
    const position = config[`${slotGroup}_${finalSlot}`];
    if (!position) return null;
    const dimensions = position.split(',');
    return dimensions.map(dimension =>
        dimension.split('x').map(size => parseInt(size, 10))
    );
};
