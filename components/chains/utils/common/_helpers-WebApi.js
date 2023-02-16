import get from '../../../private/common/utils/get';

export const LAYOUTS = {
    FOCAL_LEFT: 'left-focal',
    FOCAL_CENTER: 'center-focal',
    FOCAL_70: 'focal-70',
    BN_OPENING_4: 'bn-opening-4',
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
    BOMBITA: 'bombita',
    BOMBITAMAS4: 'bombitaMas4',
    BN_FOCAL_1: 'bn_1_grid',
    BN_2_GRID: 'bn_2_grid',
    BN_FOCAL_1_MAS_1: 'bn_1_1_grid',
    BN_FOCAL_1_MAS_2: 'bn_1_2_grid',
    BN_FOCAL_1_MAS_3: 'bn_1_3_grid',
    BN_FOCAL_1_MAS_4: 'bn_1_4_grid',
    BN_2_FOCAL_1_MAS_2: 'bn_2_1_2_grid'
};

export const CHAIN_STYLE = {
    HASHTAG: 'HashTag',
    EXCLUSIVE_SUB: 'Exclusivo Suscriptor',
    PROPERTIES: 'Propiedades',
    CAMP: 'Campo',
    WELFARE: 'Bienestar',
    MOBILITY: 'Movilidad'
};

const {
    FOCAL_LEFT,
    FOCAL_CENTER,
    FOCAL_70,
    BN_OPENING_4,
    HORIZONTAL,
    VERTICAL,
    BOMBITA,
    BOMBITAMAS4,
    BN_FOCAL_1,
    BN_2_GRID,
    BN_FOCAL_1_MAS_1,
    BN_FOCAL_1_MAS_2,
    BN_FOCAL_1_MAS_3,
    BN_FOCAL_1_MAS_4,
    BN_2_FOCAL_1_MAS_2
} = LAYOUTS;

export const setQuantityByLayout = ({ layout = '', countTimeline }) => {
    const options = {
        [FOCAL_LEFT]: countTimeline ? 6 : 5,
        [FOCAL_CENTER]: 4,
        [FOCAL_70]: 3,
        [BN_OPENING_4]: 4,
        [HORIZONTAL]: 1,
        [VERTICAL]: 1,
        [BOMBITA]: 1,
        [BOMBITAMAS4]: 5,
        [BN_FOCAL_1]: 1,
        [BN_2_GRID]: 2,
        [BN_FOCAL_1_MAS_1]: 2,
        [BN_FOCAL_1_MAS_2]: 3,
        [BN_FOCAL_1_MAS_3]: 4,
        [BN_FOCAL_1_MAS_4]: 5,
        [BN_2_FOCAL_1_MAS_2]: 5,
        default: Number(layout && layout.slice(-1)) || 3
    };

    return options[layout] || options.default;
};

export const setWrappedChildrenApi = (renderables = [], features = []) => {
    const customWrappers = {
        'LN-acumulado/timeline': content => {
            return content;
        }
    };
    return features
        .map(f => {
            const feature = renderables.find(
                r => get(r, 'props.id', null) === f.idRender
            );
            return customWrappers[feature.type]
                ? customWrappers[feature.type](feature)
                : feature;
        })
        .filter(Boolean);
    /*     return renderables
        .map(({ type, props = {} } = {}) => {
            const feature = features.find(c => c.key === props.id);
            return customWrappers[type]
                ? customWrappers[type](feature)
                : feature;
        })
        .filter(Boolean);
         */
};

export const setSlicedChildren = ({ config, children = [] }) => {
    const maxChildrenQuantity = setQuantityByLayout(config);
    return children.slice(0, maxChildrenQuantity);
};
export default LAYOUTS;
