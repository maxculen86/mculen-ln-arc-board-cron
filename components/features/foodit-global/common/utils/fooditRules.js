import { LAYOUTS } from '../../../../chains/foodit-global/common/utils/helper-WebApi';

const { BN_12_GRID, CAROUSEL } = LAYOUTS;

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
            maxArticles: 12,
            roofAs: tag.h1,
            isStatic: false
        },
        [BN_12_GRID]: {
            size: size.small,
            minArticles: 12,
            maxArticles: 12,
            isStatic: true,
            classNameParent:
                'grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32',
            classNameChildren: 'col-span-8 col-span-4_md'
        }
    };

    return rules[diagramation];
};
export default fooditRules;
