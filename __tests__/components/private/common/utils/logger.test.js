import logger, {
    regularFlow,
    setLNError
} from '../../../../../components/private/common/utils/logger';
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

describe('logger push justWarning cases - code 404', () => {
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

describe('Tests function regularFlow', () => {
    const error = {
        ...error404,
        statusCode: 302,
        message: 'Error 302'
    };

    const customsProps = {
        customErrorType: 'controlado',
        contentSource: 'ARC',
        statusCode: 302,
        url: null
    };

    const loggerExcludedErrors = [301, 302, 404];

    test('Test when loggerExcludedErrors is undefined', () => {
        expect(() =>
            regularFlow({
                error,
                customsProps,
                loggerExcludedErrors: undefined
            })
        ).toThrowError('Error 302');
    });

    test('Test when loggerExcludedErrors is an array from status code', () => {
        const error = {
            ...error404,
            statusCode: 301,
            message: 'Error 301'
        };
        const props = {
            ...customsProps,
            statusCode: 301
        };

        expect(() =>
            regularFlow({ error, customsProps: props, loggerExcludedErrors })
        ).toThrowError('Error 301');
    });

    test('Test when the error status code does not exist in the loggerExcludedErrors array', () => {
        const error = {
            ...error404,
            statusCode: 500,
            message: 'Error 500'
        };

        const props = {
            ...customsProps,
            statusCode: 500
        };

        expect(() =>
            regularFlow({ error, customsProps: props, loggerExcludedErrors })
        ).toThrowError('Error 500');
    });
});

describe('Test function setLNError', () => {
    test('should return a string with the status code and the message', () => {
        expect(
            setLNError({ statusCode: '404', message: 'Not found' })
        ).toStrictEqual('404 -  Not found');
    });

    test('should return a string with the message', () => {
        expect(
            setLNError({ statusCode: undefined, message: 'Not found' })
        ).toStrictEqual(' Not found');
    });

    test('should return a string with the statusCode', () => {
        expect(
            setLNError({ statusCode: 301, message: undefined })
        ).toStrictEqual('301 -  ');
    });

    test('should return a empty string', () => {
        expect(
            setLNError({ statusCode: undefined, message: undefined })
        ).toStrictEqual(' ');
    });
});
