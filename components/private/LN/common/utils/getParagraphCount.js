const getParagraphCount = (contentElements = []) =>
    contentElements.filter(contentElement =>
        ['text', 'image', 'oembed_response', 'video'].includes(
            contentElement.type
        )
    ).length;

export default getParagraphCount;
