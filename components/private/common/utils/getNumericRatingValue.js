import get from './get';

const getNumericRatingValue = (contentElements = []) => {
    if (!Array.isArray(contentElements)) return null;

    const numericRatingElement = contentElements.find(
        element => element?.type === 'numeric_rating'
    );

    return get(numericRatingElement, 'numeric_rating', null);
};

export default getNumericRatingValue;
