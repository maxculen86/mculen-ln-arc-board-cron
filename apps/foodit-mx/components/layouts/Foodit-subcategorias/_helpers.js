import { addEventToDataLayerV2 } from '../../private/LN/common/utils/addEventToDataLayer';

const PAGE_PRIORITY_CONFIG = {
    '/cocina-a-tu-medida/': {
        highPriority: [],
        eager: []
    },
    '/aprende-en-la-cocina/': {
        highPriority: [0],
        eager: [0]
    },
    '/cocina-facil-y-rapido/': {
        highPriority: [0],
        eager: [0]
    },
    '/recetas/': {
        highPriority: [0],
        eager: [0]
    },
    default: {
        highPriority: [0],
        eager: [0]
    }
};

const PAGE_PRELOAD_CONFIG = {
    '/cocina-a-tu-medida/': {
        enabled: false,
        preloadIndices: [0]
    },
    '/aprende-en-la-cocina/': {
        enabled: true,
        preloadIndices: [0]
    },
    '/cocina-facil-y-rapido/': {
        enabled: true,
        preloadIndices: [0]
    },
    '/recetas/': {
        enabled: true,
        preloadIndices: [0]
    },
    default: {
        enabled: true,
        preloadIndices: [0]
    }
};

export const applyPageBasedPriority = (imageProps, cardIndex, requestUri) => {
    const config =
        PAGE_PRIORITY_CONFIG[requestUri] || PAGE_PRIORITY_CONFIG.default;

    if (config.highPriority.includes(cardIndex)) {
        return {
            ...imageProps,
            loading: 'eager',
            fetchPriority: 'high'
        };
    }

    if (config.eager.includes(cardIndex)) {
        return {
            ...imageProps,
            loading: 'eager'
        };
    }

    return {
        ...imageProps,
        loading: 'lazy'
    };
};

export const getPreloadConfig = requestUri =>
    PAGE_PRELOAD_CONFIG[requestUri] || PAGE_PRELOAD_CONFIG.default;

export const getCriticalImagesForPage = (requestUri, mockData, assetsPath) => {
    const preloadConfig = getPreloadConfig(requestUri);

    if (!preloadConfig.enabled || !mockData || !Array.isArray(mockData)) {
        return [];
    }

    return preloadConfig.preloadIndices
        .map(index => {
            const item = mockData[index];
            return item ? assetsPath(item.imageProps.src) : null;
        })
        .filter(Boolean);
};

export const getPageTitleFromUrl = url => {
    if (!url || url === '/') return 'Subcategorías';

    const cleanUrl = url.split('?')[0].replace(/\/$/, '');
    const segments = cleanUrl.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (!lastSegment) return 'Subcategorías';

    const specialCases = {
        'aprende-en-la-cocina': 'Aprendé en la cocina',
        'cocina-facil-y-rapido': 'Cociná fácil y rápido',
        'cocina-a-tu-medida': 'Cociná a tu medida',
        recetas: 'Recetas'
    };

    return (
        specialCases[lastSegment] ||
        lastSegment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    );
};

const getTrackingConfig = (subcategoryUrl = '') => {
    const configs = {
        '/aprende-en-la-cocina/': {
            sectionCategory: 'cards_aprende_a_cocinar',
            homeLabel: 'aprende_a_cocinar'
        },
        '/cocina-facil-y-rapido/': {
            sectionCategory: 'cards_cocina_facil',
            homeLabel: 'cocina_facil'
        },
        '/cocina-a-tu-medida/': {
            sectionCategory: 'cards_cocina_a_tu_manera',
            homeLabel: 'cocina_a_tu_manera'
        },
        '/recetas/': {
            sectionCategory: 'cards_recetas',
            homeLabel: 'recetas'
        }
    };

    return configs[subcategoryUrl] || null;
};

export const trackSubcategoryCard = (cardData, subcategoryUrl) => {
    const trackingConfig = getTrackingConfig(subcategoryUrl);

    if (trackingConfig && cardData.trackingLabel) {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: trackingConfig.sectionCategory,
            label: cardData.trackingLabel,
            action: 'N/A'
        });
    }
};

export const trackHomeCard = cardData => {
    if (cardData && cardData.trackingLabel) {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'cards_home',
            label: cardData.trackingLabel,
            action: 'N/A'
        });
    }
};
