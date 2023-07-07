import { setSlicedChildren } from '../../../../../../../../../chains/utils/common/_helpers-WebApi';
import { validateChildrensApi } from '../../../../common/utils/_helpers';

export const respChildrens = props => {
    const {
        children,
        customFields: { layout }
    } = props;

    if (!validateChildrensApi(children)) {
        return null;
    }
    return setSlicedChildren({
        children, // or children.filter(c => c != null),
        config: { layout, countTimeline: true }
    });
};

export default respChildrens;
