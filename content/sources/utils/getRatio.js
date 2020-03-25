const addAspectRatioUsingCalcHeight = (width = 1) => {
    const widthResult = width / 3;
    const heightResult = widthResult * 2;
    const height = parseFloat(Math.round(heightResult * 100) / 100);
    return height;
};

// setea las medidas para que el resizer cropee en 3:2
const addAspectRatio = (items = []) =>
    items.sizes.map(item => ({
        ...item,
        height: addAspectRatioUsingCalcHeight(item.width)
    }));

export default addAspectRatio;
