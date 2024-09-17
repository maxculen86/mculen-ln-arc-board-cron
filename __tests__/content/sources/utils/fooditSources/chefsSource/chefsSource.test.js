import request from 'request-promise-native';
import authorFetch from '../../../../../../__mocks__/data/author/authorFetch.json';
import chefsSource from '../../../../../../content/sources/chefsSource';

jest.mock('fusion:environment', () => ({
    CONTENT_BASE: 'https://api.sandbox.lanacionar.arcpublishing.com',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com'
}));

jest.mock('request-promise-native');

jest.mock('../../../../../../components/private/common/utils/logger', () => {
    const push = jest.fn();
    return { push };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

const imageResizerV2 =
    'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fsandbox.lanacionar%2FJ43DRG7ZGZCANB6PYJG2VQ35QY.jpg?&width=280&quality=70&smart=false';
const responseWithResizerV2 = {
    ...authorFetch,
    image: { url: imageResizerV2 }
};

request.mockResolvedValue(authorFetch);

describe('Content - Sources - Utils - FooditSources - chefsSource', () => {
    const { fetch } = chefsSource;

    it('should test fetch function of chefsSource', () => {
        const query = { _id: 'juan-pravata-666', website: 'foodit' };

        fetch(query, {
            cachedCall: jest.fn()
        }).then(response => {
            expect(response).toEqual(responseWithResizerV2);
            expect(request).toHaveBeenCalledWith({
                uri:
                    'https://api.sandbox.lanacionar.arcpublishing.com/author/v1/author-service?website=foodit&_id=juan-pravata-666',
                json: true
            });

            expect(request).toHaveBeenCalledTimes(1);
        });
    });
});
