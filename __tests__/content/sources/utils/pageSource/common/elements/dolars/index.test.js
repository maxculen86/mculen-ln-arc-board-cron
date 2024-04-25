import 'regenerator-runtime/runtime';
import configDolarPositionbySection from '../../../../../../../../content/sources/utils/pageSource/common/elements/dolars/config/configDolarPositionbySection';
import { setDolarBySection } from '../../../../../../../../content/sources/utils/pageSource/common/elements/dolars/index';
import { getNavigationTreeSource } from '../../../../../../../../content/sources/utils/pageSource/common/elements/dolars/config/configNavigationTreeSource';

jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/dolars/config/configDolarPositionbySection.js',
    () => {
        return {
            __esModule: true,
            default: layout => {
                switch (layout) {
                    case 'LN10-Home_Main_bottom':
                        return {
                            Apertura: {
                                id: 2000,
                                type: 5,
                                sectionAliasMobile: 'Dolar',
                                position: 'bottom'
                            }
                        };
                        break;
                    case 'LN10-Home_Main_start':
                        return {
                            Apertura: {
                                id: 2000,
                                type: 5,
                                sectionAliasMobile: 'Dolar',
                                position: 'start'
                            }
                        };
                        break;

                    default:
                        return { [`${layout}`]: {} };
                        break;
                }
            }
        };
    }
);

jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/dolars/config/configNavigationTreeSource',
    () => ({
        getNavigationTreeSource: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../components/private/LN/api/global/page/common/utils/addElements.js',
    () => {
        return {
            __esModule: true,
            addElementsByKey: (
                configElementToAdd,
                sectionWeb,
                keySectionWeb,
                elementsPageHome
            ) => {
                if (configElementToAdd.sectionWeb === 'addElementsByKeyOK') {
                    return [{ elem1: 'aa' }, { elem2: 'bb' }];
                }
                if (configElementToAdd.sectionWeb === 'addElementsByKeyNull') {
                    return null;
                }

                const addElement = jest.requireActual(
                    '../../../../../../../../components/private/LN/api/global/page/common/utils/addElements.js'
                );
                return addElement.addElementsByKey(
                    configElementToAdd,
                    sectionWeb,
                    keySectionWeb,
                    elementsPageHome
                );
            }
        };
    }
);
const elements = [
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
];
describe('Test Methods Dolars sources-utils-pageSource-common-elements-dolars-index ', () => {
    test('setDolarBySection position Bottom Ok', async () => {
        getNavigationTreeSource.mockReturnValue({
            Termicas: { dolar: 'true' }
        });
        const newElements = Object.assign([], elements);
        const result = await setDolarBySection(
            newElements,
            'LN10-Home_Main_bottom'
        );
        expect(result.length).toEqual(3);
        expect(result[2]).toEqual(
            expect.objectContaining({
                id: 2000,
                type: 5,
                sectionAliasMobile: 'Dolar',
                position: 'bottom'
            })
        );
    });

    test('setDolarBySection position Start Ok', async () => {
        getNavigationTreeSource.mockReturnValue({
            Termicas: { dolar: 'true' }
        });
        const newElements = Object.assign([], elements);
        const result = await setDolarBySection(
            newElements,
            'LN10-Home_Main_start'
        );
        expect(result.length).toEqual(3);
        expect(result[0]).toEqual(
            expect.objectContaining({
                id: 2000,
                type: 5,
                sectionAliasMobile: 'Dolar',
                position: 'start'
            })
        );
    });

    test('setDolarBySection when Section No exists', async () => {
        getNavigationTreeSource.mockReturnValue({
            Termicas: { dolar: 'true' }
        });
        const result = await setDolarBySection([], 'Home_Main_bottom');
        expect(result.length).toEqual(0);
    });
});

describe('Test Methods Dolars Mock addElementsByKey sources-utils-pageSource-common-elements-dolars-index ', () => {
    test('setDolarBySection when addElementsByKey return value OK', async () => {
        getNavigationTreeSource.mockReturnValue({
            Termicas: { dolar: 'true' }
        });
        const result = await setDolarBySection([], 'addElementsByKeyOK');
        expect(result.length).toEqual(2);
    });

    test('setDolarBySection when addElementsByKey return null', async () => {
        getNavigationTreeSource.mockReturnValue({
            Termicas: { dolar: 'true' }
        });
        const result = await setDolarBySection([], 'addElementsByKeyNull');
        expect(result).toBeNull();
    });
});

describe('Test dolar Termica behavior', () => {
    test('setDolarBySection should not add dolar section to output if dolar Termica is off', async () => {
        getNavigationTreeSource.mockReturnValue({
            Termicas: { dolar: 'false' }
        });
        // the elements mock array is 2 elements long
        const newElements = Object.assign([], elements);
        const result = await setDolarBySection(newElements, 'DolarTermicaOff');
        expect(result.length).toEqual(2);
    });

    test('setDolarBySection should add dolar section to output if dolar Termina is on', async () => {
        const newElements = Object.assign([], elements);
        getNavigationTreeSource.mockReturnValue({
            Termicas: { dolar: 'true' }
        });
        const result = await setDolarBySection(
            newElements,
            'LN10-Home_Main_start'
        );
        expect(result.length).toEqual(3);
        expect(result[0]).toEqual(
            expect.objectContaining({
                id: 2000,
                type: 5,
                sectionAliasMobile: 'Dolar',
                position: 'start'
            })
        );
    });
});
