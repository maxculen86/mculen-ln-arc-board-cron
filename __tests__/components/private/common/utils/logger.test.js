import logger from '../../../../../components/private/common/utils/logger';
import error404 from '../../../../../__mocks__/data/logger/error404.json';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => [301, 302, 404]
}));

const commonArgs = [
    error404,
    {
        source: 'content/source/articleSourceNota/addFollowAnotherNoteData',
        url: 'GYKI2Q22GRE2HKGL4PGNGOXA6Y'
    },
    'la-nacion-ar'
];

const pushCases = [
    [...commonArgs, true],
    [...commonArgs, false]
];

describe('logger push justWarning cases', () => {
    test.each(pushCases)('', (error, config, site, justWarning) =>
        justWarning
            ? expect(() =>
                  logger.push(error, config, site, justWarning)
              ).not.toThrow()
            : expect(() =>
                  logger.push(error, config, site, justWarning)
              ).toThrow()
    );
});
