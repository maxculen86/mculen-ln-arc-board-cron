import {
    replaceAllUrlsResizerObject,
    replaceAllUrlsResizerArray
} from '../../../../../components/private/LN/common/utils/mediaHelper.js';
import wikiSourceData from '../../../../../__mocks__/data/wikiTag/wikiSourceData.json';
import wikiSourceDataResizerReplaced from '../../../../../__mocks__/data/wikiTag/wikiSourceDataResizerReplaced.json';
import wikiTagData from '../../../../../__mocks__/data/wikiTag/wikiTagData.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('mediaHelper util replaceUrlsResizedToWWW', () => {
    describe('replaceUrls in object', () => {
        const cases = [
            [
                'replace correctly',
                wikiSourceData,
                wikiSourceDataResizerReplaced
            ],
            ['return same object', wikiTagData, wikiTagData],
            ['return object empty (send empty)', {}, {}],
            ['return object empty (send undefined)', undefined, {}],
            ['return null', null, null],
            ['return array empty', [], []]
        ];
        test.each(cases)('%s', (message, first, resultExpected) => {
            const result = replaceAllUrlsResizerObject(first);
            expect(result).toEqual(resultExpected);
        });
    });

    describe('replaceUrls in Array', () => {
        const cases = [
            [
                'replace correctly',
                [wikiSourceData, { ...wikiSourceData, type: 2 }],
                [
                    wikiSourceDataResizerReplaced,
                    { ...wikiSourceDataResizerReplaced, type: 2 }
                ]
            ],
            ['return same array', [wikiTagData], [wikiTagData]],
            [
                'return array with object empty (send array with object empty)',
                [{}],
                [{}]
            ],
            [
                'return array with object empty (send array with undefined)',
                [undefined],
                [{}]
            ],
            ['return array with null', [null], [null]],
            ['return array empty', [], []]
        ];
        test.each(cases)('%s', (message, first, resultExpected) => {
            const result = replaceAllUrlsResizerArray(first);
            expect(result).toEqual(resultExpected);
        });
    });
});
