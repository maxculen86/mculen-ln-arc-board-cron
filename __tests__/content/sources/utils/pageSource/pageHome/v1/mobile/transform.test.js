import transformHomeV1 from '../../../../../../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform';
import transformLayout from '../../../../../../../../components/private/LN/api/global/page/index';
import pageHomeMain from '../../../../../../../../__mocks__/data/pages/preLayout/LN-Home_Main.json';

import 'regenerator-runtime/runtime';

jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true',
        API_ENV: 'sandbox',
        SITE_LANACION: 'https://sandbox.lanacion.com.ar/'
    };
});

jest.mock(
    '../../../../../../../../components/private/common/utils/logger',
    () => {
        const push = jest.fn();
        return { push };
    }
);

describe('Test transform page', () => {
    test('When data received is Ok', async () => {
        const queryParams = {
            rootPath: `http://localhost/homepage`,
            ticksCache: '01',
            website: 'la-nacion-ar',
            isPage: true
        };
        const pageLayoutLNMain = transformLayout(pageHomeMain);
        expect(pageLayoutLNMain.content_elements.length).toBe(25);
        const result = await transformHomeV1(pageLayoutLNMain, queryParams);
        expect(result.length).toBe(31);
    });

    test('When data received is Empty', async () => {
        try {
            console.warn = jest.fn(a => {
                expect(a).toContain('Missing data Layout');
            });
            const queryParams = {
                rootPath: `http://localhost/homepage`,
                ticksCache: '01',
                website: 'la-nacion-ar',
                isPage: true
            };
            await transformHomeV1({}, queryParams);
        } catch (error) {
            expect(error.message).toContain('Missing data Layout');
        }
    });
});
