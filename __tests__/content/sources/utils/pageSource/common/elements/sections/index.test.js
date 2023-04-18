import 'regenerator-runtime/runtime';
import { moveElementsByKey } from '../../../../../../../../components/private/LN/api/global/page/common/utils/moveElements';
import { segmentSectionbyDiagramation } from '../../../../../../../../components/private/LN/api/global/page/common/utils/divideElements';
import {
    moveSections,
    divideSectionsByDiagramation
} from '../../../../../../../../content/sources/utils/pageSource/common/elements/sections/index';

jest.mock(
    '../../../../../../../../components/private/LN/api/global/page/common/utils/moveElements.js',
    () => {
        return {
            __esModule: true,
            moveElementsByKey: (
                configElementToMove,
                sectionWeb,
                keySectionWeb,
                elementsPageHome
            ) => {
                if (sectionWeb === 'Null') {
                    return null;
                }

                return [];
            }
        };
    }
);

jest.mock(
    '../../../../../../../../components/private/LN/api/global/page/common/utils/divideElements.js',
    () => {
        return {
            __esModule: true,
            segmentSectionbyDiagramation: (
                elementsPageHome,
                configDivideByDiagramation
            ) => {
                if (!configDivideByDiagramation) {
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
describe('Test Methods Sections sources-utils-pageSource-common-elements-sections-index', () => {
    const configMovePositions = {
        App_Anexo_1: { sectionWeb: 'Apertura', position: 'start' }
    };

    const configToDividebyDiagramation = [
        'grillaUltimasNoticias',
        'left-focal',
        'opinion4',
        'opinion8'
    ];
    test('moveSections Ok', () => {
        const newElements = Object.assign([], elements);
        const result = moveSections(newElements, configMovePositions);
        expect(result).not.toBeNull();
    });

    test('moveSections when moveElementsByKey return null', () => {
        const newElements = Object.assign([], elements);
        const result = moveSections(newElements, {
            Null: {}
        });
        expect(result).toBeNull();
    });

    test('divideSectionsByDiagramation Ok', () => {
        const newElements = Object.assign([], elements);
        const result = divideSectionsByDiagramation(
            newElements,
            configToDividebyDiagramation
        );
        expect(result).not.toBeNull();
    });

    test('divideSectionsByDiagramation when configToDividebyDiagramation is null', () => {
        const newElements = Object.assign([], elements);
        const result = divideSectionsByDiagramation(newElements, null);
        expect(result.length).toEqual(2);
        expect(result[0]).toEqual(expect.objectContaining(elements[0]));
    });
});
