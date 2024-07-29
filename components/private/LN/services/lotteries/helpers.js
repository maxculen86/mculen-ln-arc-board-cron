export const removeEmptyElements = inputArray => {
    if (Array.isArray(inputArray)) {
        return inputArray.filter(element => !element.match(/-/));
    }

    return inputArray;
};
