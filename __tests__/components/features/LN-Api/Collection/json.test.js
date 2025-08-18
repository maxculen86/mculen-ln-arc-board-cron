import * as Collection from '../../../../../components/features/LN-Api/Collection/json';
import {
    getChainCollectionFormated,
    getCollectionNotes
} from '../../../../../components/private/LN/api/common/collection';
import collectionSourceResponse from '../../../../../__mocks__/data/collection/RNZ32HBHMRBGHJGFC4PNMCZUF4.json';
jest.mock('fusion:consumer', component => {
    return function (component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state = {};
            }
            fetchContent(param) {}
        };
    };
});
jest.mock('../../../../../components/private/LN/api/common/collection', () => ({
    getChainCollectionFormated: jest.fn(() => 'chain-transformed'),
    getCollectionNotes: jest.fn(() => 'external-transformed')
}));

describe('components - features - LN-Api - Collection - json.js', () => {
    describe('Check render', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should throw error if there is no collection', () => {
            const instance = new Collection.default({
                globalContent: null,
                requestUri: '/some-path'
            });
            const result = instance.render();
            expect(result).toEqual({
                Success: false,
                Message: 'No se encontro la collección.'
            });
        });

        it('should throw error if there are no notes in the collection', () => {
            const instance = new Collection.default({
                globalContent: { content_elements: [] },
                requestUri: '/otro-path'
            });
            const result = instance.render();
            expect(result).toEqual({
                Success: false,
                Message: 'La collección no contiene notas.'
            });
        });

        it('should use transformToChainCollectionNotes if requestUri matches the pattern', () => {
            const instance = new Collection.default({
                globalContent: { ...collectionSourceResponse },
                requestUri: '/api/mobile/v1/collections/byId/'
            });
            instance.render();
            expect(getChainCollectionFormated).toHaveBeenCalled();
        });

        it('should use transformToExternalClientNotes if requestUri matches the pattern', () => {
            const instance = new Collection.default({
                globalContent: { ...collectionSourceResponse },
                requestUri: '/collection/test'
            });
            instance.render();
            expect(getCollectionNotes).toHaveBeenCalled();
        });

        it('should use transformToExternalClientNotes if requestUri does not match', () => {
            const instance = new Collection.default({
                globalContent: { ...collectionSourceResponse },
                requestUri: '/other-collection/'
            });
            instance.render();
            expect(getCollectionNotes).toHaveBeenCalled();
        });
    });
});
