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
    test('Equal when element is null', () => {
        const configElement = Object.assign([], configBanner);
        const lengthBannersPrevious = 2;
        const elementsWithAtLeastOne = equal(
            null,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('Equal when lengthBannersPrevious >= configElement.minLengthBannersPrevious', () => {
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
        configElement.minLengthBannersPrevious = 1;
        const lengthBannersPrevious = 2;
        const elementsWithAtLeastOne = equal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('Equal when elementFind is null', () => {
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
        configElement.keyFind = 'lalala';
        const lengthBannersPrevious = 2;
        const elementsWithAtLeastOne = equal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('Equal when typeValue is not equal', () => {
        const element = {
            type: 0,
            sectionAliasMobile: 'apertura',
            information: {},
            articles: { a: 'b' },
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = Object.assign([], configBanner);
        configElement.minLengthBannersPrevious = 1;
        configElement.typeValue = 1;
        const lengthBannersPrevious = 0;
        const elementsWithAtLeastOne = equal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('Equal when maxLength > element.lenght', () => {
        const element = {
            type: 0,
            sectionAliasMobile: 'apertura',
            information: {},
            articles: [1, 2, 3, 4],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = Object.assign([], configBanner);
        configElement.minLengthBannersPrevious = 3;
        configElement.maxLength = 3;
        const lengthBannersPrevious = 0;

        const elementsWithAtLeastOne = equal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('Equal when value is not equal', () => {
        const element = {
            type: 0,
            sectionAliasMobile: 'apertura',
            information: {},
            articles: [1, 2, 3, 4],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = Object.assign([], configBanner);
        configElement.minLengthBannersPrevious = 3;
        configElement.value = [1, 2, 3, 4];
        const lengthBannersPrevious = 0;
        const elementsWithAtLeastOne = equal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });
});
