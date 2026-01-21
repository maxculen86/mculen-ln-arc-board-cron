import hasRenderableItems from '../../../../../../../components/features/LN/common/list/helpers/hasRenderableItems';
import {
    createTextItem,
    createNonTextItem,
    createListItem
} from '../../../../../../../__mocks__/data/LN/common/listMocks';

describe('hasRenderableItems', () => {
    it('returns false if items is not an array', () => {
        expect(hasRenderableItems(null)).toBe(false);
        expect(hasRenderableItems(undefined)).toBe(false);
        expect(hasRenderableItems({})).toBe(false);
    });

    it('returns false for an empty array', () => {
        expect(hasRenderableItems([])).toBe(false);
    });

    it('returns true if array contains a text item', () => {
        const items = [createTextItem()];
        expect(hasRenderableItems(items)).toBe(true);
    });

    it('returns false if array contains no renderable items', () => {
        const items = [createNonTextItem()];
        expect(hasRenderableItems(items)).toBe(false);
    });

    it('returns true if a nested list contains a text item', () => {
        const items = [createListItem([createListItem([createTextItem()])])];

        expect(hasRenderableItems(items)).toBe(true);
    });

    it('returns false if nested lists contain no text items', () => {
        const items = [createListItem([createListItem([])])];

        expect(hasRenderableItems(items)).toBe(false);
    });

    it('returns true for mixed content with at least one text item', () => {
        const items = [createNonTextItem(), createListItem([createTextItem()])];

        expect(hasRenderableItems(items)).toBe(true);
    });

    it('returns false for deeply nested empty lists', () => {
        const items = [createListItem([createListItem([])])];

        expect(hasRenderableItems(items)).toBe(false);
    });

    it('does not throw when list item has no items property', () => {
        const items = [createListItem(undefined)];

        expect(() => hasRenderableItems(items)).not.toThrow();
        expect(hasRenderableItems(items)).toBe(false);
    });
});
