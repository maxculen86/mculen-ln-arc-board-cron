const replaceTagInTextListRaw = (contentElement, expresion) => {
    const regEx = new RegExp(expresion, 'gi');
    if (contentElement.type === 'text' || contentElement.type === 'raw_html') {
        return {
            ...contentElement,
            content: contentElement.content.replace(regEx, '')
        };
    }

    if (contentElement.type === 'list') {
        return {
            ...contentElement,
            items: contentElement.items.map(item => {
                if (item.type === 'text') {
                    return {
                        ...item,
                        content: item.content.replace(regEx, '')
                    };
                }
                return item;
            })
        };
    }

    return contentElement;
};

export default replaceTagInTextListRaw;
