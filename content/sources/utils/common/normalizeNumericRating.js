const normalizeNumericRating = value => {
    if (typeof value !== 'number' || Number.isNaN(value)) return value;

    const adjusted = Math.max(value, 0.5);

    return Math.round(adjusted * 2) / 2;
};

export const normalizeNumericRatingElements = (elements = []) =>
    elements.map(element =>
        typeof element?.numeric_rating === 'number'
            ? {
                  ...element,
                  numeric_rating: normalizeNumericRating(element.numeric_rating)
              }
            : element
    );

export default normalizeNumericRating;
