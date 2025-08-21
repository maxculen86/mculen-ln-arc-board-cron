import get from '../../private/common/utils/get';

export const isMarker = (element, subtype, type = 'custom_embed') =>
    element?.type === type && element?.subtype === subtype;

export const getContentBeforeMarkers = (contentElements, markerType) => {
    if (!Array.isArray(contentElements)) return [];

    const firstMarkerIndex = contentElements.findIndex(element =>
        isMarker(element, markerType)
    );
    return firstMarkerIndex === -1
        ? contentElements
        : contentElements.slice(0, firstMarkerIndex);
};

const findFirstMarkerIndex = (elements, markerType) =>
    elements.findIndex(element => isMarker(element, markerType));

const createGroupId = (groupPrefix, firstElement) =>
    `${groupPrefix}_${get(firstElement, '_id', '')}`;

const createGroup = (groupPrefix, items) => ({
    id: createGroupId(groupPrefix, items[0]),
    items
});

const splitElementsByMarkers = (elements, markerType) => {
    const groups = [];
    const markerIndices = elements
        .map((element, index) => (isMarker(element, markerType) ? index : -1))
        .filter(index => index !== -1);

    for (let i = 0; i < markerIndices.length; i += 1) {
        const startIndex = markerIndices[i];
        const endIndex = markerIndices[i + 1] || elements.length;
        groups.push(elements.slice(startIndex, endIndex));
    }

    return groups;
};

export const groupByMarkers = (
    contentElements,
    markerType = 'custom-liveblog',
    groupPrefix = 'liveblog'
) => {
    if (!Array.isArray(contentElements) || !contentElements.length) return [];

    const firstMarkerIndex = findFirstMarkerIndex(contentElements, markerType);
    if (firstMarkerIndex === -1) return [];

    const relevantElements = contentElements.slice(firstMarkerIndex);
    const groupedElements = splitElementsByMarkers(
        relevantElements,
        markerType
    );

    return groupedElements.map(items => createGroup(groupPrefix, items));
};

export const getContentAfterMarkers = (contentElements, groups) => {
    if (!groups.length) return [];

    const lastGroup = groups[groups.length - 1];
    const lastElement = lastGroup.items[lastGroup.items.length - 1];
    const lastElementIndex = contentElements.findIndex(
        element => element === lastElement
    );

    return lastElementIndex >= 0 &&
        lastElementIndex < contentElements.length - 1
        ? contentElements.slice(lastElementIndex + 1)
        : [];
};
