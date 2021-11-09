const defaultBody = (contentElements, components, storyId) => {
    const resp = contentElements
        .filter(v => {
            const selectedComponent = components[v.type];
            if (selectedComponent) return true;
            return false;
        })
        .map(v => {
            const selectedComponent = components[v.type];
            const render = selectedComponent(v, storyId);
            return render;
        });

    return resp;
};

export default defaultBody;
