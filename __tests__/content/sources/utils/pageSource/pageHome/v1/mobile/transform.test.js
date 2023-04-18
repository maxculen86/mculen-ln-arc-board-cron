import 'regenerator-runtime/runtime';
import transformHomeV1 from '../../../../../../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform';
import transformLayout from '../../../../../../../../components/private/LN/api/global/page/index';
import pageHomeMain from '../../../../../../../../__mocks__/data/pages/preLayout/LN-Home_Main.json';
/* 
jest.mock(
    '../../../../../../../../components/private/common/utils/logger',
    () => {
        const push = jest.fn();
        return { push };
    }
);

jest.mock(
    '../../../../../../../../components/private/LN/api/global/page/config/configToDividebyDiagramation.js',
    () => {
        return {
            __esModule: true,
            configToDividebyDiagramation: layout => {
                switch (layout) {
                    case 'LN10-Home_Main':
                        return [
                            'grillaUltimasNoticias',
                            'left-focal',
                            'opinion4',
                            'opinion8'
                        ];
                        break;
                    case 'configIsNull':
                        return null;

                    default:
                        return [];
                        break;
                }
            }
        };
    }
);


jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/banners/index.js',
    () => {
        return {
            __esModule: true,
            setBannerByLayout: layout => {
                switch (layout) {
                   return [];
                }
            }
        };
    }
);


jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/titles/index.js',
    () => {
        return {
            __esModule: true,
            setTitleByLayout: layout => {
                switch (layout) {
                   return [];
                }
            }
        };
    }
);


jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/dolars/index.js',
    () => {
        return {
            __esModule: true,
            setDolarByLayout: layout => {
                switch (layout) {
                   return [];
                }
            }
        };
    }
);

jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/sections/index.js',
    () => {
        return {
            __esModule: true,
            moveSections: layout => {
                switch (layout) {
                   return [];
                }
            },
            divideSectionsByDiagramation: layout => {
                switch (layout) {
                   return [];
                }
            }
        };
    }
);

 */
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
