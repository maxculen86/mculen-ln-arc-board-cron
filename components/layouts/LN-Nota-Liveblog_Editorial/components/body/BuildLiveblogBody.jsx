import { bodyElementRules } from '../../../../features/LN-nota/body/_utils/_bodyElementRules';
import { transformEmbedScript } from '../../../../features/LN-nota/body/_utils/_embedHelper';
import {
    setDataComponent,
    setExtraProps
} from '../../../../features/LN-nota/body/_utils/helpers';
import get from '../../../../private/common/utils/get';
import { supportedTypesLiveblog } from '../../_helpers/liveblogEditorialBody';

const BuildLiveblogBody = ({
    groupedElements = [],
    outputType,
    globalContent = {}
}) => {
    const {
        headlines: { basic: tituloNota } = {},
        subtype = '',
        withSponsoredLink
    } = globalContent;

    return groupedElements.map((element, currentIndex) => {
        const newElement = element.subtype
            ? transformEmbedScript(element)
            : element;

        const nodeType = get(newElement, 'additional_properties.nodeType', {});
        const Component = bodyElementRules({
            element: newElement,
            outputType,
            subtype
        });

        const arcType = get(Component, 'arcType', '');

        const extraProps = setExtraProps({
            tituloNota,
            globalContent,
            contentElements: groupedElements,
            withSponsoredLink
        });

        const ComponentWithProps = setDataComponent({
            Component,
            extraProps,
            element,
            currentIndex,
            outputType,
            arcType
        });

        return Component &&
            supportedTypesLiveblog.includes(Component.arcType) &&
            !nodeType.length
            ? ComponentWithProps
            : null;
    });
};

export default BuildLiveblogBody;
