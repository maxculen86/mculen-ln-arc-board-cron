import { transformLastNewsContent } from '../../../../../../components/private/LN/common/utils/timeline';
import {
    isOlderThanXHoursAgo,
    hasFutureDisplayDate
} from '../../../../../../components/private/common/utils/dateAndTimeUtil';

jest.mock(
    '../../../../../../components/private/common/utils/dateAndTimeUtil',
    () => ({
        isOlderThanXHoursAgo: jest.fn(),
        hasFutureDisplayDate: jest.fn()
    })
);

describe('transformLastNewsContent', () => {
    const mockData = {
        content_elements: [
            {
                _id: '1',
                canonical_url: '/url1',
                display_date: '2024-08-30T13:06:05.809Z'
            },
            {
                _id: '2',
                canonical_url: '/url2',
                display_date: '2024-08-29T12:32:04.764Z'
            }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return transformed content elements with original display_date', () => {
        isOlderThanXHoursAgo.mockImplementation((date, hours) => false);
        hasFutureDisplayDate.mockImplementation(() => false);

        const result = transformLastNewsContent(mockData);

        expect(result).toEqual({
            content_elements: [
                {
                    _id: '1',
                    canonical_url: '/url1',
                    display_date: '2024-08-30T13:06:05.809Z',
                    website_url: '/url1'
                },
                {
                    _id: '2',
                    canonical_url: '/url2',
                    display_date: '2024-08-29T12:32:04.764Z',
                    website_url: '/url2'
                }
            ]
        });
        expect(isOlderThanXHoursAgo).toHaveBeenCalledTimes(2);
        expect(hasFutureDisplayDate).toHaveBeenCalledTimes(2);
    });

    it('should filter out content elements that are older than 24 hours', () => {
        isOlderThanXHoursAgo.mockImplementation((date, hours) => true);
        hasFutureDisplayDate.mockImplementation(() => false);

        const result = transformLastNewsContent(mockData);

        expect(result).toEqual({
            content_elements: []
        });
        expect(isOlderThanXHoursAgo).toHaveBeenCalledTimes(2);
        expect(hasFutureDisplayDate).toHaveBeenCalledTimes(0);
    });

    it('should filter out content elements with future display dates', () => {
        isOlderThanXHoursAgo.mockImplementation((date, hours) => false);
        hasFutureDisplayDate.mockImplementation(() => true);

        const result = transformLastNewsContent(mockData);

        expect(result).toEqual({
            content_elements: []
        });
        expect(isOlderThanXHoursAgo).toHaveBeenCalledTimes(2);
        expect(hasFutureDisplayDate).toHaveBeenCalledTimes(2);
    });

    it('should return null if data is undefined', () => {
        const result = transformLastNewsContent(undefined);

        expect(result).toBeNull();
    });
});
