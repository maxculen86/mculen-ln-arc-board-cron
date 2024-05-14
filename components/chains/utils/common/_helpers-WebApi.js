export const LAYOUTS = {
    FOCAL_LEFT: 'left-focal',
    FOCAL_CENTER: 'center-focal',
    FOCAL_70: 'focal-70',
    BN_OPENING_4: 'bn-opening-4',
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
    BOMBITA: 'bombita',
    BOMBITAMAS4: 'bombitaMas4',
    GRILLA4VERTICALES: 'bn-4-8',
    BN_FOCAL_1: 'bn_1_grid',
    BN_2_GRID: 'bn_2_grid',
    BN_3_GRID: 'bn_3_grid',
    BN_FOCAL_1_MAS_1: 'bn_1_1_grid',
    BN_FOCAL_1_MAS_2: 'bn_1_2_grid',
    BN_FOCAL_1_MAS_3: 'bn_1_3_grid',
    BN_FOCAL_1_MAS_4: 'bn_1_4_grid',
    BN_2_FOCAL_1_MAS_2: 'bn_2_1_2_grid',
    BN_A_FONDO: 'bnFondo',
    CONTENT_LAB: 'cajaContent1',
    OPINION_4: 'opinion4',
    OPINION_8: 'opinion8',
    FOODIT_1_GRID: 'foodit_1_grid',
    FOODIT_3_GRID: 'foodit_3_grid'
};

export const VERTICALS = ['bienestar', 'campo', 'movilidad', 'propiedades'];

export const CHAIN_STYLE = {
    HASHTAG: 'Hashtag',
    PROPIEDADES: 'propiedades',
    CAMPO: 'campo',
    BIENESTAR: 'bienestar',
    MOVILIDAD: 'movilidad',
    SUB_EXCLUSIVE: 'sub-exclusive',
    FOODIT: 'foodit'
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
    BN_3_GRID,
    BN_FOCAL_1_MAS_1,
    BN_FOCAL_1_MAS_2,
    BN_FOCAL_1_MAS_3,
    BN_FOCAL_1_MAS_4,
    BN_2_FOCAL_1_MAS_2,
    GRILLA4VERTICALES,
    BN_A_FONDO,
    OPINION_4,
    OPINION_8,
    FOODIT_1_GRID,
    FOODIT_3_GRID
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
        [BN_3_GRID]: 3,
        [BN_FOCAL_1_MAS_1]: 2,
        [BN_FOCAL_1_MAS_2]: 3,
        [BN_FOCAL_1_MAS_3]: 4,
        [BN_FOCAL_1_MAS_4]: 5,
        [BN_2_FOCAL_1_MAS_2]: 5,
        [GRILLA4VERTICALES]: 4,
        [BN_A_FONDO]: 1,
        [OPINION_4]: 4,
        [OPINION_8]: 8,
        [FOODIT_1_GRID]: 1,
        [FOODIT_3_GRID]: 3,
        default: Number(layout && layout.slice(-1)) || 3
    };

    return options[layout] || options.default;
};

export const setSlicedChildren = ({ config, children = [] }) => {
    const maxChildrenQuantity = setQuantityByLayout(config);
    return children.slice(0, maxChildrenQuantity);
};
