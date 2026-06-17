export const buildTrackingData = ({
    title,
    logoSrc,
    buttonText,
    href,
    badge
}) => ({
    'data-testid': 'card-promo',
    'data-title': title ?? '',
    'data-img': logoSrc ?? '',
    'data-label': buttonText || 'Jugar',
    'data-href': href ?? '',
    'data-badge': badge ?? ''
});

export const buildLinkProps = ({ href, title, contentType }) => ({
    href,
    target: '_self',
    title,
    ...(contentType === 'game' && { 'data-game-link': 'true' }),
    ...(contentType === 'podcast' && { 'data-videopodcast-link': 'true' })
});

export const getBadge = isNew => (isNew && isNew !== 'NO' ? isNew : null);

export const getImageSettings = ({ isFirstCard, diagramation = '' }) => {
    if (diagramation === 'oneLargeFourSmall' && isFirstCard) {
        return 'cardPromoT1';
    }
    return 'cardPromoDefault';
};

export const isTagId = id =>
    id && typeof id === 'string' && id.startsWith('/tema/');
