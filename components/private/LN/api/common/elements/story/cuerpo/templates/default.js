import { SITE_LANACION } from 'fusion:environment';
import BackendStructuredLog from '../../../../utils/backendStructuredLog';

export const errorHandling = (
    res,
    selectedComponent,
    current,
    storyId,
    storyUrl = null
) => {
    try {
        const functElement = selectedComponent(current, storyId);
        return res.concat(functElement);
    } catch (error) {
        console.warn(
            BackendStructuredLog(error.message, storyId, {
                url: `${SITE_LANACION}${storyUrl}`,
                content: current,
                error: {
                    message: error.message,
                    name: error.name,
                    stack: error.stack
                }
            })
        );
    }
    return res;
};

const defaultBody = (contentElements, components, storyId, storyUrl = null) =>
    contentElements.reduce((res, current) => {
        const selectedComponent = components[current.type];
        if (selectedComponent) {
            return errorHandling(
                res,
                selectedComponent,
                current,
                storyId,
                storyUrl
            );
        }
        return res;
    }, []);

export default defaultBody;
