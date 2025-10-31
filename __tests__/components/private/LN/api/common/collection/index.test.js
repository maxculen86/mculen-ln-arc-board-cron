import collection from '../../../../../../../__mocks__/data/collection/RNZ32HBHMRBGHJGFC4PNMCZUF4.json';
import {
    getCollectionNotes,
    getChainCollectionFormated
} from '../../../../../../../components/private/LN/api/common/collection';
describe('components - private - LN - api - common - collection - index', () => {
    describe('Should return array notes of collection with correct properties', () => {
        it('Should return array notes of collection with correct properties - getCollectionNotes', () => {
            const response = getCollectionNotes(collection);

            expect(response).toBeTruthy();
            expect(Object.keys(response[0]).sort()).toEqual(
                ['bajada', 'titulo', 'url', 'imagen'].sort()
            );
        });

        it('Should return array notes of collection with correct properties - getChainCollectionFormated', () => {
            const response = getChainCollectionFormated(collection);

            expect(response).toBeTruthy();
            const keys = Object.keys(response[0]).sort();
            expect(keys).toEqual(
                [
                    'categoria',
                    'id',
                    'templateId',
                    'sitioId',
                    'url',
                    'titulo',
                    'volanta',
                    'autores',
                    'authors',
                    'marquesina',
                    'seccionPadre',
                    'opinion',
                    'enviarApps',
                    'fechaPublicacion',
                    'openingMode',
                    'distributor',
                    'videoData',
                    'videoLoop',
                    'bajada',
                    'imagen',
                    'videoYouTube',
                    'widgetEmbed',
                    'embed',
                    'badgeStyle',
                    'badge',
                    'chapita',
                    'isListenable'
                ].sort()
            );
        });
    });

    describe('Should return empty array', () => {
        it('Should return empty array - getCollectionNotes', () => {
            collection.content_elements = [];
            const response = getCollectionNotes(collection);

            expect(response).toHaveLength(0);
        });
        it('Should return empty array - getChainCollectionFormated', () => {
            collection.content_elements = [];
            const response = getChainCollectionFormated(collection);

            expect(response).toHaveLength(0);
        });
    });
});
