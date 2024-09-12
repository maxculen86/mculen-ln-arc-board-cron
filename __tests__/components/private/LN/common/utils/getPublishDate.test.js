import { getPublishDate } from '../../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';

describe('getPublishDate function', () => {
    it('should return displayDate if firstPublishedDate is not defined', () => {
        const displayDate = '2024-09-03T06:00:00Z';
        const result = getPublishDate(undefined, displayDate);
        expect(result).toBe(displayDate);
    });

    it('should return displayDate if it is before firstPublishedDate', () => {
        const firstPublishedDate = '2024-09-03T06:00:00Z';
        const displayDate = '2024-09-02T06:00:00Z';
        const result = getPublishDate(firstPublishedDate, displayDate);
        expect(result).toBe(displayDate);
    });

    it('should return firstPublishedDate if displayDate is later', () => {
        const firstPublishedDate = '2024-09-03T06:00:00Z';
        const displayDate = '2024-09-04T06:00:00Z';
        const result = getPublishDate(firstPublishedDate, displayDate);
        expect(result).toBe(firstPublishedDate);
    });

    it('should return displayDate if both dates are the same', () => {
        const firstPublishedDate = '2024-09-03T06:00:00Z';
        const displayDate = '2024-09-03T06:00:00Z';
        const result = getPublishDate(firstPublishedDate, displayDate);
        expect(result).toBe(firstPublishedDate);
    });
});
