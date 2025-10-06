const ARGENTINA_TIME_ZONE = 'America/Argentina/Buenos_Aires';
const TIMELINE_LOCALE = 'es-AR';
const TIMELINE_TIME_FORMAT_OPTIONS = {
    timeZone: ARGENTINA_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
};

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

export const formatTimelineTime = isoString => {
    if (!isoString) return '';

    const parsedDate = new Date(isoString);
    if (isInvalidDate(parsedDate)) return '';

    const formatter = getTimelineFormatter();
    const formattedTime = formatter.format(parsedDate);

    // Normalize 24:XX to 00:XX format
    return formattedTime.replace(/^24:/, '00:');
};
