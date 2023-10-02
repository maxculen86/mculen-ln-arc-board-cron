import { atleastone } from '../../../../../../../../../content/sources/utils/pageSource/common/elements/common/strategy/atleastone';

jest.mock(
    '../../../../../../../../../content/sources/utils/pageSource/common/elements/common/strategy/equal.js',
    () => {
        return {
            __esModule: true,
            equal: (element, configElement, lengthBannersPrevious) => {
                if (element) {
                    return true;
                }
                return false;
            }
        };
    }
);

describe('Test Method atleastone sources-utils-pageSource-common-elements-common-strategy-atleastone.js ', () => {
    const configBanner = {
        task: 'AtLeastOne',
        keyFind: 'type',
        conditions: [
            {
                minLengthElementsPrevious: 1
            },
            { minLengthElementsPrevious: 3 }
        ]
    };

    test('atleastone when 1 equal is true', () => {
        const element = {
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
                    _id: 'AI77BVNYNNBA3ICVBTEFVF5AGI'
                },
                {
                    _id: '5EOQSFDDRZCIXBGRUGKSRVSA3Y'
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = Object.assign([], configBanner);
        const lengthBannersPrevious = 3;
        const elementsWithAtLeastOne = atleastone(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(true);
    });

    test('atleastone when all equals is false', () => {
        const element = {
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
                    _id: 'AI77BVNYNNBA3ICVBTEFVF5AGI'
                },
                {
                    _id: '5EOQSFDDRZCIXBGRUGKSRVSA3Y'
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = Object.assign([], configBanner);
        const lengthBannersPrevious = 2;
        const elementsWithAtLeastOne = atleastone(
            null,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });
});
