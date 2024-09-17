import {
    setSlicedChildren,
    LAYOUTS
} from '../../../../../../../../../chains/utils/common/_helpers-WebApi';
import { validateChildrensApi } from '../../../../common/utils/_helpers';
export const respChildrens = props => {
    const { BN_6_GRID_MAS_TIMELINE } = LAYOUTS;

    const {
        children,
        customFields: { layout }
    } = props;

    if (!validateChildrensApi(children)) {
        return null;
    }

    const countTimeline = layout === BN_6_GRID_MAS_TIMELINE;

    return setSlicedChildren({
        children,
        config: { layout, countTimeline: countTimeline }
    });
};

export default respChildrens;
