import collection from '../../../../../../../__mocks__/data/collection/RNZ32HBHMRBGHJGFC4PNMCZUF4.json';
import { getCollectionNotes } from '../../../../../../../components/private/LN/api/common/collection';

describe('components - private - LN - api - common - collection - index', () => {
    it('Should return array notes of collection with correct properties - getCollectionNotes', () => {
        const response = getCollectionNotes(collection);

        expect(response).toBeTruthy();
        expect(Object.keys(response[0]).sort()).toEqual(
            ['bajada', 'titulo', 'url', 'imagen'].sort()
        );
    });

    it('Should return empty array - getCollectionNotes', () => {
        collection.content_elements = [];
        const response = getCollectionNotes(collection);

        expect(response).toHaveLength(0);
    });
});
