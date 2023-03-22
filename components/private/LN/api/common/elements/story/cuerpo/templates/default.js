const defaultBody = (contentElements, components, storyId) => {
    return contentElements.reduce((res, current, index) => {
        const selectedComponent = components[current.type];
        if (selectedComponent) {
            return res.concat(selectedComponent(current, storyId));
        }
        return res;
    }, []);
};

export default defaultBody;
