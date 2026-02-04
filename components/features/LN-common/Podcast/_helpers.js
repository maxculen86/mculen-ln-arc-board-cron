export const buildTrackingData = ({
    title,
    logoSrc,
    buttonText,
    href,
    badge
}) => ({
    'data-testid': 'card-podcast',
    'data-title': title ?? '',
    'data-img': logoSrc ?? '',
    'data-label': buttonText || 'Reproducir',
    'data-href': href ?? '',
    'data-badge': badge ?? ''
});

export const getTagState = ({ isNewPodcast, forSubscriber }) => {
    const badge = isNewPodcast && isNewPodcast === 'NO' ? null : isNewPodcast;
    const showRibbon = !!forSubscriber;
    const showTag = !!badge || showRibbon;
    return { badge, showRibbon, showTag };
};

export const buildVariant = (isFirstCard, parentLayout) => ({
    firstChild: isFirstCard,
    diagramation: parentLayout,
    sizeCard: 22,
    theme: { type: 'podcast' }
});

export const buildLinkProps = ({ href, title }) => ({
    href,
    target: '_self',
    title,
    'data-videopodcast-link': 'true'
});

export const getImageSettings = ({ isFirstCard, diagramation = '' }) => {
    if (diagramation === 'oneLargeFourSmall' && isFirstCard) {
        return 'cardCoverT1';
    }

    return 'cardCoverDefault';
};

export const isTagId = id =>
    id && typeof id === 'string' && id.startsWith('/tema/');
