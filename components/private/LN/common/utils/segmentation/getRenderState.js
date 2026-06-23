const SEGMENTATION_CONFIG_MESSAGE =
    'Configurá experimento + al menos una lista de dígitos + al menos una variante (TEST o CONTROL).';

const getRenderState = ({
    hasSection,
    isAdmin,
    segmentationConfigError,
    segmentAndHide,
    ready,
    activeSegment,
    activeFilter = null,
    renderError = null
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

    if (activeFilter !== null && !activeFilter) {
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

export default getRenderState;
