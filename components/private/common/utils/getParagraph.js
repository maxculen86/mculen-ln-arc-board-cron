const getParagraph = contentElement =>
    contentElement && contentElement[0] && contentElement[0].type === 'text'
        ? contentElement[0].content || ''
        : '';

export default getParagraph;
