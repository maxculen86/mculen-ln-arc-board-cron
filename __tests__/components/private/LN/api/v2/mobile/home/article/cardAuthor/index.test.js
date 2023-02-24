import CardAuthor from '../../../../../../../../../../components/private/LN/api/v2/mobile/home/article/cardAuthor/index';
import { CardBasic } from '../../../../../../../../../../components/private/LN/api/common/article/cardBasic/index';
import { CardRegular } from '../../../../../../../../../../components/private/LN/api/v2/mobile/home/article/cardRegular/index';

jest.mock(
    '../../../../../../../../../../components/private/LN/api/common/article/cardBasic/index',
    () => ({
        CardBasic: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../../../components/private/LN/api/v2/mobile/home/article/cardRegular/index',
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
        CardRegular.mockReturnValueOnce({});

        // Act
        const result = CardAuthor(article);

        // Assert
        expect(result).toEqual({});
        expect(CardBasic).toHaveBeenCalledTimes(1);
        expect(CardBasic).toHaveBeenCalledWith(article);
        expect(CardRegular).toHaveBeenCalledTimes(1);
        expect(CardRegular).toHaveBeenCalledWith(article);
    });

    test('returns CardBasic if article has 2 or fewer authors', () => {
        // Arrange
        const article = { autores: ['John Doe', 'Jane Doe'] };
        const expected = { autores: article.autores };
        CardBasic.mockReturnValue(expected);

        // Act
        const result = CardAuthor(article);

        // Assert
        expect(result).toEqual(expected);
        expect(CardBasic).toHaveBeenCalledTimes(2);
        expect(CardBasic).toHaveBeenCalledWith(article);
        expect(CardRegular).not.toHaveBeenCalled();
    });
});
