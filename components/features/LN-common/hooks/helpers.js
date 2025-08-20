export const getScrollPercentBetweenElements = (
    scrollY,
    startOffset,
    endOffset
) => {
    if (endOffset <= startOffset) return 0;

    return Math.min(
        Math.max(
            ((scrollY - startOffset) / (endOffset - startOffset)) * 100,
            0
        ),
        100
    );
};

export const getOffsets = (startEl, endEl) => {
    const absoluteTop = el =>
        el ? el.getBoundingClientRect().top + window.scrollY : 0;

    const startOffset = absoluteTop(startEl);
    const endOffset = endEl
        ? absoluteTop(endEl) + endEl.offsetHeight
        : document.documentElement.scrollHeight;
    return { startOffset, endOffset };
};

// Para saber si ya se disparo ese trigger
const makeKey = (id, type, value) => `${id || ''}-${type}-${value}`;

const handlePositionTrigger = (
    id,
    type,
    threshold,
    callback,
    scrollY,
    alreadyDispatched
) => {
    const key = makeKey(id, type, threshold);
    if (scrollY >= threshold && !alreadyDispatched.has(key)) {
        callback(scrollY);
        alreadyDispatched.add(key);
    }
};

const handlePercentageStep = (
    id,
    type,
    percentToFire,
    callback,
    alreadyDispatched
) => {
    const key = makeKey(id, type, percentToFire);
    if (!alreadyDispatched.has(key)) {
        callback(percentToFire);
        alreadyDispatched.add(key);
    }
};

const handlePercentageTrigger = (
    id,
    type,
    threshold,
    thresholdStep,
    callback,
    scrollPercent,
    alreadyDispatched
) => {
    if (thresholdStep == null) {
        const key = makeKey(id, type, threshold);
        if (scrollPercent >= threshold && !alreadyDispatched.has(key)) {
            callback(scrollPercent);
            alreadyDispatched.add(key);
        }
        return;
    }

    const maxStepReached =
        Math.floor(scrollPercent / thresholdStep) * thresholdStep;
    for (
        let percentToFire = threshold;
        percentToFire <= maxStepReached;
        percentToFire += thresholdStep
    ) {
        handlePercentageStep(
            id,
            type,
            percentToFire,
            callback,
            alreadyDispatched
        );
    }
};

export const runTriggers = (
    listeners,
    scrollY,
    scrollPercent,
    alreadyDispatched
) => {
    listeners.forEach(({ id, type, threshold, thresholdStep, callback }) => {
        if (type === 'position') {
            handlePositionTrigger(
                id,
                type,
                threshold,
                callback,
                scrollY,
                alreadyDispatched
            );
            return;
        }

        if (type === 'percentage') {
            handlePercentageTrigger(
                id,
                type,
                threshold,
                thresholdStep,
                callback,
                scrollPercent,
                alreadyDispatched
            );
        }
    });
};
