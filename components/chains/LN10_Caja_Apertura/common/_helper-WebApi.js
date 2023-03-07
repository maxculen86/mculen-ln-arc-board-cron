import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import get from '../../../private/common/utils/get';
import {
    LAYOUTS,
    setQuantityByLayout
} from '../../utils/common/_helpers-WebApi';

const { FOCAL_LEFT } = LAYOUTS;

export const validateChain = (childrenProps, layout, isInOpening) => {
    const LN10_ARTICLE = 'LN-10/article';
    const LN_TIMELINE = 'LN-10/timeline';
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

export const setFilteredRenderables = (renderables = [], features = []) => {
    const featuresKeys = features.map(c => c.key);
    return renderables.filter(f => featuresKeys.includes(f.props.id));
};
