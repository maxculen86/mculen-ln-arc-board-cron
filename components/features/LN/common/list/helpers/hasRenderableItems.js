const hasRenderableItems = items =>
    Array.isArray(items) &&
    items.some(
        item =>
            item.type === 'text' ||
            (item.type === 'list' && hasRenderableItems(item.items))
    );

export default hasRenderableItems;
