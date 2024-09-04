import request from 'request-promise-native';
import authorFetch from '../../../../../../__mocks__/data/author/authorFetch.json';

import chefsSource from '../../../../../../content/sources/chefsSource';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com'
}));

jest.mock('request-promise-native');

jest.mock('../../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

const mockFetch = authorFetch;

request.mockResolvedValue(mockFetch);

describe('Content - Sources - Utils - FooditSources - chefsSource', () => {
    const { fetch } = chefsSource;

    it('should test fetch function of chefsSource', () => {
        const query = { _id: 'juan-pravata-666', website: 'foodit' };

        fetch(query, {
            cachedCall: jest.fn()
        }).then(response => {
            expect(response).toEqual(mockFetch);
            expect(request).toHaveBeenCalledWith({
                uri:
                    'https://api.sandbox.lanacionar.arcpublishing.com/author/v1/author-service?website=foodit&_id=juan-pravata-666',
                json: true
            });

            expect(request).toHaveBeenCalledTimes(1);
        });
    });
});
