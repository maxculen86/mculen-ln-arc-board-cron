import { LAYOUTS } from '../../../../chains/foodit-global/common/utils/helper-WebApi';

const {
    BN_12_GRID,
    CAROUSEL,
    CAROUSEL_4,
    BN_2_GRID,
    BN_FOCAL_1_MAS_4,
    BN_FOCAL_1
} = LAYOUTS;

const fooditRules = diagramation => {
    const size = {
        small: 'small',
        large: 'large'
    };
    const tag = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3'
    };

    const rules = {
        [CAROUSEL]: {
            size: size.small,
            minArticles: 4,
            minRelatedArticles: 4,
            maxRelatedArticles: 8,
            maxArticles: 8,
            roofAs: tag.h3,
            isStatic: false,
            classNameRoof: 'mb-24',
            layoutImgConfig: 'm'
        },
        [CAROUSEL_4]: {
            size: size.small,
            minArticles: 4,
            minRelatedArticles: 4,
            maxRelatedArticles: 4,
            maxArticles: 4,
            roofAs: tag.h3,
            isStatic: false,
            classNameRoof: 'mb-24',
            layoutImgConfig: 'm'
        },
        [BN_12_GRID]: {
            size: size.small,
            classStatic: 'bn-12',
            minArticles: 12,
            minRelatedArticles: 4,
            maxRelatedArticles: 12,
            maxArticles: 12,
            isStatic: true,
            classNameParent:
                'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
            classNameChildren: 'col-span-8 col-span-4_md',
            layoutImgConfig: 'm'
        },
        [BN_2_GRID]: {
            size: size.large,
            minArticles: 2,
            classNameParent:
                'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
            classNameChildren: 'col-span-8 col-span-6_md col-span-8_lg',
            classNameRoof: 'mb-24',
            layoutImgConfig: 'grid2Notes'
        },
        [BN_FOCAL_1_MAS_4]: {
            minArticles: 5,
            size: size.small,
            openingImgConfig: 'grid2Notes',
            containerConfig: 'opening-grid',
            classNameChildren: 'w-100',
            layoutImgConfig: 'm'
        },
        [BN_FOCAL_1]: {
            containerConfig: 'opening-alone',
            openingImgConfig: 'recipeDay'
        }
    };

    return rules[diagramation] || {};
};
export default fooditRules;
