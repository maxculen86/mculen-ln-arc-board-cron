export const isTodayEnabled = (enabledDays = []) => {
    const diasSemana = [
        'domingo',
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado'
    ];

    const normalizedEnabledDays = enabledDays.map(day =>
        day.toLowerCase().trim()
    );

    return normalizedEnabledDays.includes(diasSemana[new Date().getDay()]);
};

export const isSegmentInUserSegments = (userSegments, segment) =>
    Array.isArray(userSegments) && userSegments.includes(segment);

export const hasValidationFailed = ({
    isAdmin,
    termica,
    configError,
    hideCaja,
    enabledDays,
    token
}) => {
    if (isAdmin) return false;

    return (
        !termica ||
        !!configError ||
        hideCaja ||
        enabledDays.length === 0 ||
        !token ||
        !isTodayEnabled(enabledDays)
    );
};

export const shouldFetchContent = ({
    validationFailed,
    segmentMatches,
    isAdmin,
    hasEnteredViewport
}) => isAdmin || (!validationFailed && segmentMatches && hasEnteredViewport);

export const shouldHideComponent = ({
    isAdmin,
    attemptedLoad,
    validationFailed,
    segmentMatches,
    articles
}) => {
    if (isAdmin) return false;

    return (
        attemptedLoad &&
        (validationFailed ||
            !segmentMatches ||
            !Array.isArray(articles) ||
            articles.length === 0)
    );
};
