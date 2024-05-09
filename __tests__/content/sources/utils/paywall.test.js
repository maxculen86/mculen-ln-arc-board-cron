import {
    setCallback,
    addRandomParam
} from '../../../../content/sources/utils/paywall';

jest.mock('../../../../content/sources/utils/paywall', () => ({
    ...jest.requireActual('../../../../content/sources/utils/paywall'),
    addRandomParam: jest.fn()
}));

describe('content - sources - utils - paywall', () => {
    global.Buffer = {
        from: jest.fn(() => ({
            toString: () => 'mockedBase64String'
        }))
    };
    it('should generate the correct base64 encoded URL with parameters', () => {
        addRandomParam.mockImplementation(_url => '?R=randomParam');

        const host = 'https://lanacion.com.ar';
        const path = '/sociedad/dengue/';
        const utmMedium = 'medium';
        const utmSource = 'source';
        const utmCampaign = 'campaign';
        const utmContent = 'content';
        const utmTerm = 'term';

        const result = setCallback(
            host,
            path,
            utmMedium,
            utmSource,
            utmCampaign,
            utmContent,
            utmTerm
        );

        expect(result).toEqual(
            Buffer.from(
                `${host}${path}?R=randomParam&utm_medium=${utmMedium}&utm_source=${utmSource}&utm_campaign=${utmCampaign}&utm_content=${utmContent}&utm_term=${utmTerm}`
            ).toString('base64')
        );
    });

    it('should generate the correct base64 encoded URL without parameters', () => {
        addRandomParam.mockImplementation(_url => '?R=randomParam');

        const host = 'https://lanacion.com.ar';
        const path = '/sociedad/dengue/';

        const result = setCallback(host, path);

        expect(result).toEqual(
            Buffer.from(`${host}${path}?R=randomParam`).toString('base64')
        );
    });
});
