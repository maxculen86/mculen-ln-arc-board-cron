import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';
import { setQuantityByLayout } from '../../utils/common/_helpers-WebApi';
import get from '../../../private/common/utils/get';
import { validateStyle } from '../../utils/checkValidationStyle';

const LN_COMMON_ARTICLE = 'LN-10/article';
const COLLECTION_FEATURES = 'features';
const LN_CARD_HTML = 'LN-10/CardHtml';
const LN_TIMELINE = 'LN-10/timeline';
const LN_VIDEOPLAYER = 'LN-10/videoPlayer';
const LN_VIDEOPLAYERNOTA = 'LN-10/videoPlayerNota';

const validateCajaManual = ({
    layout,
    childProps = [],
    chainStyle,
    isGrid6MasTimeline = false,
    isBnPlayer = false
}) => {
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

    const videoPlayerVertical = childProps.filter(
        c => c.collection === COLLECTION_FEATURES && c.type === LN_VIDEOPLAYER
    );

    const videoPlayerNota = childProps.filter(
        c =>
            c.collection === COLLECTION_FEATURES &&
            c.type === LN_VIDEOPLAYERNOTA
    );

    const isPlayerHorizontal = layout === 'bn_player_horizontal';
    const isPlayerVertical = layout === 'bn_player_3_grid';

    const totalVideoPlayers =
        videoPlayerVertical.length + videoPlayerNota.length;

    const horizontalPlayerRules = isPlayerHorizontal
        ? [
              {
                  validation: videoPlayerNota.length === 0,
                  message:
                      'Esta diagramación requiere al menos un feature del tipo VideoPlayerNota'
              },
              {
                  validation: videoPlayerNota.length > 1,
                  message:
                      'Solo se permite un feature del tipo VideoPlayerNota; se tomará solo el primero'
              },
              {
                  validation: videoPlayerVertical.length > 0,
                  message:
                      'No se permite usar VideoPlayer (vertical) en esta diagramación'
              }
          ]
        : [];

    const verticalPlayerRules = isPlayerVertical
        ? [
              {
                  validation: videoPlayerVertical.length === 0,
                  message:
                      'Esta diagramación requiere al menos un feature del tipo VideoPlayer (vertical)'
              },
              {
                  validation: videoPlayerVertical.length > 1,
                  message:
                      'Solo se permite un feature del tipo VideoPlayer (vertical); se tomará solo el primero'
              },
              {
                  validation: videoPlayerNota.length > 0,
                  message:
                      'No se permite usar VideoPlayerNota (horizontal) en esta diagramación'
              }
          ]
        : [];

    const bnPlayerRules = isBnPlayer
        ? [
              {
                  validation: totalVideoPlayers === 0,
                  message:
                      'Esta diagramación requiere al menos un feature de video'
              },
              {
                  validation: totalVideoPlayers > 1,
                  message:
                      'Solo se permite un feature de video en esta diagramación'
              },
              {
                  validation: articles.length < minimum - totalVideoPlayers,
                  message: `Faltan ${
                      minimum - totalVideoPlayers - articles.length
                  } artículo${
                      minimum - totalVideoPlayers - articles.length > 1
                          ? 's'
                          : ''
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
                        (isBnPlayer &&
                            [LN_VIDEOPLAYER, LN_VIDEOPLAYERNOTA].includes(type))
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

    return pageBuilderValidator([
        ...horizontalPlayerRules,
        ...verticalPlayerRules,
        ...bnPlayerRules,
        ...rules
    ]);
};

export default validateCajaManual;
