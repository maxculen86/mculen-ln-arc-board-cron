const ARGENTINA_TIME_ZONE = 'America/Argentina/Buenos_Aires';
const TIMELINE_LOCALE = 'es-AR';
const TIMELINE_TIME_FORMAT_OPTIONS = {
    timeZone: ARGENTINA_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
};
const INLINE_TIME_PATTERN = /^\d{2}:\d{2}$/;
const ISO_TIME_SUFFIX_PATTERN = /(Z|[+-]\d{2}:?\d{2})$/i;

let timelineTimeFormatter = null;

const getTimelineFormatter = () => {
    if (!timelineTimeFormatter) {
        timelineTimeFormatter = new Intl.DateTimeFormat(
            TIMELINE_LOCALE,
            TIMELINE_TIME_FORMAT_OPTIONS
        );
    }
    return timelineTimeFormatter;
};

const isInvalidDate = date => Number.isNaN(date.getTime());

const isInlineTime = value => INLINE_TIME_PATTERN.test(value);
const hasTimezoneSuffix = value => ISO_TIME_SUFFIX_PATTERN.test(value);
const isIsoWithoutTimezone = value =>
    value.includes('T') && !hasTimezoneSuffix(value);
const extractTimeFromIso = value => {
    const [, timePart = ''] = value.split('T');
    return timePart.slice(0, 5);
};

const formatStringTime = value => {
    const trimmed = value.trim();
    if (isInlineTime(trimmed)) return trimmed;
    if (isIsoWithoutTimezone(trimmed)) return extractTimeFromIso(trimmed);
    return null;
};

export const formatTimelineTime = value => {
    if (!value) return '';

    if (typeof value === 'string') {
        const formatted = formatStringTime(value);
        if (formatted) return formatted;
    }

    const parsedDate = new Date(value);
    if (isInvalidDate(parsedDate)) return '';

    const formatter = getTimelineFormatter();
    const formattedTime = formatter.format(parsedDate);

    // Normalize 24:XX to 00:XX format
    return formattedTime.replace(/^24:/, '00:');
};
