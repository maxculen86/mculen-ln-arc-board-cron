import BackendError from '../../../../models/backendLnError';

export const errorHandling = (res, selectedComponent, current, storyId) => {
    try {
        const functElement = selectedComponent(current, storyId);
        return res.concat(functElement);
    } catch (error) {
        console.warn(
            new BackendError(
                `Error .../templates/default.js - storyID: ${storyId} - selectedComponent: ${selectedComponent.name} - errorMsj:${error.message}`
            )
        );
    }
    return res;
};

const defaultBody = (contentElements, components, storyId) =>
    contentElements.reduce((res, current) => {
        const selectedComponent = components[current.type];
        if (selectedComponent) {
            return errorHandling(res, selectedComponent, current, storyId);
        }
        return res;
    }, []);

export default defaultBody;
