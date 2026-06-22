export const normalizeDigitList = digits =>
    Array.isArray(digits)
        ? digits.map(digit => String(digit).trim()).filter(Boolean)
        : [];

export const hasStickyMobileSegmentationConfig = ({
    experimentName = '',
    segmentAndHide = false,
    testDigits = [],
    controlDigits = []
} = {}) =>
    Boolean(
        experimentName ||
            segmentAndHide ||
            normalizeDigitList(testDigits).length ||
            normalizeDigitList(controlDigits).length
    );
