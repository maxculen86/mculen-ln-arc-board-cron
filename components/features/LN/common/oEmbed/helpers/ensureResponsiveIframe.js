import { EMBED_SUBTYPES_WITH_IFRAME, IFRAME_REGEX } from './constants';

const WIDTH_ATTR_REGEX = /\swidth\s*=\s*["']?(\d+(?:\.\d+)?)["']?/i;
const HEIGHT_ATTR_REGEX = /\sheight\s*=\s*["']?(\d+(?:\.\d+)?)["']?/i;
const STYLE_ATTR_REGEX = /\sstyle\s*=\s*(["'])([^"']*)\1/i;

const DEFAULT_ASPECT_RATIO = '16 / 9';
const RESPONSIVE_STYLE_PROPS = 'width:100%;height:auto;max-width:100%;';

const getAspectRatio = iframeTag => {
    const width = iframeTag.match(WIDTH_ATTR_REGEX)?.[1];
    const height = iframeTag.match(HEIGHT_ATTR_REGEX)?.[1];

    if (!width || !height || Number(width) === 0 || Number(height) === 0) {
        return DEFAULT_ASPECT_RATIO;
    }

    return `${width} / ${height}`;
};

const buildResponsiveStyle = iframeTag => {
    const aspectRatio = getAspectRatio(iframeTag);
    return `${RESPONSIVE_STYLE_PROPS}aspect-ratio:${aspectRatio};`;
};

/**
 * Normaliza los iframes de video embebidos (youtube, vimeo, dailymotion) para
 * que ocupen el ancho de la columna de texto. Reemplaza el width/height nativos
 * del oembed por width:100% y deja que la altura se calcule automáticamente a
 * partir de la relación de aspecto del video.
 */
const ensureResponsiveIframe = ({ subtype, tagHtml = '' }) => {
    const isSupportedEmbed = EMBED_SUBTYPES_WITH_IFRAME.includes(subtype);
    const iframeTag = tagHtml.match(IFRAME_REGEX)?.[0];

    if (!isSupportedEmbed || !iframeTag) {
        return tagHtml;
    }

    const responsiveStyle = buildResponsiveStyle(iframeTag);

    const normalizedTag = iframeTag
        .replace(WIDTH_ATTR_REGEX, '')
        .replace(HEIGHT_ATTR_REGEX, '');

    const styledTag = STYLE_ATTR_REGEX.test(normalizedTag)
        ? normalizedTag.replace(
              STYLE_ATTR_REGEX,
              (_match, quote, existingStyle) =>
                  ` style=${quote}${existingStyle.replace(/;?\s*$/, ';')}${responsiveStyle}${quote}`
          )
        : normalizedTag.replace(
              /<iframe(\s+)/i,
              `<iframe style="${responsiveStyle}"$1`
          );

    return tagHtml.replace(iframeTag, styledTag);
};

export default ensureResponsiveIframe;
