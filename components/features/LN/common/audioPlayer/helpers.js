import getAudioEvents from './getAudioEvents';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import get from '../../../../private/common/utils/get';
import { scheduleTask } from '../../../../private/common/utils/scheduleTask';
import { audioPlayerStore } from './store/audioPlayerStore';

export const handleClickAudioNews = ({
    noteId,
    globalContent,
    globalContentConfig,
    isSummary,
    showVariantIa = false,
    closeTooltipIAAuthor,
    subscription,
    token,
    openBarrier
} = {}) => {
    if (subscription && token) {
        audioPlayerStore.open(noteId, { showVariantIa });
        if (closeTooltipIAAuthor) scheduleTask(() => closeTooltipIAAuthor());
    } else {
        openBarrier();
    }

    addEventToDataLayerV2({
        event: 'page_listened',
        rest: {
            ...getAudioEvents(globalContent, globalContentConfig, isSummary),
            reproduccion: '0'
        }
    });
};

export const getTextAndIconColor = (isSummary, variant) => {
    const defaultText = 'Escuchando';
    if (variant === 'ia') {
        const text = !isSummary ? 'Escuchando al autor' : defaultText;
        return { text, iconColor: '#27D2BE' };
    }
    return { text: defaultText, iconColor: '#808080' };
};

export const getDurations = bwContentItem => {
    if (!bwContentItem) return { full: 0, summary: 0 };
    const full = get(bwContentItem, 'duration', 0);
    const summary = get(bwContentItem, 'summarization.audio[0].duration', 0);
    return { full, summary };
};

export const getMode = player => (player?.summary ? 'summary' : 'full');

export const sendReproduction = (context, percentage) => {
    const { globalContent, globalContentConfig, player, isSummary } = context;
    const summaryFlag =
        typeof isSummary === 'boolean' ? isSummary : !!player?.summary;
    addEventToDataLayerV2({
        event: 'page_listened',
        rest: {
            ...getAudioEvents(globalContent, globalContentConfig, summaryFlag),
            reproduccion: String(percentage)
        }
    });
};

export const PROGRESS_AUDIO = [25, 50, 75];

const progressByAudioMode = {};
const buildAudioModeKey = (audioId, mode) => `${audioId}|${mode}`;
const createProgressState = total => ({
    total,
    sent25: false,
    sent50: false,
    sent75: false,
    sent100: false
});

const getTrackInfo = player => {
    const item = player.content?.[0];
    if (!item) return null;
    const mode = getMode(player);
    const { full, summary } = getDurations(item);
    const total = mode === 'summary' ? summary : full;
    if (!total) return null;
    return { key: buildAudioModeKey(item.id, mode), total };
};

const ensureProgress = player => {
    const info = getTrackInfo(player);
    if (!info) return null;
    const { key, total } = info;
    const prev = progressByAudioMode[key];
    if (!prev || prev.total !== total) {
        progressByAudioMode[key] = createProgressState(total);
    }
    return { key, progress: progressByAudioMode[key] };
};

export const emitPercentage = (player, progress, context) => {
    if (!progress.total) return progress;
    const percent = Math.floor(
        ((player.currentTime || 0) / progress.total) * 100
    );
    const sentCount =
        (progress.sent25 ? 1 : 0) +
        (progress.sent50 ? 1 : 0) +
        (progress.sent75 ? 1 : 0);
    if (sentCount === PROGRESS_AUDIO.length) return progress;
    let next = progress;
    PROGRESS_AUDIO.forEach(p => {
        const flag = `sent${p}`;
        if (!next[flag] && percent >= p) {
            if (next === progress) next = { ...progress };
            next[flag] = true;
            sendReproduction(context, p);
        }
    });
    return next;
};

export const emitCompletion = (progress, context) => {
    if (progress.sent100) return progress;
    sendReproduction(context, 100);
    return { ...progress, sent100: true };
};

const resetCurrentProgress = player => {
    const info = getTrackInfo(player);
    if (!info) return;
    progressByAudioMode[info.key] = createProgressState(info.total);
};

export const setupBwReproductionTracking = ({
    playerRef,
    globalContent,
    globalContentConfig,
    setContentAvailable,
    setSummaryAvailable,
    signal
}) => {
    const player = playerRef.current;
    if (!player) return;
    const context = { globalContent, globalContentConfig, player };
    player.addEventListener(
        'ContentAvailable',
        () => {
            setContentAvailable?.(true);
            // La disponibilidad del resumen solo se conoce acá (post-carga):
            // hay resumen si la pista de summarization tiene duración > 0.
            setSummaryAvailable?.(
                getDurations(player.content?.[0]).summary > 0
            );
            resetCurrentProgress(player);
        },
        { signal }
    );
    player.addEventListener(
        'PlaybackPlaying',
        () => resetCurrentProgress(player),
        { signal }
    );
    player.addEventListener(
        'CurrentTimeUpdated',
        () => {
            const ensured = ensureProgress(player);
            if (!ensured) return;
            const { key, progress } = ensured;
            progressByAudioMode[key] = emitPercentage(
                player,
                progress,
                context
            );
        },
        { signal }
    );
    player.addEventListener(
        'PlaybackEnded',
        () => {
            const ensured = ensureProgress(player);
            if (!ensured) return;
            const { key, progress } = ensured;
            progressByAudioMode[key] = emitCompletion(progress, context);
        },
        { signal }
    );
};
