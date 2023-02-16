import get from '../../../../../../../common/utils/get';
import { setSlicedChildren } from '../../../../../../../../chains/utils/common/_helpers-WebApi';

export const respChildrens = props => {
    const {
        children,
        customFields: { layout }
    } = props;
    // const len = children.filter(c => c != null);

    if (
        children &&
        Array.isArray(children) &&
        children.filter(c => c === null).length === children.length
    ) {
        return null;
    }
    /*     const childrensKeys = children.map(c => {
        return { key: get(c, 'additionalProperties.idRender', null) };
    });

    const features = setFilteredRenderables(
        renderables,
        childrensKeys.filter(k => k.idRender != null)
    );
    const featuredChildren =
        setWrappedChildrenApi(features, childrensKeys) || []; */
    const slicedChildrenInitial = setSlicedChildren({
        children: children.filter(c => c != null),
        config: { layout, countTimeline: true }
    });
    return slicedChildrenInitial;
};

export default respChildrens;
