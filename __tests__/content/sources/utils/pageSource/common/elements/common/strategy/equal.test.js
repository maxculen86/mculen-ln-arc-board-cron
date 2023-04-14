import { equal } from '../../../../../../../../../content/sources/utils/pageSource/common/elements/common/strategy/equal';

describe('Test Method atleastone sources-utils-pageSource-common-elements-common-strategy-equal.js ', () => {
    const configBanner = {
        task: 'Equal',
        keyFind: 'articles',
        typeValue: [],
        minLength: 3,
        maxLength: 90
    };

    test('Equal False Ok', () => {
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
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = Object.assign([], configBanner);
        const lengthBannersPrevious = 3;
        const elementsWithAtLeastOne = equal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('Equal True Ok', () => {
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
        const elementsWithAtLeastOne = equal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(true);
    });
});
