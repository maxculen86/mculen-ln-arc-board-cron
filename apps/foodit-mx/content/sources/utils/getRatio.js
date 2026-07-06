const addAspectRatioUsingCalcHeight = (width = 1) => {
    const widthResult = width / 3;
    const heightResult = widthResult * 2;
    return parseInt(Math.round(heightResult * 100) / 100, 10);
};

// Calcule greatest common divisor
const gcd = (a, b) => {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
};

// setea las medidas para que el resizer cropee en 3:2
export const addAspectRatio = (items = []) =>
    items.map(item => ({
        ...item,
        height: addAspectRatioUsingCalcHeight(item.width),
        isNotSmart: true
    }));

// Get aspect ratio from width and height
export const getAspectRatio = (width, height) => {
    const greatestCommonDivisor = gcd(width, height);
    return width && height && greatestCommonDivisor
        ? `${width / greatestCommonDivisor}:${height / greatestCommonDivisor}`
        : null;
};

export default {
    addAspectRatio,
    getAspectRatio
};
