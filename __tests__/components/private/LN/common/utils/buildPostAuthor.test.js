import get from '../../../../../../components/private/common/utils/get';
import { buildPostAuthor } from '../../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';

jest.mock('../../../../../../components/private/common/utils/get');

describe('buildPostAuthor', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the default author when no authors are found', () => {
        get.mockReturnValue([]);

        const post = {};
        const result = buildPostAuthor(post);

        expect(result).toEqual([
            {
                '@type': 'Person',
                name: 'Redacción LA NACION'
            }
        ]);
        expect(get).toHaveBeenCalledWith(post, 'embed.config.authors', []);
    });

    it('should return the default author when the result is not an array', () => {
        get.mockReturnValue(null);

        const post = {};
        const result = buildPostAuthor(post);

        expect(result).toEqual([
            {
                '@type': 'Person',
                name: 'Redacción LA NACION'
            }
        ]);
    });

    it('should return only valid authors with a name', () => {
        const rawAuthors = [
            { name: 'José Del Rio' },
            { name: 'María Pérez' },
            { name: '' },
            null,
            undefined,
            { name: null }
        ];
        get.mockReturnValue(rawAuthors);

        const post = {};
        const result = buildPostAuthor(post);

        expect(result).toEqual([
            { '@type': 'Person', name: 'José Del Rio' },
            { '@type': 'Person', name: 'María Pérez' }
        ]);
    });

    it('should correctly handle a single valid author', () => {
        const rawAuthors = [{ name: 'Carlos Smith' }];
        get.mockReturnValue(rawAuthors);

        const result = buildPostAuthor({});

        expect(result).toEqual([{ '@type': 'Person', name: 'Carlos Smith' }]);
    });
});
