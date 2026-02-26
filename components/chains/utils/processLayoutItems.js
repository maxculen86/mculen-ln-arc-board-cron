import { assignPropsToChildren } from '../LN10_Caja_Collection/common/_helper-WebApi';
import { LAYOUTS, setQuantityByLayout } from './common/_helpers-WebApi';

const COMPONENT_TYPES = {
    LN_TIMELINE_10: 'LN-10/timeline',
    LN_TIMELINE_ACUMULADO: 'LN-acumulado/timeline',
    LN_VIDEOPLAYER: 'LN-10/videoPlayer'
};

const isTimeline = type =>
    type === COMPONENT_TYPES.LN_TIMELINE_10 ||
    type === COMPONENT_TYPES.LN_TIMELINE_ACUMULADO;

const isVideo = type => type === COMPONENT_TYPES.LN_VIDEOPLAYER;

const {
    FOCAL_LEFT,
    FOCAL_LEFT_VIDEO,
    BN_PLAYER_1_MAS_3,
    BN_PLAYER_1_MAS_4,
    BN_PLAYER_HORIZONTAL,
    BN_6_GRID_MAS_TIMELINE
} = LAYOUTS;

const getTimeline = items => items.find(item => isTimeline(item.type));
const getVideo = items => items.find(item => isVideo(item.type));
const getVideoOrTimeline = items => getVideo(items) || getTimeline(items);

const SPECIAL_ITEM_STRATEGIES = {
    [FOCAL_LEFT]: getTimeline,
    [BN_6_GRID_MAS_TIMELINE]: getTimeline,
    [FOCAL_LEFT_VIDEO]: getVideoOrTimeline,
    [BN_PLAYER_1_MAS_3]: getVideo,
    [BN_PLAYER_1_MAS_4]: getVideo,
    [BN_PLAYER_HORIZONTAL]: getVideo
};

const getSpecialItem = (items, layout) => {
    const strategy = SPECIAL_ITEM_STRATEGIES[layout];
    return strategy ? strategy(items) : null;
};

const getRegularItems = (items, layout, specialItem) =>
    items
        .filter(item => {
            const isSpecialType = isTimeline(item.type) || isVideo(item.type);
            if (specialItem && item === specialItem) return false;
            return !(
                (layout === FOCAL_LEFT || layout === FOCAL_LEFT_VIDEO) &&
                isSpecialType
            );
        })
        .map(item => item.nodo);

const ASSEMBLE_STRATEGIES = {
    [FOCAL_LEFT]: 'push',
    [FOCAL_LEFT_VIDEO]: 'push',
    [BN_6_GRID_MAS_TIMELINE]: 'push',
    [BN_PLAYER_1_MAS_3]: 'unshift',
    [BN_PLAYER_1_MAS_4]: 'unshift',
    [BN_PLAYER_HORIZONTAL]: 'unshift'
};

const assembleItems = (regularItems, specialItem, layout) => {
    if (!specialItem) return [...regularItems];

    const action = ASSEMBLE_STRATEGIES[layout];
    const items = [...regularItems];

    if (action === 'push') items.push(specialItem.nodo);
    if (action === 'unshift') items.unshift(specialItem.nodo);

    return items;
};

export const processLayoutItems = (
    children = [],
    childProps = [],
    layout = '',
    countTimeline = false
) => {
    const items = assignPropsToChildren(children, childProps);
    const specialItem = getSpecialItem(items, layout);
    const regularItems = getRegularItems(items, layout, specialItem);

    const maxQuantity = setQuantityByLayout({ layout, countTimeline });
    const contentLimit = specialItem ? maxQuantity - 1 : maxQuantity;
    const slicedRegularItems = regularItems.slice(0, contentLimit);

    return assembleItems(slicedRegularItems, specialItem, layout);
};
