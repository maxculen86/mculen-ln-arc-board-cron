import getAuthorsInfo from '../../../../../components/private/common/utils/getAuthorsInfo';

describe('utils - getAuthorsInfo', () => {
    it('should return correct authors information', () => {
        const mockArticle = {
            credits: {
                by: [
                    {
                        _id: 'elisabetta-pique',
                        type: 'author',
                        name: 'Elisabetta Piqué'
                    },
                    {
                        _id: 'ariel-torres',
                        type: 'author',
                        name: 'Ariel Torres'
                    },
                    {
                        name: 'Leo Mechi',
                        type: 'author'
                    }
                ]
            }
        };

        const expectedOutput = {
            authorsName: 'Elisabetta Piqué, Ariel Torres, Leo Mechi',
            authorsIds: 'elisabetta-pique, ariel-torres, no_url',
            authorTypes: 'author, author, author'
        };

        expect(getAuthorsInfo(mockArticle)).toEqual(expectedOutput);
    });

    it('should return empty strings if there are no authors', () => {
        const expectedOutput = {
            authorsName: '',
            authorsIds: '',
            authorTypes: ''
        };

        expect(getAuthorsInfo(null)).toEqual(expectedOutput);
    });
});
