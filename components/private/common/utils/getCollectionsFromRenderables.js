const getCollectionsFromRenderables = (renderables, collection) =>
    renderables
        .filter(item => item.collection === collection)
        .map(item => item.type);

export default getCollectionsFromRenderables;
