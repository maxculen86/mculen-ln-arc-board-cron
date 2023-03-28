export const sectionAcuBox = element => {
    if (
        element &&
        element.sectionAccumulated &&
        element.sectionAccumulated.length > 0
    ) {
        return element.sectionAccumulated[0];
    }

    return null;
};

export default sectionAcuBox;
