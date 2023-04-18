import 'regenerator-runtime/runtime';
import { setTitleBySectionAlias } from '../../../../../../../../content/sources/utils/pageSource/common/elements/titles/index';

jest.mock(
    '../../../../../../../../content/sources/utils/pageSource/common/elements/titles/config/configTitlePositionbySection.js',
    () => {
        return {
            __esModule: true,
            default: layout => {
                switch (layout) {
                    case 'LN10-Home_Main_bottom':
                        return {
                            apertura: {
                                type: 4,
                                sectionAliasMobile: 'Title',
                                parameterToClone: {
                                    keyFind: 'sectionAliasMobile',
                                    value: 'envivo',
                                    fieldToClone: 'information'
                                },
                                position: 'bottom'
                            }
                        };
                        break;
                    case 'LN10-Home_Main_start':
                        return {
                            apertura: {
                                type: 4,
                                sectionAliasMobile: 'Title',
                                position: 'start'
                            }
                        };
                        break;
                    case 'sectionAliasMobileNotExists':
                        return {
                            'ln-common/ln10_editorial': {
                                type: 4,
                                sectionAliasMobile: 'Title',
                                parameterToClone: {
                                    keyFind: 'sectionAliasMobile',
                                    value: 'ln-common/ln10_opinion',
                                    fieldToClone: 'information'
                                },
                                position: 'start'
                            }
                        };
                    case 'configIsNull':
                        return null;

                    default:
                        return {};
                        break;
                }
            }
        };
    }
);

jest.mock(
    '../../../../../../../../components/private/LN/api/global/page/common/utils/addElements.js',
    () => {
        return {
            __esModule: true,
            addElementsByKey: (
                configElementToAdd,
                sectionAliasMobile,
                keySectionAliasMobile,
                elementsPageHome
            ) => {
                console.log(sectionAliasMobile);
                if (sectionAliasMobile === 'addElementsByKeyNull') {
                    return null;
                }
                return [];
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
describe('Test Methods Title sources-utils-pageSource-common-elements-titles-index ', () => {
    test('setTitleBySectionAlias position Bottom Ok', () => {
        const newElements = Object.assign([], elements);
        const result = setTitleBySectionAlias(
            newElements,
            'LN10-Home_Main_bottom'
        );
        expect(result).not.toBeNull();
        expect(result).toEqual([]);
    });

    test('setTitleBySectionAlias position Start Ok', () => {
        const newElements = Object.assign([], elements);
        const result = setTitleBySectionAlias(
            newElements,
            'LN10-Home_Main_start'
        );
        expect(result).not.toBeNull();
        expect(result).toEqual([]);
    });
    test('setTitleBySectionAlias when sectionAliasMobile Not Exists', () => {
        const newElements = Object.assign([], elements);
        const result = setTitleBySectionAlias(
            newElements,
            'sectionAliasMobileNotExists'
        );
        expect(result).not.toBeNull();
        expect(result).toEqual([]);
    });
    test('setTitleBySectionAlias when config no exist', () => {
        const newElements = Object.assign([], elements);
        const result = setTitleBySectionAlias(newElements, null);
        expect(result.length).toEqual(2);
    });
});
