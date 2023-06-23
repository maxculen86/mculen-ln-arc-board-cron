import { generatePostObject } from '../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';
import mockLiveBlogGlobalContent from '../../../../../__mocks__/data/articles/6IDQHDUT6RB6XEHG2F424TMNXI.json';

const PLACEHOLDER = 'placeholderLN-600_amp.jpg';
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
});
