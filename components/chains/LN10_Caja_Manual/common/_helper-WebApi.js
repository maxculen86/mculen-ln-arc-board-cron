import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import { setQuantityByLayout } from '../../utils/common/_helpers-WebApi';
import get from '../../../private/common/utils/get';
import { validateStyle } from '../../utils/checkValidationStyle';
import { assignPropsToChildren } from '../../LN10_Caja_Collection/common/_helper-WebApi';
import { reorderArticlesWithTimeline } from '../../utils/reorderArticlesWithTimeline';

const validateCajaManual = ({
    layout,
    childProps = [],
    chainStyle,
    isGrid6MasTimeline = false,
    isBnPlayer = false
}) => {
    const LN_COMMON_ARTICLE = 'LN-10/article';
    const COLLECTION_FEATURES = 'features';
    const LN_CARD_HTML = 'LN-10/CardHtml';
    const LN_TIMELINE = 'LN-10/timeline';
    const LN_VIDEOPLAYER = 'LN-10/videoPlayer';

    const minimum = setQuantityByLayout({
        layout,
        countTimeline: isGrid6MasTimeline
    });
    const childrenPropsLength = get(childProps, 'length');
    const aFondoValidation = validateStyle(layout, chainStyle);

    const articles = childProps.filter(
        c =>
            c.collection === COLLECTION_FEATURES && c.type === LN_COMMON_ARTICLE
    );

    const videos = childProps.filter(
        c =>
            c.collection === COLLECTION_FEATURES &&
            (c.type === 'T1' || c.type === LN_VIDEOPLAYER)
    );

    const bnPlayerRules = isBnPlayer
        ? [
              {
                  validation: videos.length === 0,
                  message:
                      'Esta diagramación requiere al menos un feature de video'
              },
              {
                  validation: videos.length > 1,
                  message:
                      'Solo se permite un feature de video en esta diagramación'
              },
              {
                  validation: articles.length < 3,
                  message: `Faltan ${3 - articles.length} artículo${
                      3 - articles.length > 1 ? 's' : ''
                  } para completar la diagramación`
              }
          ]
        : [];

    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: aFondoValidation,
            message:
                'El estilo de caja seleccionado no corresponde para esta diagramación'
        },
        {
            validation:
                isGrid6MasTimeline &&
                !childProps.find(
                    ({ collection, type }) =>
                        collection === COLLECTION_FEATURES &&
                        type === LN_TIMELINE
                ),
            message: 'Esta diagramación requiere el feature LN10 Timeline'
        },
        {
            validation: childProps.some(
                ({ collection, type }) =>
                    !(
                        (collection === COLLECTION_FEATURES &&
                            ([LN_COMMON_ARTICLE, LN_CARD_HTML].includes(type) ||
                                (isGrid6MasTimeline &&
                                    type === LN_TIMELINE))) ||
                        (isBnPlayer && type === LN_VIDEOPLAYER)
                    )
            ),
            message:
                'La Chain LN10 Caja Manual sólo admite features del tipo LN10 Artículo'
        },
        {
            validation: childrenPropsLength < minimum,
            message: `Se requiere la carga de ${
                minimum - childrenPropsLength
            } artículo${minimum - childrenPropsLength > 1 ? 's' : ''}`
        }
    ];

    return pageBuilderValidator([...bnPlayerRules, ...rules]);
};

// TODO: agregar test unitario
export const reorderArticlesWithVideo = (articles = [], childProps = []) => {
    const articlesWithProps = assignPropsToChildren(articles, childProps);

    const videoFeature = articlesWithProps.find(
        article => article.type === 'LN-10/videoPlayer'
    );

    const otherFeatures = articlesWithProps.filter(
        article => article.type !== 'LN-10/videoPlayer'
    );

    const orderedArticles = videoFeature
        ? [videoFeature, ...otherFeatures]
        : articlesWithProps;

    return orderedArticles.map(article => article.nodo);
};

export const getOrderedArticles = ({
    nodeList,
    childProps,
    isGrid6MasTimeline,
    isBnPlayer
}) => {
    if (isGrid6MasTimeline)
        return reorderArticlesWithTimeline(nodeList, childProps);
    if (isBnPlayer) return reorderArticlesWithVideo(nodeList, childProps);
    return nodeList;
};

export default validateCajaManual;
