import ampCarouselValidation from '../../../../../../../components/private/common/utils/scripts/amp/ampCarouselValidation';
import { evaluateFunctionInclusion } from '../../../../../../../components/private/common/utils/scripts/amp/helper';
import articleWithGallery from '../../../../../../../__mocks__/data/articles/ICFK2KOK4JGCPMURVDYAT4RFLU.json';
import articleWithoutGallery from '../../../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';

describe('ampCarouselValidation with and without gallery element', () => {
    it('Expect to throw correct value from ampCarouselValidation', () => {
        let loadCarrousel = ampCarouselValidation(articleWithGallery);
        expect(loadCarrousel).toBe(true);

        loadCarrousel = ampCarouselValidation(articleWithoutGallery);
        expect(loadCarrousel).toBe(false);
    });
});

describe('evaluateFunctionInclusion and evaluateFunctionInclusion test', () => {
    const scripsConfig = [
        {
            customElement: 'amp-sidebar',
            src: 'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js'
        },
        {
            customElement: 'amp-carousel',
            src: 'https://cdn.ampproject.org/v0/amp-carousel-0.1.js',
            validateInclusion: globalContent =>
                ampCarouselValidation(globalContent)
        },
        {
            customElement: 'amp-ad',
            src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
        },
        {
            customElement: 'amp-sticky-ad',
            src: 'https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js'
        },
        {
            customElement: 'amp-iframe',
            src: 'https://cdn.ampproject.org/v0/amp-iframe-0.1.js'
        },
        {
            customElement: 'amp-analytics',
            src: 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js'
        },
        {
            customElement: 'amp-social-share',
            src: 'https://cdn.ampproject.org/v0/amp-social-share-0.1.js'
        }
    ];

    const contentFeatures = [];

    it('Should have a lenght of 7 and amp-carrousel must load', () => {
        let scriptsToLoad = [];
        scripsConfig.forEach(configElement => {
            const loadScript = evaluateFunctionInclusion(
                configElement,
                articleWithGallery
            );

            loadScript && scriptsToLoad.push(configElement);
        });
        expect(scriptsToLoad.length).toBe(7);
        expect(
            evaluateFunctionInclusion(scripsConfig[1], articleWithGallery)
        ).toBe(true);
    });
    it('Should have a lenght of 6 and amp-carrousel mustnt load', () => {
        let scriptsToLoad = [];
        scripsConfig.forEach(configElement => {
            const loadScript = evaluateFunctionInclusion(
                configElement,
                articleWithoutGallery
            );

            loadScript && scriptsToLoad.push(configElement);
        });
        expect(scriptsToLoad.length).toBe(6);
        expect(
            evaluateFunctionInclusion(scripsConfig[1], articleWithoutGallery)
        ).toBe(false);
    });
});
