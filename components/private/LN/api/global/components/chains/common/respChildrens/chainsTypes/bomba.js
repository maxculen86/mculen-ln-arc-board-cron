import { setSlicedChildren } from '../../../../../../../../../chains/utils/common/_helpers-WebApi';
import { validateChildrensApi } from '../../../../common/utils/_helpers';

export const respChildrens = props => {
    const {
        children,
        customFields: { layout }
    } = props;
    // const len = children.filter(c => c != null);

    if (!validateChildrensApi(children)) {
        return null;
    }

    return setSlicedChildren({
        children,
        config: { layout }
    });
};

export default respChildrens;
