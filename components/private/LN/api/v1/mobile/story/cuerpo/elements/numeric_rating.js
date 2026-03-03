export default element => {
    if (!element || element.numeric_rating == null) return null;

    const value = element.numeric_rating;

    if (value === 0) return null;

    const rounded = Math.round(value * 2) / 2;

    return {
        _t: 'numeric_rating',
        value: rounded < 0.5 ? 0.5 : rounded,
        units: element.units || 'stars'
    };
};