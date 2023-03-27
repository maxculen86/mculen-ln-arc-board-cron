import CardAuthor from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardAuthor/index';
import { CardBasic } from '../../../../../../../../../../components/private/LN/api/common/article/cardBasic/index';
import { CardRegular } from '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardRegular/index';

jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/cardBasic/index',
    () => ({
        CardBasic: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../../../components/private/LN/api/v1/mobile/home/article/cardRegular/index',
    () => ({
        CardRegular: jest.fn()
    })
);

describe('CardAuthor', () => {
    beforeEach(() => {
        CardBasic.mockClear();
        CardRegular.mockClear();
    });
    afterEach(() => {
        CardBasic.mockClear();
        CardRegular.mockClear();
    });

    test('returns CardRegular if article has more than 2 authors', () => {
        // Arrange
        const article = { autores: ['John Doe', 'Jane Doe', 'Jim Doe'] };
        CardBasic.mockReturnValueOnce({ autores: article.autores });
        const expected = { autores: article.autores, opinion: true };
        CardRegular.mockReturnValueOnce({});

        // Act
        const result = CardAuthor(article);

        // Assert
        expect(result).toEqual(expected);
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
        expect(CardRegular).toHaveBeenCalledTimes(0);
    });

    test('returns CardBasic if article has 2 or fewer authors', () => {
        // Arrange
        const article = { autores: ['John Doe', 'Jane Doe'] };
        const expected = { autores: article.autores, opinion: true };
        CardBasic.mockReturnValue(expected);

        // Act
        const result = CardAuthor(article);

        // Assert
        expect(result).toEqual(expected);
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
        expect(CardRegular).not.toHaveBeenCalled();
    });
});
