const calculatePaginationValue = (acumuladoTotal, size, page) => {
    if (acumuladoTotal < size) {
        size = acumuladoTotal;
    }

    const numberOfPages = acumuladoTotal / size;

    return page < numberOfPages;
};

export default calculatePaginationValue;
