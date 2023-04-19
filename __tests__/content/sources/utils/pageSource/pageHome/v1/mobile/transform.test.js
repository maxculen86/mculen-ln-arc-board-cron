import 'regenerator-runtime/runtime';
import transformHomeV1 from '../../../../../../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform';

const pageLayoutLNMain = {
    information: {
        layoutPage: 'LN10-Home_Main'
    },
    content_elements: [
        {
            type: 0,
            sectionAliasMobile: 'envivo',
            information: {},
            articles: [
                {
                    _id: '2PVUOH2SZVCTPFYRJXJW2N574A'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMM'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMN'
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        },
        {
            type: 0,
            sectionAliasMobile: 'apertura',
            information: {},
            articles: [
                {
                    _id: '2PVUOH2SZVCTPFYRJXJW2N574A'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMM'
                },
                {
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMN'
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        }
    ]
};
const mockSetVar = jest.fn();
const mockPageLayoutLNMainContent = jest.fn();

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
            default: () => {
                if (mockSetVar() === 'OK') {
                    return [
                        'grillaUltimasNoticias',
                        'left-focal',
                        'opinion4',
                        'opinion8'
                    ];
                }
                return null;
            }
        };
    }
);

jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/banners/index.js',
    () => {
        return {
            __esModule: true,
            setBannerByLayout: () => {
                return [];
            }
        };
    }
);

jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/titles/index.js',
    () => {
        return {
            __esModule: true,
            setTitleByLayout: () => {
                return [];
            }
        };
    }
);
jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/dolars/index.js',
    () => {
        return {
            __esModule: true,
            setDolarByLayout: () => {
                return [];
            }
        };
    }
);

jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/sections/index.js',
    () => {
        return {
            __esModule: true,
            moveSections: () => {
                if (mockSetVar() === 'OK') {
                    return mockPageLayoutLNMainContent();
                }
                return null;
            },
            divideSectionsByDiagramation: () => {
                if (mockSetVar() === 'OK') {
                    const resp = mockPageLayoutLNMainContent();
                    return resp;
                }
                return null;
            }
        };
    }
);

jest.mock(
    '../../../../../../../../components/private/LN/api/global/page/config/configToMoveBySection.js',
    () => {
        return {
            __esModule: true,
            default: () => {
                if (mockSetVar() === 'OK') {
                    return {
                        App_Anexo_1: {
                            sectionWeb: 'Apertura',
                            position: 'start'
                        }
                    };
                }
                return {};
            }
        };
    }
);

describe('Test transform page', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    const paramsQuery = {
        website: 'la-nacion-ar',
        versionUri: 1,
        namePage: 'home',
        ticks: '01',
        versionDeploy: null,
        useCookie: null
    };
    test('When transform v1 is Ok', async () => {
        mockSetVar.mockImplementation(() => 'OK');
        mockPageLayoutLNMainContent.mockImplementation(() => {
            return pageLayoutLNMain.content_elements;
        });

        const newPageLayoutLNMain = Object.assign([], pageLayoutLNMain);
        const result = await transformHomeV1(newPageLayoutLNMain, paramsQuery);
        expect(result.length).toBe(2);
    });

    test('When transform v1 when LayoutPage is null', async () => {
        try {
            const newPageLayoutLNMain = JSON.parse(
                JSON.stringify(pageLayoutLNMain)
            );

            newPageLayoutLNMain.information.layoutPage = null;
            const result = await transformHomeV1(
                newPageLayoutLNMain,
                paramsQuery
            );
        } catch (error) {
            expect(error.message).toContain('Missing data Layout');
        }
    });

    test('When transform v1 when information is undefined', async () => {
        try {
            const newPageLayoutLNMain = Object.assign([], pageLayoutLNMain);
            newPageLayoutLNMain.information = undefined;
            const result = await transformHomeV1(
                newPageLayoutLNMain,
                paramsQuery
            );
        } catch (error) {
            expect(error.message).toContain('Missing data Layout');
        }
    });

    test('When transform v1 when content_elements is undefined', async () => {
        try {
            const newPageLayoutLNMain = Object.assign([], pageLayoutLNMain);
            newPageLayoutLNMain.content_elements = undefined;
            const result = await transformHomeV1(
                newPageLayoutLNMain,
                paramsQuery
            );
        } catch (error) {
            expect(error.message).toContain(
                "Cannot read property 'information' of null"
            );
        }
    });
    test('When transform v1 when content_elements have type 9', async () => {
        const newPageLayoutLNMain = JSON.parse(
            JSON.stringify(pageLayoutLNMain)
        );
        newPageLayoutLNMain.content_elements[0].type = 9;
        mockPageLayoutLNMainContent.mockImplementation(() => {
            return newPageLayoutLNMain.content_elements;
        });
        const result = await transformHomeV1(newPageLayoutLNMain, paramsQuery);
        expect(result.length).toBe(1);
    });
});
