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

//Para saber si ya se disparo ese trigger
const makeKey = (id, type, value) => `${id || ''}-${type}-${value}`;

export const runTriggers = (
    listeners,
    scrollY, // Solo relevante si es de tipo position /
    scrollPercent, // Solo relevante si es de tipo percentage
    alreadyDispatched
) => {
    // Recorre y si el scroll está fuera del rango, no hay listeners o ya se dispararon no hace nada. Si no, ejecuta los callbacks acorde a tipo y threshold
    listeners.forEach(({ id, type, threshold, thresholdStep, callback }) => {
        if (type === 'position') {
            const key = makeKey(id, type, threshold);
            if (scrollY >= threshold && !alreadyDispatched.has(key)) {
                callback(scrollY);
                alreadyDispatched.add(key);
            }
        }

        if (type === 'percentage') {
            if (thresholdStep == null) {
                const key = makeKey(id, type, threshold);
                if (scrollPercent >= threshold && !alreadyDispatched.has(key)) {
                    callback(scrollPercent);
                    alreadyDispatched.add(key);
                }
            } else {
                const maxStepReached =
                    Math.floor(scrollPercent / thresholdStep) * thresholdStep;
                for (
                    let percentToFire = threshold;
                    percentToFire <= maxStepReached;
                    percentToFire += thresholdStep
                ) {
                    const key = makeKey(id, type, percentToFire);
                    if (!alreadyDispatched.has(key)) {
                        callback(percentToFire);
                        alreadyDispatched.add(key);
                    }
                }
            }
        }
    });
};
