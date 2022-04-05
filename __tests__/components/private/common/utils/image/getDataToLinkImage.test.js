import * as fusionConsumer from 'fusion:consumer';
import { shallow, mount } from 'enzyme';
import getProperties from 'fusion:properties';
import GetDataToLinkImage from '../../../../../../components/private/common/utils/image/getDataToLinkImage';
import getImage from '../../../../../../components/private/common/utils/image/getImage';

// Data
import bombaOculta from '../../../../../../__mocks__/data/renderables/bomba/bombaOculta';
import bombaVisible from '../../../../../../__mocks__/data/renderables/bomba/bombaVisible';
import dataApertura from '../../../../../../__mocks__/data/renderables/dataApertura2.json';
import bombaVisibleOnlyNoteId from '../../../../../../__mocks__/data/renderables/bomba/bombaVisibleOnlyNoteId';
import articleToExclude from '../../../../../../__mocks__/data/images/getDataToLinkImage/articleToExclude';
import globalContent from '../../../../../../__mocks__/data/images/getDataToLinkImage/globalContent';
import responseArticleSourceNota from '../../../../../../__mocks__/data/images/getDataToLinkImage/responseArticleSourceNota';
import responseRelatedImageSource from '../../../../../../__mocks__/data/images/getDataToLinkImage/responseRelatedImageSource';
import LinkImagePreload from '../../../../../../components/private/LN/common/utils/mediaHelper';

jest.mock(
    '../../../../../../components/private/common/utils/image/getImage',
    () => jest.fn()
);

describe('Common - GetDataToLinkImage', () => {
    /////////// NOTA ///////////
    describe('When section is note,', () => {
        const expected = `<link rel=\"preload\" as=\"image\" href=\"https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg\" imagesrcset=\"https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 879w,https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 1119w,https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 768w\"/>`;

        it('with resized Media, return array media data', () => {
            const wrapper = shallow(
                GetDataToLinkImage({
                    data: globalContent,
                    section: 'nota'
                })
            );
            expect(wrapper.html()).toEqual(expected);
        });

        it('without resized Media, return empty Array', () => {
            const wrapper = shallow(
                GetDataToLinkImage({ data: {}, section: 'nota' })
            );
            expect(wrapper.isEmptyRender()).toEqual(true);
        });

        it('STORYTELLING or FOTOAL100 without promo_items.storytelling_mobile, return array media data', () => {
            const wrapper1 = shallow(
                GetDataToLinkImage({
                    data: { ...globalContent, subtype: '4' },
                    section: 'nota'
                })
            );
            expect(wrapper1.html()).toEqual(expected);

            const wrapper2 = shallow(
                GetDataToLinkImage({
                    data: { ...globalContent, subtype: '8' },
                    section: 'nota'
                })
            );
            expect(wrapper2.html()).toEqual(expected);
        });

        it('STORYTELLING or FOTOAL100 with promo_items.storytelling_mobile, return empty Array', () => {
            const wrapper1 = mount(
                GetDataToLinkImage({
                    data: { ...articleToExclude, subtype: '4' },
                    section: 'nota'
                })
            );

            const wrapper2 = mount(
                GetDataToLinkImage({
                    data: { ...articleToExclude, subtype: '8' },
                    section: 'nota'
                })
            );

            expect(wrapper1).toEqual({});

            expect(wrapper2).toEqual({});
        });
    });

    /////////// HOME ///////////
    describe('When section is home', () => {
        const resizedUrls = `<link rel=\"preload\" as=\"image\" href=\"https://resizer.glanacion.com/resizer/FtoYG9gG-lYJTikOJudK9UNhnWA=/320x480/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg\" imagesrcset=\"https://resizer.glanacion.com/resizer/0-_Q3j7WaTgvazaqaWo1TlsdFYg=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg 768w,https://resizer.glanacion.com/resizer/v0nB_sKZ3HeDxcpmmYhzX6P49i0=/375x562/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg 375w,https://resizer.glanacion.com/resizer/FtoYG9gG-lYJTikOJudK9UNhnWA=/320x480/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg 320w\"/>`;

        it('without renderables, return empty fragment', () => {
            const wrapper = mount(
                GetDataToLinkImage({
                    data: {},
                    section: 'home',
                    renderables: []
                })
            );
            expect(wrapper).toEqual({});
        });

        describe('with Bomba', () => {
            it('Visible with imageId, return Array with imageResizedUrls', () => {
                const renderables = bombaVisible;
                getImage.mockImplementation(() => responseRelatedImageSource);
                const wrapper = shallow(
                    GetDataToLinkImage({
                        data: {},
                        section: 'home',
                        renderables
                    })
                );
                expect(wrapper.html()).toEqual(resizedUrls);
            });

            it('Visible with noteId, return Array with imageResizedUrls', () => {
                const renderables = bombaVisibleOnlyNoteId;
                const wrapper = shallow(
                    GetDataToLinkImage({
                        data: {},
                        section: 'home',
                        renderables
                    })
                );
                getImage.mockImplementation(() => responseArticleSourceNota);
                expect(wrapper.html()).toEqual(resizedUrls);
            });

            it('Hiden, return Empty Array', () => {
                const renderables = bombaOculta;
                getImage.mockImplementation(() => {});
                const wrapper = mount(
                    GetDataToLinkImage({
                        data: {},
                        section: 'home',
                        renderables
                    })
                );
                expect(wrapper).toEqual({});
            });
        });
        describe('with Apertura', () => {
            it('Return Array with imageResizedUrls', () => {
                const renderables = dataApertura;
                getImage.mockImplementation(() => responseRelatedImageSource);
                const wrapper = shallow(
                    GetDataToLinkImage({
                        data: {},
                        section: 'home',
                        renderables
                    })
                );

                expect(wrapper.html()).toEqual(resizedUrls);
            });
        });
    });

    /////////// ACUMULADOS ///////////
    describe('When section is acumulado, return empty Array', () => {
        it('GetDataToLinkImage - acumulados', () => {
            const globalContent = {};
            const renderables = [];
            expect(
                GetDataToLinkImage({
                    data: globalContent,
                    section: 'acumulado',
                    renderables
                })
            ).toEqual([]);
        });
    });

    /////////// DEFAULT ///////////
    describe('When section is undefined return empty', () => {
        it('GetDataToLinkImage - nuevaSeccion', () => {
            const globalContent = {};
            const renderables = [];
            const wrapper = mount(
                GetDataToLinkImage({
                    data: globalContent,
                    section: 'nuevaSeccion',
                    renderables
                })
            );
            expect(wrapper).toEqual({});
        });
    });

    describe('When the params is undefined', () => {
        it('without defined parameters, return empty', () => {
            const wrapper = mount(GetDataToLinkImage({}));
            expect(wrapper).toEqual({});
        });
    });
});
