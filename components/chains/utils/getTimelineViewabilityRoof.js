import get from '../../private/common/utils/get';
import getViewabilityRoof from './getViewabilityRoof';

const getTimelineViewabilityRoof = (featureId = '', renderables = []) => {
    const chains = renderables.filter(
        block =>
            block.collection === 'chains' &&
            !get(block, 'props.customFields.hideCaja')
    );

    const parent = chains.find(
        item =>
            item.children &&
            item.children.some(child => child.props.id === featureId)
    );

    const parentId = parent ? parent.props.id : null;

    if (!parentId) return 'N/A';

    return getViewabilityRoof(parentId, renderables, parent.props.customFields);
};

export default getTimelineViewabilityRoof;
