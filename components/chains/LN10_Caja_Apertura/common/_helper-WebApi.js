import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import get from '../../../private/common/utils/get';
import {
    LAYOUTS,
    setQuantityByLayout
} from '../../utils/common/_helpers-WebApi';

const { FOCAL_LEFT, FOCAL_LEFT_VIDEO } = LAYOUTS;

const LN10_ARTICLE = 'LN-10/article';
const LN_TIMELINE = 'LN-10/timeline';
const LN_VIDEOPLAYER = 'LN-10/videoPlayer';
const COLLECTION_FEATURES = 'features';

const getAllowedFeatures = layout => {
    if (layout === FOCAL_LEFT) {
        return [LN10_ARTICLE, LN_TIMELINE];
    }
    if (layout === FOCAL_LEFT_VIDEO) {
        return [LN10_ARTICLE, LN_VIDEOPLAYER];
    }
    return [LN10_ARTICLE, LN_TIMELINE, LN_VIDEOPLAYER];
};

const getFeatureName = featureType => {
    const names = {
        [LN10_ARTICLE]: 'LN10 Artículo',
        [LN_TIMELINE]: 'LN Timeline',
        [LN_VIDEOPLAYER]: 'LN10 VideoPlayer'
    };
    return names[featureType] || featureType;
};

export const validateChain = (childrenProps, layout, isInOpening) => {
    const isLeftFocal = layout === FOCAL_LEFT;
    const isLeftFocalVideo = layout === FOCAL_LEFT_VIDEO;
    const minimumChildren = setQuantityByLayout({ layout });

    const childrenArticles =
        childrenProps.filter(
            child =>
                child.collection === COLLECTION_FEATURES &&
                child.type === LN10_ARTICLE
        ) || [];

    const childrenArticlesLength = get(childrenArticles, 'length');

    const minimumArticles = isLeftFocalVideo ? 5 : minimumChildren;

    const allowedFeatures = getAllowedFeatures(layout);
    const allowedFeaturesText = allowedFeatures.map(getFeatureName).join(', ');

    const videoPlayers = childrenProps.filter(
        ({ collection, type }) =>
            collection === COLLECTION_FEATURES && type === LN_VIDEOPLAYER
    );

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
            validation:
                isLeftFocalVideo &&
                childrenProps.find(
                    ({ collection, type }) =>
                        collection === COLLECTION_FEATURES &&
                        type === LN_TIMELINE
                ),
            message: 'Esta diagramación no permite el feature LN Timeline'
        },
        {
            validation: isLeftFocalVideo && videoPlayers.length > 1,
            message: 'Solo se permite un feature del tipo LN10 VideoPlayer'
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
            validation:
                isLeftFocalVideo &&
                !childrenProps.find(
                    ({ collection, type }) =>
                        collection === COLLECTION_FEATURES &&
                        type === LN_VIDEOPLAYER
                ),
            message: 'Esta diagramación requiere el feature LN10 VideoPlayer'
        },
        {
            validation: childrenArticlesLength < minimumArticles,
            message: `Se requiere la carga de ${
                minimumArticles - childrenArticlesLength
            } artículo${
                minimumArticles - childrenArticlesLength > 1 ? 's' : ''
            }`
        },
        {
            validation: childrenProps.some(
                ({ collection, type }) =>
                    !(
                        collection === COLLECTION_FEATURES &&
                        allowedFeatures.includes(type)
                    )
            ),
            message: `El Chain Caja Apertura sólo admite features del tipo ${allowedFeaturesText}`
        }
    ];

    return pageBuilderValidator(rules);
};

export const setFilteredRenderables = (renderables = [], features = []) => {
    const featuresKeys = features.map(c => c.key);
    return renderables.filter(f => featuresKeys.includes(f.props.id));
};
