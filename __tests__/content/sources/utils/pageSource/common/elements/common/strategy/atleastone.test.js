import { atleastone } from '../../../../../../../../../content/sources/utils/pageSource/common/elements/common/strategy/atleastone';

describe('Test Method atleastone sources-utils-pageSource-common-elements-common-strategy-atleastone.js ', () => {
    const configBanner = {
        task: 'AtLeastOne',
        keyFind: 'type',
        conditions: [
            {
                minLengthBannersPrevious: 1
            },
            { minLengthBannersPrevious: 3 }
        ]
    };

    test('atleastone False Ok', () => {
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
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('atleastone True Ok', () => {
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
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(true);
    });
});
