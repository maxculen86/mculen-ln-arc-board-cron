import 'regenerator-runtime/runtime';
import getFieldInBox from '../../../../../../../content/sources/utils/pageSource/common/utils/getFieldsBox';

const pageElements = [
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

describe('Test Method getFieldsBox  sources-utils-pageSource-common-utils-getFieldsBox ', () => {
    test('getFieldsBox Ok', () => {
        const elements = Object.assign([], pageElements);
        const result = getFieldInBox(
            pageElements,
            'envivo',
            'sectionAliasMobile',
            'articles'
        );
        expect(result.length).toEqual(3);
        expect(result[2]).toEqual(
            expect.objectContaining({ _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMN' })
        );
    });
    test('getFieldsBox when pageElements is null', () => {
        const result = getFieldInBox(
            null,
            'envivo',
            'sectionAliasMobile',
            'articles'
        );

        expect(result).toBeNull();
    });
});
