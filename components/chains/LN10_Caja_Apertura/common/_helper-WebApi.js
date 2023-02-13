import get from '../../../private/common/utils/get';
import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

const LAYOUTS = {
    FOCAL_LEFT: 'left-focal',
    FOCAL_CENTER: 'center-focal',
    FOCAL_70: 'focal-70',
    BN_OPENING_4: 'bn-opening-4'
};

const { FOCAL_LEFT, FOCAL_CENTER, FOCAL_70, BN_OPENING_4 } = LAYOUTS;

export const setQuantityByLayout = ({ layout = '', countTimeline }) => {
    const options = {
        [FOCAL_LEFT]: countTimeline ? 6 : 5,
        [FOCAL_CENTER]: 4,
        [FOCAL_70]: 3,
        [BN_OPENING_4]: 4,
        default: Number(layout && layout.slice(-1)) || 3
    };

    return options[layout] || options.default;
};

export const validateChain = (childrenProps, layout, isInOpening) => {
    const LN10_ARTICLE = 'LN-10/article';
    const LN_TIMELINE = 'LN-acumulado/timeline';
    const COLLECTION_FEATURES = 'features';

    const isLeftFocal = layout === FOCAL_LEFT;
    const minimumChildren = setQuantityByLayout({ layout });

    const childrenArticles =
        childrenProps.filter(
            child =>
                child.collection === COLLECTION_FEATURES &&
                child.type === LN10_ARTICLE
        ) || [];

    const childrenArticlesLength = get(childrenArticles, 'length');

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: !isInOpening,
            message: 'La chain debe estar dentro de la sección Apertura'
        },
        {
            validation: childrenArticlesLength < minimumChildren,
            message: `Se requiere la carga de ${minimumChildren -
                childrenArticlesLength} artículo${
                minimumChildren - childrenArticlesLength > 1 ? 's' : ''
            }`
        },
        {
            validation:
                isLeftFocal &&
                !childrenProps.find(
                    ({ collection, type }) =>
                        collection === COLLECTION_FEATURES &&
                        type === LN_TIMELINE
                ),
            message: 'Esta diagramación requiere el feature LN Timeline'
        },
        {
            validation: childrenProps.some(
                ({ collection, type }) =>
                    !(
                        collection === COLLECTION_FEATURES &&
                        [LN10_ARTICLE, LN_TIMELINE].includes(type)
                    )
            ),
            message:
                'El Chain Caja Apertura sólo admite features del tipo LN10 Artículo o LN Timeline'
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateChain;
