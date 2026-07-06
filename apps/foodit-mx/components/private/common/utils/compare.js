const compare = (value1, value2, operator) => {
    const index = {
        '>': (a, b) => a > b,
        '<': (a, b) => a < b,
        '!==': (a, b) => a !== b
    };

    return index[operator] && index[operator](value1, value2);
};

export default compare;
