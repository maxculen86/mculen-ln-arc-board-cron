import { notequal } from '../../../../../../../../../content/sources/utils/pageSource/common/elements/common/strategy/notequal';

describe('Test Method atleastone sources-utils-pageSource-common-elements-common-strategy-notequal.js ', () => {
    const configBanner = {
        task: 'NotEqual',
        keyFind: 'sectionAliasMobile',
        value: 'apertura'
    };

    test('NotEqual value False Ok', () => {
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
        const elementsWithAtLeastOne = notequal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('NotEqual True Ok', () => {
        const element = {
            type: 0,
            sectionAliasMobile: 'tema',
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
        const elementsWithAtLeastOne = notequal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(true);
    });

    test('NotEqual when config no exist', () => {
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
                    _id: 'VDGHLKYFKZGKPA3ORSPDZCGGMN'
                }
            ],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = Object.assign([], configBanner);
        const lengthBannersPrevious = 3;
        const elementsWithAtLeastOne = notequal(
            element,
            null,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('NotEqual when kefind no exist', () => {
        const element = {
            type: 0,
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
        };
        const configElement = Object.assign([], configBanner);
        const lengthBannersPrevious = 3;
        const elementsWithAtLeastOne = notequal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(true);
    });

    test('NotEqual when minLengthBannersPrevious is older', () => {
        const element = {
            type: 0,
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
        };
        const configElement = {
            task: 'NotEqual',
            minLengthBannersPrevious: 2
        };

        const lengthBannersPrevious = 1;
        const elementsWithAtLeastOne = notequal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });

    test('NotEqual when typeValue is distinct', () => {
        const element = {
            type: 0,
            information: {},
            articles: [],
            configurations: { arcSite: 'la-nacion-ar' },
            sectionWeb: 'Apertura'
        };
        const configElement = {
            task: 'NotEqual',
            keyFind: 'articles',
            typeValue: [],
            minLength: 0
        };

        const lengthBannersPrevious = 1;
        const elementsWithAtLeastOne = notequal(
            element,
            configElement,
            lengthBannersPrevious
        );
        expect(elementsWithAtLeastOne).toEqual(false);
    });
});
