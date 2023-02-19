import {
    setSlicedChildren,
    validateChildrensApi
} from '../../../../../../../../chains/utils/common/_helpers-WebApi';

export const respChildrens = props => {
    const {
        children,
        customFields: { layout }
    } = props;

    if (!validateChildrensApi(children)) {
        return null;
    }
    const slicedChildrenInitial = setSlicedChildren({
        children, // or children.filter(c => c != null),
        config: { layout, countTimeline: true }
    });
    return slicedChildrenInitial;
};

export default respChildrens;
