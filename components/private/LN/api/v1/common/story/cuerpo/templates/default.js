const defaultBody = (contentElements, components, storyId) => {
    return contentElements
        .filter(v => {
            const selectedComponent = components[v.type];
            if (selectedComponent) return true;
            return false;
        })
        .map(v => {
            const selectedComponent = components[v.type];
            return selectedComponent(v, storyId);
        });
};

export default defaultBody;
