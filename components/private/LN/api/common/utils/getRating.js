import get from '../../../../common/utils/get';

const getRating = article => {
    const elements = get(article, 'content_elements', []);

    const ratingElement = elements.find(
        el => typeof el.numeric_rating === 'number'
    );

    const value = ratingElement?.numeric_rating;

    if (!ratingElement || value === 0) return null;

    const rounded = Math.round(value * 2) / 2;

    return rounded < 0.5 ? 0.5 : rounded;
};

export default getRating;
