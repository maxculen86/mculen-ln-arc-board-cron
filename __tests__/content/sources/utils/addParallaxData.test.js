import 'regenerator-runtime/runtime';
import addParallaxData from '../../../../content/sources/utils/addParallaxData';
import get from '../../../../components/private/common/utils/get';
import articleNoParallax from '../../../../__mocks__/data/articles/ICFK2KOK4JGCPMURVDYAT4RFLU.json';
import articleWithParallax from '../../../../__mocks__/data/nota/cuerpo/cuerpoConParallax.json';
import properties from '../../../../properties/sites/la-nacion-ar';
import getImageResized from '../../../../components/private/common/utils/getImageResized';

jest.mock('../../../../components/private/common/utils/getImageResized', () =>
    jest.fn()
);
describe('Article source nota - addParallaxData', () => {
    const presetsPromoItemsFotoAl100 = get(
        properties,
        'imageConfig.resize.fotoAl100.promo_items',
        null
    );
    const cachedCall = jest.fn();
    it('addParallaxData must return content_elements unmodified when there is no parallax', done => {
        const { content_elements: contentElements } = articleNoParallax;
        addParallaxData(contentElements, cachedCall, presetsPromoItemsFotoAl100)
            .then(response => {
                expect(response).toStrictEqual(contentElements);
            })
            .then(done);
    });

    it('addParallaxData must return parallax content_elements modified when present', done => {
        const {
            content_elements: contentElements,
            rawImagesData,
            resizedImagesData
        } = articleWithParallax;
        cachedCall
            .mockReturnValueOnce(Promise.resolve(rawImagesData[0]))
            .mockReturnValueOnce(Promise.resolve(rawImagesData[1]))
            .mockReturnValueOnce(Promise.resolve(rawImagesData[2]));

        getImageResized
            .mockReturnValueOnce(resizedImagesData[0])
            .mockReturnValueOnce(resizedImagesData[1])
            .mockReturnValueOnce(resizedImagesData[2]);

        addParallaxData(contentElements, cachedCall, presetsPromoItemsFotoAl100)
            .then(response => {
                const parallaxs = response.filter(
                    x =>
                        x.type == 'custom_embed' &&
                        x.subtype === 'custom-parallax'
                );
                expect(getImageResized).toBeCalledTimes(3);
                expect(response.length).toBe(9);
                expect(parallaxs.length).toBe(3);
                contentElements.forEach((element, index) => {
                    expect(element._id).toEqual(response[index]._id);
                });
                expect(response).toMatchSnapshot();
            })
            .then(done);
    });
});
