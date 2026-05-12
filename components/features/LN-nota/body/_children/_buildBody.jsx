import { supportedTypes } from '../_utils/_bodyRules';
import { createComponentProps } from '../_utils/buildBodyCommon';
import {
    renderElement,
    createElementProps,
    shouldCountElementForBanners
} from '../_utils/renderHelpers';

const BuildBody = ({
    banners = [],
    outputType,
    globalContent = {},
    groupedElements,
    supportedTypesOverride,
    useCapitalIndex = true,
    bodyComponents,
    ruleConditions,
    dynamicBanners,
    currentDevice,
    onDynamicBannersGoogletagConfig,
    layout
}) => {
    const elements = groupedElements || globalContent.content_elements;
    const finalSupportedTypes = supportedTypesOverride || supportedTypes;
    const { subtype = '' } = globalContent;

    const elementProps = createElementProps(
        globalContent,
        elements,
        useCapitalIndex
    );
    const counter = { current: 0 };
    const bannerCounter = { current: 0 };

    return elements.map((element, currentIndex) => {
        const renderedElement = renderElement(
            element,
            currentIndex,
            elementProps,
            outputType,
            subtype,
            finalSupportedTypes,
            banners,
            globalContent,
            elements,
            counter,
            bannerCounter,
            createComponentProps,
            bodyComponents,
            ruleConditions,
            dynamicBanners,
            currentDevice,
            onDynamicBannersGoogletagConfig,
            layout
        );

        if (
            shouldCountElementForBanners({
                renderedElement,
                banners,
                dynamicBanners,
                element,
                supportedTypes: finalSupportedTypes
            })
        ) {
            counter.current += 1;
        }

        return renderedElement;
    });
};

export default BuildBody;
