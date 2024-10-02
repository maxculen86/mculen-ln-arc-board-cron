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
    it('With the provided globalContent must build an object with length of 3', () => {
        expect(postObjects.length).toBe(3);
    });
    it('Every object must have the powerUp headline, and isoDate', () => {
        postObjects.forEach((element, i) => {
            expect(element.headline).toBe('Paaawer ap dos');
            expect(element.datePublished).not.toBe('');
        });
    });

    test('Create ISO Date with valid date and time', () => {
        const isoDate = createISODate('2023-12-13', '14:30:00');
        expect(isoDate).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}Z/);
    });

    test('Create ISO Date with valid date and empty time', () => {
        const isoDate = createISODate('2023-12-13', '');
        expect(isoDate).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}Z/);
    });

    test('Create ISO Date with valid date and undefined time', () => {
        const isoDate = createISODate('2023-12-13', undefined);
        expect(isoDate).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}Z/);
    });

    const testCases = [
        [
            'Si la fecha recibe InvalidTime, retorna un string vacío',
            '2023-12-13',
            'InvalidTime',
            ''
        ],
        ['Si la fecha es un string vacío, retorna un string vacío', '', '', ''],
        [
            'Si la fecha es undefined, retorna un string vacío',
            undefined,
            undefined,
            ''
        ]
    ];

    test.each(testCases)('%s', (description, date, time, expected) => {
        const isoDate = createISODate(date, time);
        expect(isoDate).toBe(expected);
    });
});
