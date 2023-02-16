import { setSlicedChildren } from '../../../../../../../../chains/utils/common/_helpers-WebApi';

export const respChildrens = props => {
    const {
        children,
        customFields: { layout }
    } = props;

    if (
        children &&
        Array.isArray(children) &&
        children.filter(c => c === null).length === children.length
    ) {
        return null;
    }

    const slicedChildrenInitial = setSlicedChildren({
        children: children.filter(c => c != null),
        config: { layout, countTimeline: true }
    });
    return slicedChildrenInitial;
};

export default respChildrens;
