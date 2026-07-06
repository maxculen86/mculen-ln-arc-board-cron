import get from './get';
import { getChildsFromSections } from '../../LN/common/utils/homeHelper-WebApi';

const getElementFromRenderables = ({
    position,
    config,
    typeElement,
    renderables = [],
    propNameHide = 'hideCaja'
} = {}) =>
    (renderables.length &&
        getChildsFromSections(get(config, position) + 1, renderables).filter(
            element =>
                !get(element, `props.customFields.${propNameHide}`, false) &&
                get(element, 'type', null) === typeElement
        )[0]) ||
    null;

export default getElementFromRenderables;
