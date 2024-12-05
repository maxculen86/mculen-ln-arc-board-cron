import BackendError from '../../../../models/backendLnError';
import { enumTypeError } from '../../../../enums/enumTypeError';

export const errorHandling = (res, selectedComponent, current, storyId) => {
    try {
        const functElement = selectedComponent(current, storyId);
        return res.concat(functElement);
    } catch (error) {
        console.error(
            new BackendError(
                `Error .../templates/default.js - storyID: ${storyId} - selectedComponent: ${selectedComponent.name} - errorMsj: ${error.message} - content: ${JSON.stringify(current)}`,
                enumTypeError.storyContentError
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
