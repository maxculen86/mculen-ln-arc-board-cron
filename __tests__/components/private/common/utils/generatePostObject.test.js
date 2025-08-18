import { generatePostObject } from '../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';
import mockLiveBlogGlobalContent from '../../../../../__mocks__/data/articles/6IDQHDUT6RB6XEHG2F424TMNXI.json';
import { createISODate } from '../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';

const PLACEHOLDER = 'placeholderLN-600x60.jpg';
const urlNota =
    'https://www.lanacion.com.ar/ciencia/paaawer-ap-dos-nid15062022/';
const postObjects = generatePostObject(
    mockLiveBlogGlobalContent,
    urlNota,
    PLACEHOLDER
);

describe('Generate post object function', () => {
    it('should build an object with length of 3', () => {
        expect(postObjects.length).toBe(3);
    });

    it('should include the expected headline and an isoDate for each object', () => {
        const expectedHeadlines = [
            'Gym 1 Ciudad Plateada',
            'Gym 2 ciudad Celeste',
            'Gym 3 ciudad Carmin'
        ];

        postObjects.forEach((element, i) => {
            expect(element.headline).toBe(expectedHeadlines[i]);
            expect(element.datePublished).not.toBe('');
        });
    });

    test('should create ISO Date with valid date and time', () => {
        const isoDate = createISODate('2023-12-13', '14:30:00');
        expect(isoDate).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}Z/);
    });

    test('should create ISO Date with valid date and empty time', () => {
        const isoDate = createISODate('2023-12-13', '');
        expect(isoDate).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}Z/);
    });

    test('should create ISO Date with valid date and undefined time', () => {
        const isoDate = createISODate('2023-12-13', undefined);
        expect(isoDate).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}Z/);
    });

    const testCases = [
        [
            'should return an empty string if time is invalid',
            '2023-12-13',
            'InvalidTime',
            ''
        ],
        ['should return an empty string if date is empty', '', '', ''],
        [
            'should return an empty string if date is undefined',
            undefined,
            undefined,
            ''
        ]
    ];

    test.each(testCases)('%s', (_description, date, time, expected) => {
        const isoDate = createISODate(date, time);
        expect(isoDate).toBe(expected);
    });
});

describe('Generate post object - oembed_response handling', () => {
    it('should add description only for mapped subtype (twitter)', () => {
        const post1 = postObjects[0];
        expect(post1.articleBody).toMatch(
            /Publicación de X incluida como parte de la cobertura en vivo\./
        );

        const post2 = postObjects[1];
        expect(post2.articleBody).not.toMatch(
            /Publicación de .* incluida como parte de la cobertura en vivo\./
        );
        expect(post2.articleBody).not.toMatch(/undefined/);

        const post3 = postObjects[2];
        expect(post3.articleBody).not.toMatch(/undefined/);
    });

    it('should never contain "undefined" in any articleBody', () => {
        postObjects.forEach(p => {
            expect(p.articleBody).not.toMatch(/undefined/);
        });
    });
});
