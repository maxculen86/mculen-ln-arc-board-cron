import { LAYOUTS } from '../../../../chains/foodit-global/common/utils/helper-WebApi';

const { BN_12_GRID, CAROUSEL, BN_2_GRID } = LAYOUTS;

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
            maxArticles: 8,
            roofAs: tag.h1,
            isStatic: false,
            classNameRoof: 'mb-24'
        },
        [BN_12_GRID]: {
            size: size.small,
            minArticles: 12,
            maxArticles: 12,
            isStatic: true,
            classNameParent:
                'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
            classNameChildren: 'col-span-8 col-span-4_md'
        },
        [BN_2_GRID]: {
            size: size.small,
            minArticles: 2,
            classNameParent:
                'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
            classNameChildren: 'col-span-8 col-span-6_md col-span-8_lg',
            classNameRoof: 'mb-24'
        }
    };

    return rules[diagramation] || {};
};
export default fooditRules;
