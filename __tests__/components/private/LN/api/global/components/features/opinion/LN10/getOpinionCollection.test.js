import GetOpinionCollection from '../../../../../../../../../../components/private/LN/api/global/components/features/opinion/LN10/getOpinionCollection';

class MockGetOpinionCollection extends GetOpinionCollection {
    constructor(props) {
        super(props);
    }
    fetchContent(param) {}
}

describe('GetOpinionCollection', () => {
    it('should fetch content correctly', () => {
        const props = {
            customFields: {
                idCollection: '123',
                idCollectionOpinion: { filterRepetead: 'filter', id: '1234' },
                idCollectionEditorial: '5678',
                imageId: '9012'
            },
            renderables: []
        };
        const typeChain = 'default';

        const opinionCollection = new MockGetOpinionCollection(
            props,
            typeChain
        );

        jest.spyOn(opinionCollection, 'fetchContent');

        // Verificar que el fetchContent se llama con los valores esperados
        expect(opinionCollection.fetchContent).toHaveBeenCalledTimes(2);
        expect(opinionCollection.fetchContent).toHaveBeenCalledWith({
            articleListOpinion: {
                source: 'collectionsSource',
                query: {
                    id: '1234',
                    size: 20,
                    website: 'la-nacion-ar',
                    from: -1,
                    idsArticlesToExclude: [],
                    filterRecomendar: true,
                    filterRepetead: true,
                    notesQuantity: 0,
                    layout: ''
                },
                filter,
                sourceInclude
            }
        });
        expect(opinionCollection.fetchContent).toHaveBeenCalledWith({
            articleListEditorial: {
                source: 'collectionsSource',
                query: {
                    id: '5678',
                    size: 20,
                    website: 'la-nacion-ar',
                    from: -1,
                    idsArticlesToExclude: [],
                    filterRecomendar: true,
                    filterRepetead: true,
                    notesQuantity: 0,
                    layout: ''
                },
                filter,
                sourceInclude
            }
        });

        // Verificar que el renderResponse se llama con los valores esperados
        expect(opinionCollection.renderResponse).toHaveBeenCalledTimes(1);
        expect(opinionCollection.renderResponse).toHaveBeenCalledWith(
            props,
            articlesOpinion,
            articlesEditorial,
            image
        );
    });
});
