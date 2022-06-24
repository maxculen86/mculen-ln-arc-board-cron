const orderElements = (elemA, elemB) => {
    if (elemA > elemB) {
        return 1;
    }
    if (elemA < elemB) {
        return -1;
    }
    // a must be equal to b
    return 0;
};

export default orderElements;
