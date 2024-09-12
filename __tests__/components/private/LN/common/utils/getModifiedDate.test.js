import { getModifiedDate } from '../../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';

describe('getModifiedDate function', () => {
    it('should return displayDate if lastUpdatedDate is not defined', () => {
        const displayDate = '2024-09-03T06:00:00Z';
        const result = getModifiedDate(undefined, displayDate);
        expect(result).toBe(displayDate);
    });

    it('should return displayDate if it is after lastUpdatedDate', () => {
        const lastUpdatedDate = '2024-09-02T06:00:00Z';
        const displayDate = '2024-09-03T06:00:00Z';
        const result = getModifiedDate(lastUpdatedDate, displayDate);
        expect(result).toBe(displayDate);
    });

    it('should return lastUpdatedDate if displayDate is older', () => {
        const lastUpdatedDate = '2024-09-04T06:00:00Z';
        const displayDate = '2024-09-03T06:00:00Z';
        const result = getModifiedDate(lastUpdatedDate, displayDate);
        expect(result).toBe(lastUpdatedDate);
    });

    it('should return displayDate if both dates are the same', () => {
        const lastUpdatedDate = '2024-09-03T06:00:00Z';
        const displayDate = '2024-09-03T06:00:00Z';
        const result = getModifiedDate(lastUpdatedDate, displayDate);
        expect(result).toBe(lastUpdatedDate);
    });
});
