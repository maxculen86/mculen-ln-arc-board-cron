export const emptyBox = (element, featureInfo) => {
    const { items } = element;
    return { items, ...featureInfo };
};

export default emptyBox;
