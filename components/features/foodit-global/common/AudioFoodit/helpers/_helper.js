export function createScript() {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src =
        'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';
    return script;
}
export function createPlayer({
    idArticle,
    projectId,
    setSegmentIndex,
    setContentAvailable,
    setIsAudioPlaying
}) {
    // eslint-disable-next-line no-undef
    const player = new BeyondWords.Player({
        target: '.audio-player',
        projectId,
        sourceId: idArticle,
        playbackRates: [1, 1.25, 1.5, 1.7, 2],
        playbackState: 'playing',
        skipButtonStyle: 'auto',
        widgetStyle: 'none',
        playlistToggle: 'hide',
        logoIconEnabled: false,
        textColor: '#323232',
        backgroundColor: '#fefefe',
        iconColor: '#323232',
        highlightColor: 'none'
    });
    player.addEventListener('CurrentSegmentUpdated', e => {
        setSegmentIndex(e?.segmentIndex);
        const { segmentIndex: index } = e;
        const segmentsLength = player?.content[0]?.segments?.length;

        if (index > 1 && index < segmentsLength - 1) {
            player.playbackState = 'paused';
        }
    });

    player.addEventListener('PressedSegment', () => {
        player.playbackState = 'paused';
    });

    player.addEventListener('ContentAvailable', () =>
        setContentAvailable(true)
    );

    player.addEventListener('PlaybackPaused', () => setIsAudioPlaying(false));

    player.addEventListener('PlaybackPlaying', () => setIsAudioPlaying(true));

    player.addEventListener('NoContentAvailable', () => {
        console.error('Error no se encontro audio');
    });
    return player;
}

export function getSteps(contentElement) {
    const createStepList = (accumulator, currentValue) => {
        if (currentValue?.subtype === 'custom-preparacion') {
            const { titleList = '', items = [] } =
                currentValue?.embed?.config || {};
            const objectPreparacion = items.map((step, index) => ({
                indexList: index,
                showTitle: index === 0,
                titleList,
                step
            }));
            return [...accumulator, ...objectPreparacion];
        }
        return accumulator;
    };

    return contentElement.reduce(createStepList, []);
}

function isMediaElement(element) {
    if (!element) return false;

    return element.type === 'image' || element.subtype === 'video_jw';
}

function findPreviousHeader(
    contentElements,
    startIndex,
    preparationHeaderIndex
) {
    for (let j = startIndex - 2; j > preparationHeaderIndex; j -= 1) {
        if (contentElements[j]?.type === 'header') {
            return contentElements[j].content;
        }
    }
    return 'Preparación';
}

function getTitleForList(contentElements, listIndex, preparationHeaderIndex) {
    const previousElement = contentElements[listIndex - 1];

    if (previousElement?.type === 'header') {
        return previousElement.content;
    }

    if (isMediaElement(previousElement)) {
        return findPreviousHeader(
            contentElements,
            listIndex,
            preparationHeaderIndex
        );
    }

    return null;
}

function isEndOfPreparationSection(
    element,
    currentIndex,
    preparationHeaderIndex
) {
    return (
        element.type === 'header' &&
        element.level <= 3 &&
        currentIndex > preparationHeaderIndex + 1
    );
}

function hasValidPreparationHeaders(contentElements, preparationHeaderIndex) {
    for (
        let i = preparationHeaderIndex + 1;
        i < contentElements.length;
        i += 1
    ) {
        const element = contentElements[i];

        if (isEndOfPreparationSection(element, i, preparationHeaderIndex)) {
            break;
        }

        if (element.type === 'list' && element.items?.length > 0) {
            return true;
        }
    }
    return false;
}

function findValidPreparationSection(contentElements) {
    for (
        let startIndex = 0;
        startIndex < contentElements.length;
        startIndex += 1
    ) {
        const element = contentElements[startIndex];

        if (element.content?.toLowerCase().includes('preparación')) {
            if (hasValidPreparationHeaders(contentElements, startIndex)) {
                return startIndex;
            }
        }
    }

    return -1;
}

function collectValidLists(contentElements, preparationHeaderIndex) {
    const validLists = [];

    for (
        let i = preparationHeaderIndex + 1;
        i < contentElements.length;
        i += 1
    ) {
        const element = contentElements[i];

        if (isEndOfPreparationSection(element, i, preparationHeaderIndex)) {
            break;
        }

        if (element.type === 'list') {
            const titleList = getTitleForList(
                contentElements,
                i,
                preparationHeaderIndex
            );
            if (titleList) {
                validLists.push({ list: element, title: titleList });
            }
        }
    }

    return validLists;
}

function processListsByTitle(validLists) {
    const titleGroups = new Map();

    validLists.forEach(({ list, title }) => {
        if (!titleGroups.has(title)) {
            titleGroups.set(title, []);
        }
        titleGroups.get(title).push(list);
    });

    const result = [];
    titleGroups.forEach((lists, title) => {
        let currentIndex = 0;

        lists.forEach((list, groupIndex) => {
            const mappedItems = list.items.map((item, itemIndex) => ({
                indexList: currentIndex + itemIndex,
                showTitle: groupIndex === 0 && itemIndex === 0,
                titleList: title,
                step: item.content
            }));

            currentIndex += list.items.length;
            result.push(...mappedItems);
        });
    });

    return result;
}

export function cleanHtmlTags(content) {
    if (!content) return '';

    return content.replace(/<[^>]*>/g, '').trim();
}

export function getPreparationItems(contentElements) {
    const preparationHeaderIndex = findValidPreparationSection(contentElements);

    if (preparationHeaderIndex === -1) {
        console.warn('No valid "Preparación" section found');
        return [];
    }

    const validLists = collectValidLists(
        contentElements,
        preparationHeaderIndex
    );
    return processListsByTitle(validLists);
}
