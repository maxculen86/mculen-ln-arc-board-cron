let idCounter = 0;
const genId = (prefix = 'id') => `${prefix}-${++idCounter}`;

export const createTextItem = (overrides = {}) => ({
    _id: genId('text'),
    type: 'text',
    content: 'Some text',
    ...overrides
});

export const createNonTextItem = (overrides = {}) => ({
    _id: genId('image'),
    type: 'image',
    ...overrides
});

export const createListItem = (items = [], overrides = {}) => ({
    _id: genId('list'),
    type: 'list',
    items,
    ...overrides
});
