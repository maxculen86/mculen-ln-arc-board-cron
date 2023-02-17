import {
    setSlicedChildren,
    validateChildrensApi
} from '../../../../../../../../chains/utils/common/_helpers-WebApi';

export const respChildrens = props => {
    const {
        children,
        customFields: { layout }
    } = props;
    // const len = children.filter(c => c != null);

    if (!validateChildrensApi(children)) {
        return null;
    }

    const slicedChildren = setSlicedChildren({
        children: children.filter(c => c != null),
        config: { layout }
    });

    return slicedChildren;
};

export default respChildrens;
