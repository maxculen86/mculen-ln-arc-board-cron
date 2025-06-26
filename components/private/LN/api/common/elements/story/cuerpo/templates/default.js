import { SITE_LANACION } from 'fusion:environment';
import { enumTypeError } from '../../../../enums/enumTypeError';
import get from '../../../../../../../common/utils/get';

export const errorHandling = (
    res,
    selectedComponent,
    current,
    storyId,
    dataNota
) => {
    try {
        const functElement = selectedComponent(current, storyId);
        return res.concat(functElement);
    } catch (error) {
        const canonicalUrl = get(dataNota, 'canonical_url', null);
        const storyCreatedDate = get(dataNota, 'created_date', null);
        const storyDisplayDate = get(dataNota, 'display_date', null);
        console.warn(
            JSON.stringify(
                {
                    name: 'BackendLnWarn',
                    customErrorType: 'BackendLnWarn',
                    customType: enumTypeError.storyContentError,
                    log_details: {
                        message: error.message,
                        reference_id: storyId,
                        storyUrl: `${SITE_LANACION}${canonicalUrl}`,
                        content: current,
                        storyCreatedDate,
                        storyDisplayDate
                    }
                },
                null,
                2
            )
        );
    }
    return res;
};

const defaultBody = (contentElements, components, storyId, dataNota) =>
    contentElements.reduce((res, current) => {
        const selectedComponent = components[current.type];
        if (selectedComponent) {
            return errorHandling(
                res,
                selectedComponent,
                current,
                storyId,
                dataNota
            );
        }
        return res;
    }, []);

export default defaultBody;
