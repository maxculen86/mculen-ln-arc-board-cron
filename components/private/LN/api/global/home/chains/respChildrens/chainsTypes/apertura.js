import { setSlicedChildren } from '../../../../../../../../chains/utils/common/_helpers-WebApi';
import { validateChildrensApi } from '../../../../../../../../chains/utils/api/_helpers';

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
