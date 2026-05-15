export const SEGMENTATION_GROUP = 'Segmentación AB';

export const FILTERS = [
    '',
    'byLastNews',
    'byTags',
    'bySectionOrTag',
    'aperturaHome'
];

export const FILTER_LABELS = {
    '': 'Sin configurar',
    byLastNews: 'Ultimas Noticias',
    byTags: 'Por Tags',
    bySectionOrTag: 'Seccion o tag',
    aperturaHome: 'Apertura-Home'
};

const SEGMENTATION_CONFIG_MESSAGE =
    'Configurá experimento + al menos una lista de dígitos + al menos una variante (TEST o CONTROL).';

export const getAdminPreviewSegment = ({
    isAdmin,
    segment,
    segmentationConfigError,
    filterTest
}) => {
    if (!isAdmin || segment || segmentationConfigError) return null;
    return filterTest ? 'test' : 'control';
};

export const getRenderState = ({
    hasSection,
    isAdmin,
    segmentationConfigError,
    segmentAndHide,
    ready,
    activeSegment,
    activeFilter,
    renderError
}) => {
    if (!hasSection) return { shouldRender: false };

    if (isAdmin && segmentationConfigError) {
        return {
            shouldRender: false,
            warning: {
                type: 'warning',
                message: SEGMENTATION_CONFIG_MESSAGE
            }
        };
    }

    if (segmentAndHide || !ready || !activeSegment) {
        return { shouldRender: false };
    }

    if (!activeFilter) {
        return {
            shouldRender: false,
            ...(isAdmin && {
                warning: {
                    type: 'warning',
                    message: `No configuraste el origen para la variante ${activeSegment.toUpperCase()}.`
                }
            })
        };
    }

    if (isAdmin && renderError) {
        return {
            shouldRender: false,
            warning: renderError
        };
    }

    return { shouldRender: !renderError };
};
