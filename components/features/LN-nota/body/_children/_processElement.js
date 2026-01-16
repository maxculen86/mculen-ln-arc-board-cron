import { bodyElementRules } from '../_utils/_bodyElementRules';
import { transformEmbedScript } from '../_utils/_embedHelper';
import get from '../../../../private/common/utils/get';

export const processElement = (
    element,
    outputType,
    subtype,
    bodyComponents,
    ruleConditions
) => {
    const processedElement = element.subtype
        ? transformEmbedScript(element)
        : element;
    const nodeType = get(
        processedElement,
        'additional_properties.nodeType',
        {}
    );
    const Component = bodyElementRules({
        element: processedElement,
        outputType,
        subtype,
        bodyComponents,
        ruleConditions
    });

    return { processedElement, nodeType, Component };
};
