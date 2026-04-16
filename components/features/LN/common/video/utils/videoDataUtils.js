import { VIDEO_VERTICAL } from '../../../../../private/common/utils/subtypes/subtypeHelper';

export {
    transformImages,
    getCaptionBgClass,
    getConfigClassName,
    getVerticalPlayer
} from '../../../../../private/common/videoPlayerJw/utils/helperJw';

// Constantes
export const DEFAULT_PLAYER_ID = 'ih0086X3';
export const VERTICAL_PLAYER_IDS = [
    'hOz6uuUy',
    'HbGKzdo0',
    '9gbjbJp8',
    'tMVdYMxO'
];

/**
 * Extrae datos del video desde la estructura anidada embed.config.videoJw
 * @param {Object} data - Objeto de datos con estructura embed.config
 * @returns {Object} Datos del video extraídos y aplanados
 */
export function extractVideoData(data) {
    const {
        embed: {
            config: {
                idPlayer,
                videoJw: {
                    title = '',
                    description = '',
                    playlist = [],
                    epigraphTitle = ''
                } = {}
            } = {}
        } = {}
    } = data || {};

    const playerId = idPlayer || DEFAULT_PLAYER_ID;
    const [firstVideo] = playlist || [];
    const {
        mediaid = '',
        sources = [],
        images = [],
        image = '',
        duration: rawDuration
    } = firstVideo || {};

    // Normalize duration: JW delivers either a numeric seconds value (new videos)
    // or a milliseconds string (old videos). Always return a milliseconds string.
    let duration;
    if (typeof rawDuration === 'number') {
        duration = String(rawDuration * 1000);
    } else {
        duration = rawDuration;
    }

    return {
        playerId,
        title,
        description,
        playlist,
        epigraphTitle,
        mediaId: mediaid,
        sources,
        images,
        fallbackImage: image,
        firstVideo,
        duration
    };
}

/**
 * Determina la orientación del video basándose en el player ID
 * @param {string} playerId - ID del player JW
 * @returns {'vertical' | 'horizontal'}
 */
export function getVideoOrientation(playerId) {
    return VERTICAL_PLAYER_IDS.includes(playerId) ? 'vertical' : 'horizontal';
}

/**
 * Calcula la variante de display para el reproductor de video
 * @param {Object} options
 * @param {boolean} options.isOpening - Si es un video de apertura
 * @param {string} options.subtype - Subtipo del contenido
 * @param {string} options.playerId - ID del player JW
 * @returns {'vertical' | 'horizontal'}
 */
export function calculateDisplayVariant({ isOpening, subtype, playerId }) {
    const orientation = getVideoOrientation(playerId);

    if (isOpening) {
        if (subtype === VIDEO_VERTICAL && orientation === 'vertical') {
            return 'vertical';
        }
        return 'horizontal';
    }

    return orientation;
}

/**
 * Construye la configuración del playlist normalizada
 * @param {Array} playlist - Playlist original del video
 * @param {string} mediaId - ID del media como fallback
 * @param {Array} sources - Sources como fallback
 * @returns {Array} Playlist normalizado para la configuración
 */
export function buildPlaylistConfig(playlist, mediaId, sources) {
    const items = playlist?.length ? playlist : [{ mediaid: mediaId, sources }];

    return items.map(({ mediaid: itemMediaId, sources: itemSources = [] }) => ({
        mediaid: itemMediaId,
        sources: itemSources
    }));
}

/**
 * Construye el objeto de configuración para el atributo data-config
 * @param {Object} options
 * @param {string} options.title - Título del video
 * @param {string} options.mediaId - ID del media
 * @param {string} options.playerId - ID del player JW
 * @param {Array} options.playlist - Playlist normalizado
 * @param {boolean} options.hasAutoplay - Si tiene autoplay
 * @param {string} options.tagsUrl - URL de tags para publicidad
 * @param {string} options.arcSite - Sitio de Arc
 * @returns {Object} Configuración del video
 */
export function buildVideoConfig({
    title,
    mediaId,
    playerId,
    playlist,
    hasAutoplay = false,
    tagsUrl = '',
    arcSite = '',
    duration
}) {
    return {
        title,
        mediaId,
        playerId,
        playlist,
        hasAutoplay: Boolean(hasAutoplay),
        autostart: true,
        tagsUrl,
        arcSite,
        duration
    };
}

/**
 * Determina si se debe mostrar el figure caption
 * @param {Object} options
 * @param {boolean} options.isPromoItemVideo - Si es el video del promo item
 * @param {string} options.subtype - Subtipo del contenido
 * @param {Array} options.subtypesWithoutCaption - Subtipos que no muestran caption
 * @returns {boolean}
 */
export function shouldShowFigureCaption({
    isPromoItemVideo,
    subtype,
    subtypesWithoutCaption
}) {
    const isSubtypeWithoutFigureCaption =
        subtypesWithoutCaption.includes(subtype);
    return !isPromoItemVideo || !isSubtypeWithoutFigureCaption;
}
