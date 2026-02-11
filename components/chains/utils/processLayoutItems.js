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

export const processLayoutItems = (
    children = [],
    childProps = [],
    layout = '',
    countTimeline = false
) => {
    const items = assignPropsToChildren(children, childProps);
    let specialItem = null;

    const isBnPlayer = [
        BN_PLAYER_1_MAS_3,
        BN_PLAYER_1_MAS_4,
        BN_PLAYER_HORIZONTAL
    ].includes(layout);

    if (layout === FOCAL_LEFT || layout === BN_6_GRID_MAS_TIMELINE) {
        specialItem = items.find(item => isTimeline(item.type));
    } else if (layout === FOCAL_LEFT_VIDEO) {
        specialItem = items.find(item => isVideo(item.type));
        if (!specialItem) {
            specialItem = items.find(item => isTimeline(item.type));
        }
    } else if (isBnPlayer) {
        specialItem = items.find(item => isVideo(item.type));
    }

    const regularItems = items
        .filter(item => {
            const isSpecialType = isTimeline(item.type) || isVideo(item.type);

            if (specialItem && item === specialItem) return false;

            return !(
                (layout === FOCAL_LEFT || layout === FOCAL_LEFT_VIDEO) &&
                isSpecialType
            );
        })
        .map(item => item.nodo);

    const maxQuantity = setQuantityByLayout({ layout, countTimeline });
    const contentLimit = specialItem ? maxQuantity - 1 : maxQuantity;
    const itemsAssembled = regularItems.slice(0, contentLimit);

    if (specialItem) {
        if (
            layout === FOCAL_LEFT ||
            layout === FOCAL_LEFT_VIDEO ||
            layout === BN_6_GRID_MAS_TIMELINE
        ) {
            itemsAssembled.push(specialItem.nodo);
        } else if (isBnPlayer) {
            itemsAssembled.unshift(specialItem.nodo);
        }
    }

    return itemsAssembled;
};
