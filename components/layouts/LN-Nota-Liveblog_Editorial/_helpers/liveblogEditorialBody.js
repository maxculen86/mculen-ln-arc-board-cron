import { convertMillisecondsToMinutes } from '../../../features/LN-common/LN10_En_Vivo/_helpers';
import { supportedTypes } from '../../../features/LN-nota/body/_utils/_bodyRules';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';
import { monthNames } from '../../../private/common/utils/dateAndTimeUtil';
import get from '../../../private/common/utils/get';
import isCustomLiveblog from '../../../private/common/utils/isCustomLiveblog';
import { isMarker } from '../../helpers/groupingUtils';

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

    return [
        {
            ...groups[pinnedGroupIndex],
            isPinned: true
        },
        ...groups.slice(0, pinnedGroupIndex),
        ...groups.slice(pinnedGroupIndex + 1)
    ];
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

    const publishDate = new Date(`${dateC}T${timeToUse}-03:00`);

    const diffMs = currentDate.getTime() - publishDate.getTime();
    const diffMinutes = convertMillisecondsToMinutes(diffMs);

    if (diffMinutes < 60) {
        return { relative: `Hace ${diffMinutes} min` };
    }

    const localTime = publishDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    if (diffMinutes <= 720) {
        return { time: localTime };
    }

    const date = formatDateToSpanish(dateC);

    return { time: localTime, date };
};

const normalizeAuthorsData = (authors = []) =>
    authors.reduce((acc, author) => {
        if (!author) return acc;

        const id = get(author, 'id') || '';
        const name = get(author, 'name', '');
        const link = get(author, 'link') || (id ? `/autor/${id}/` : '');
        const photo = get(author, 'photo', '');
        const role = get(author, 'role', '');

        acc.push({ name, link, photo, role });
        return acc;
    }, []);

const buildSignature = (authors = []) => {
    const normalizedAuthorsDatas = normalizeAuthorsData(authors);
    const hasMultiple = normalizedAuthorsDatas.length > 1;

    const photo = hasMultiple ? null : normalizedAuthorsDatas[0]?.photo;
    const author =
        normalizedAuthorsDatas.length === 1
            ? {
                  name: normalizedAuthorsDatas[0].name,
                  link: normalizedAuthorsDatas[0].link
              }
            : null;
    const authorsList = normalizedAuthorsDatas.map(({ name, link }) => ({
        name,
        link
    }));

    const role =
        normalizedAuthorsDatas.length === 1
            ? normalizedAuthorsDatas[0]?.role
            : null;

    return { author, authors: authorsList, photo, role };
};

export const getLiveblogHeaderData = post => {
    const items = get(post, 'items', []);
    const liveblogElement = items.find(element =>
        isMarker(element, 'custom-liveblog')
    );
    if (!liveblogElement) return null;

    const data = get(liveblogElement, 'embed.config', {});
    const showCustomTime = get(data, 'showCustomTime', false);
    const customTimeOrText = showCustomTime
        ? get(data, 'customTime', '')
        : null;
    const rawAuthors = get(data, 'authors', []);
    const { author, authors, photo, role } = buildSignature(rawAuthors);
    const hasAuthors = Boolean(author || authors.length > 0);
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
        customTimeOrText,
        role
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
        if (
            get(item, 'type', '') === 'text' &&
            get(item, 'content', '').trim()
        ) {
            // eslint-disable-next-line no-plusplus
            textCount++;
            return textCount === 3;
        }
        return false;
    });

    const visibleItems =
        cutoffIndex === -1 ? [...items] : items.slice(0, cutoffIndex);
    const hiddenItems = cutoffIndex === -1 ? [] : items.slice(cutoffIndex);

    const isExpandable = hiddenItems.length > 0;

    return { visibleItems, hiddenItems, isExpandable };
};

export const shouldShowTopDivider = (index, posts) => {
    const currentPost = posts[index];
    return index === 0 && !currentPost?.isPinned;
};

export const getPostRenderData = grupo => {
    const liveblogHeader = getLiveblogHeaderData(grupo);

    const contentItems = get(grupo, 'items', []).filter(
        item => !isCustomLiveblog(item)
    );

    const { visibleItems, hiddenItems, isExpandable } =
        extractVisibleItemsWithShowMore(contentItems);

    const displayTime =
        liveblogHeader?.relative ||
        liveblogHeader?.time ||
        liveblogHeader?.customTimeOrText;

    const dataAuthor = {
        author: liveblogHeader.author,
        authors: liveblogHeader.authors,
        showSignatureWithAuthors: liveblogHeader.hasAuthors,
        position: liveblogHeader.position,
        size: 12,
        photo: liveblogHeader.photo,
        role: liveblogHeader.role,
        shouldShowRole: !!liveblogHeader.author && !liveblogHeader.title
    };

    return {
        id: grupo.id,
        isPinned: grupo.isPinned,
        title: liveblogHeader.title,
        isExpandable,
        visibleItems,
        headerProps: {
            displayTime,
            date: liveblogHeader.date,
            title: liveblogHeader.title,
            dataAuthor
        },
        expandableProps: {
            hiddenTextItems: hiddenItems,
            visibleItems
        }
    };
};
