const stripHtml = (text = '') =>
    text.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ');

const joinParts = parts =>
    parts.reduce((accumulator, part) => {
        if (!part) {
            return accumulator;
        }

        return accumulator ? `${accumulator} ${part}` : part;
    }, '');

const getTableText = (item = {}) => {
    const headerText = (item.header || []).map(column =>
        stripHtml(column?.content || '')
    );
    const rowText = (item.rows || []).flatMap(row =>
        row.map(column => stripHtml(column?.content || ''))
    );

    return joinParts([...headerText, ...rowText]);
};

function getElementText(item = {}) {
    if (item.type === 'text' || item.type === 'header') {
        return stripHtml(item.content || '');
    }

    if (item.type === 'list') {
        const listParts = (item.items || []).map(listItem => {
            if (
                listItem.type === 'text' ||
                (!listItem.type && listItem.content)
            ) {
                return stripHtml(listItem.content || '');
            }

            return getElementText(listItem);
        });

        return joinParts(listParts);
    }

    if (item.type === 'quote') {
        const quoteText = joinParts(
            (item.content_elements || []).map(contentElement =>
                getElementText(contentElement)
            )
        );
        const quoteAuthor =
            item.subtype === 'pullquote'
                ? stripHtml(item?.citation?.content || '')
                : '';

        return joinParts([quoteText, quoteAuthor]);
    }

    if (item.type === 'table') {
        return getTableText(item);
    }

    return '';
}

function getElementsText(contentElements = []) {
    if (!contentElements) {
        return '';
    }

    const parts = contentElements.map(item => getElementText(item));
    return joinParts(parts);
}

export default getElementsText;
