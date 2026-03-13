const getElementsText = (contentElements = []) => {
    if (!contentElements) {
        return '';
    }
    return contentElements?.reduce((accumulator, item) => {
        if (item.type === 'text') {
            const cleanText = item.content.replace(/<\/?[^>]+(>|$)/g, '');
            return accumulator ? `${accumulator} ${cleanText}` : cleanText;
        }

        return accumulator;
    }, '');
};

export default getElementsText;
