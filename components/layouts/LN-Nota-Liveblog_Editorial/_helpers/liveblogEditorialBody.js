import { convertMillisecondsToMinutes } from '../../../features/LN-common/LN10_En_Vivo/_helpers';
import { supportedTypes } from '../../../features/LN-nota/body/_utils/_bodyRules';
import { getAuthorsNameAndLink } from '../../../private/common/audioNews/helpers';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';
import { monthNames } from '../../../private/common/utils/dateAndTimeUtil';
import get from '../../../private/common/utils/get';

export function isLiveblogMarker(element) {
    return (
        element.type === 'custom_embed' && element.subtype === 'custom-liveblog'
    );
}

export function getContentBeforeLiveblogPosts(contentElements) {
    if (!Array.isArray(contentElements)) return [];

    const firstMarkerIndex = contentElements.findIndex(isLiveblogMarker);

    return firstMarkerIndex === -1
        ? contentElements
        : contentElements.slice(0, firstMarkerIndex);
}

export function groupByLiveblogMarkers(contentElements) {
    if (!Array.isArray(contentElements) || contentElements.length === 0) {
        return [];
    }

    const initialState = {
        groups: [],
        currentGroup: [],
        currentGroupName: null,
        liveblogStarted: false
    };

    const result = contentElements.reduce((acc, element) => {
        if (!acc.liveblogStarted && !isLiveblogMarker(element)) {
            return acc;
        }

        if (isLiveblogMarker(element)) {
            if (acc.currentGroup.length) {
                acc.groups.push({
                    id: acc.currentGroupName,
                    items: acc.currentGroup
                });
            }

            acc.currentGroup = [element];
            const { _id: id } = element;
            acc.currentGroupName = `liveblog_${id}`;
            acc.liveblogStarted = true;
            return acc;
        }

        acc.currentGroup.push(element);
        return acc;
    }, initialState);

    if (result.currentGroup.length) {
        result.groups.push({
            id: result.currentGroupName,
            items: result.currentGroup
        });
    }

    return result.groups;
}

export function reorderGroupsByPinnedBlock(groups) {
    let latestPinnedItem = null;
    let pinnedGroupIndex = -1;

    groups.forEach((group, groupIndex) => {
        group.items.forEach(item => {
            const isItemPinned = get(item, 'embed.config.isPinned', false);
            const pinnedTimestamp = get(item, 'embed.config.pinnedAt', null);

            if (isItemPinned && pinnedTimestamp) {
                const pinnedDate = new Date(pinnedTimestamp);
                const latestPinnedTimestamp = get(
                    latestPinnedItem,
                    'embed.config.pinnedAt',
                    null
                );

                if (
                    !latestPinnedTimestamp ||
                    pinnedDate > new Date(latestPinnedTimestamp)
                ) {
                    latestPinnedItem = item;
                    pinnedGroupIndex = groupIndex;
                }
            }
        });
    });

    if (pinnedGroupIndex === -1) return groups;

    const reorderedGroups = [
        {
            ...groups[pinnedGroupIndex],
            isPinned: true
        },
        ...groups.slice(0, pinnedGroupIndex),
        ...groups.slice(pinnedGroupIndex + 1)
    ];

    return reorderedGroups;
}

export const supportedTypesLiveblog = [
    ...supportedTypes,
    'video_jw',
    'raw_html',
    'gallery',
    'custom_embed',
    'quote',
    'table',
    'divider',
    'canchallena',
    'blockquote',
    'interstitial_link',
    'list',
    'pullquote',
    'power-up-receta',
    'custom-parallax',
    'header'
];

export const formatDateToSpanish = dateStr => {
    if (!dateStr || typeof dateStr !== 'string') return '';

    const [year, month, day] = dateStr.split('-');

    const dayFormatted = day.padStart(2, '0');
    const monthName = monthNames[Number(month) - 1];

    if (!monthName) return '';

    return `${dayFormatted} de ${capitalizeFirstLetter(monthName)} de ${year}`;
};

export const calculateTimePublish = (config = {}, currentDate = new Date()) => {
    if (!config || Object.keys(config).length === 0) return {};

    const { date: dateC, time: timeToUse, showCustomTime } = config;
    if (showCustomTime || !dateC || !timeToUse) return {};

    const publishDate = new Date(`${dateC}T${timeToUse}`);

    const diffMs = currentDate.getTime() - publishDate.getTime();
    const diffMinutes = convertMillisecondsToMinutes(diffMs);

    if (diffMinutes < 60) {
        return { relative: `Hace ${diffMinutes} min` };
    }

    if (diffMinutes <= 120) {
        return { relative: 'Hace una hora' };
    }

    const date = formatDateToSpanish(dateC);

    const match = timeToUse.match(/\d{2}:\d{2}/);
    const time = match ? match[0] : null;

    return { time, date };
};

export const getLiveblogHeaderData = post => {
    const items = get(post, 'items', []);
    const liveblogElement = items.find(isLiveblogMarker);
    if (!liveblogElement) return null;

    const data = get(liveblogElement, 'embed.config', {});
    const showCustomTime = get(data, 'showCustomTime', false);
    const customTimeOrText = showCustomTime
        ? get(data, 'customTime', '')
        : null;
    const authors = get(data, 'authors', []);
    const { author } = getAuthorsNameAndLink(authors);
    const photo = get(authors[0], 'photo', '');
    const hasAuthors = author || authors.length > 0;
    const { time, date, relative } = calculateTimePublish(data);
    const title = get(data, 'title', '');
    const position = 'Top';

    return {
        authors,
        author,
        photo,
        hasAuthors,
        date,
        time,
        title,
        position,
        relative,
        customTimeOrText
    };
};

export const copyToClipboard = id => {
    if (!id) return;
    const url = new URL(window.location.href);
    url.hash = id;
    navigator.clipboard.writeText(url.toString());
};

export const extractVisibleItemsWithShowMore = (items = []) => {
    let textCount = 0;

    const cutoffIndex = items.findIndex(item => {
        if (item.type === 'text' && item.content?.trim()) {
            // eslint-disable-next-line no-plusplus
            textCount++;
            return textCount === 2;
        }
        return false;
    });

    const visibleItems =
        cutoffIndex === -1 ? [...items] : items.slice(0, cutoffIndex + 1);
    const hiddenItems = cutoffIndex === -1 ? [] : items.slice(cutoffIndex + 1);

    const isExpandable = hiddenItems.length > 0;

    return { visibleItems, hiddenItems, isExpandable };
};
