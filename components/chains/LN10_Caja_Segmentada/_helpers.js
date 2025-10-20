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

export const isBoxEnabled = ({
    termica,
    configError,
    hideCaja,
    enabledDays,
    shouldSchedule = false
}) => {
    if (!(termica && !configError && !hideCaja)) {
        return false;
    }

    if (!shouldSchedule) {
        return true;
    }

    if (!Array.isArray(enabledDays) || enabledDays.length === 0) {
        return false;
    }

    return isTodayEnabled(enabledDays);
};

export const hasValidationFailed = ({
    isAdmin,
    termica,
    configError,
    hideCaja,
    enabledDays,
    token,
    shouldSchedule = false
}) => {
    if (isAdmin) return false;

    return (
        !token ||
        !isBoxEnabled({
            termica,
            configError,
            hideCaja,
            enabledDays,
            shouldSchedule
        })
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
    isLoadingArticles,
    articles
}) => {
    if (isAdmin) return false;

    return (
        validationFailed ||
        (attemptedLoad &&
            (!segmentMatches ||
                (!isLoadingArticles &&
                    (!Array.isArray(articles) || articles.length === 0))))
    );
};

export const shouldShowComponent = ({
    hasEnteredViewport,
    attemptedLoad,
    isLoadingArticles,
    isLoadingSegmentation
}) =>
    hasEnteredViewport &&
    attemptedLoad &&
    !isLoadingSegmentation &&
    !isLoadingArticles;

export const shouldShowPlaceholder = ({ attemptedLoad, isLoadingArticles }) =>
    attemptedLoad && isLoadingArticles;
