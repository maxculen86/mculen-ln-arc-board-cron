import { ingredientsListReduce } from '../../../../../../../components/features/foodit-global/Body/PowerupsReceta/ingredientsBox/_helper';

describe('component - features - foodit-global - body - ingredientsListReduce', () => {
    it('should return only ingredient lists', () => {
        const input = [
            {
                typeList: 'ingredientes',
                items: [{ id: '1', includeInShoppingList: true }]
            },
            {
                typeList: 'otros',
                items: [{ id: '2', includeInShoppingList: false }]
            }
        ];
        const result = input.reduce(ingredientsListReduce, []);
        expect(result).toEqual([
            {
                typeList: 'ingredientes',
                items: [{ id: '1', includeInShoppingList: true }]
            }
        ]);
    });

    it('should return lists with filtered items', () => {
        const input = [
            {
                typeList: 'otros',
                items: [
                    { id: '1', includeInShoppingList: true },
                    { id: '2', includeInShoppingList: false }
                ]
            }
        ];
        const result = input.reduce(ingredientsListReduce, []);
        expect(result).toEqual([
            {
                typeList: 'otros',
                items: [{ id: '1', includeInShoppingList: true }]
            }
        ]);
    });

    it('should return empty array if no items to include in shopping list', () => {
        const input = [
            {
                typeList: 'otros',
                items: [{ id: '1', includeInShoppingList: false }]
            }
        ];
        const result = input.reduce(ingredientsListReduce, []);
        expect(result).toEqual([]);
    });
});
