import React from 'react';
import * as fusionConsumer from 'fusion:consumer';
import { shallow, mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import getProperties from 'fusion:properties';

import GetDataToLinkImage from '../../../../../../components/private/common/utils/image/getDataToLinkImage';
import getImage from '../../../../../../components/private/common/utils/image/getImage';
import getVideoPosterResized from '../../../../../../components/private/common/utils/video/getVideoPosterResized';

// Data
import dataAccumulatedAuthor from '../../../../../../__mocks__/data/renderables/dataAccumulatedAuthor.json';
import dataAccumulatedEconomy from '../../../../../../__mocks__/data/renderables/dataAccumulatedEconomy.json';
import dataAccumulatedCulture from '../../../../../../__mocks__/data/renderables/dataAccumulatedCulture.json';
import bombaOculta from '../../../../../../__mocks__/data/renderables/bomba/bombaOculta';
import bombaVisible from '../../../../../../__mocks__/data/renderables/bomba/bombaVisible';
import dataApertura from '../../../../../../__mocks__/data/renderables/dataApertura2.json';
import bombaVisibleOnlyNoteId from '../../../../../../__mocks__/data/renderables/bomba/bombaVisibleOnlyNoteId';
import articleToExclude from '../../../../../../__mocks__/data/images/getDataToLinkImage/articleToExclude';
import globalContent from '../../../../../../__mocks__/data/images/getDataToLinkImage/globalContent';
import globalContentWithVideo from '../../../../../../__mocks__/data/images/getDataToLinkImage/globalContentWithVideo';
import responseArticleSourceNota from '../../../../../../__mocks__/data/images/getDataToLinkImage/responseArticleSourceNota';
import responseRelatedImageSource from '../../../../../../__mocks__/data/images/getDataToLinkImage/responseRelatedImageSource';
import LinkImagePreload from '../../../../../../components/private/LN/common/utils/mediaHelper';
import dataAperturaWithVideo from '../../../../../../__mocks__/data/renderables/dataAperturaWithVideo.json';
import responseGetVideoPosterResized from '../../../../../../__mocks__/data/videos/getDataToLinkImage/responseGetVideoPosterResized.json';

jest.mock(
    '../../../../../../components/private/common/utils/image/getImage',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/private/common/utils/video/getVideoPosterResized',
    () => jest.fn()
);

describe('Common - GetDataToLinkImage', () => {
    /////////// NOTA ///////////
    describe('When section is note,', () => {
        const expected = `<link rel=\"preload\" as=\"image\" fetchPriority=\"high\" href=\"https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg\" imagesrcset=\"https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 879w,https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 1119w,https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 768w\"/>`;
        const expectedVideoType = `<link rel=\"preload\" as=\"image\" fetchPriority=\"high\" href=\"https://resizer.glanacion.com/resizer/ZpxaMJQuq3zkfZkZ47TcSELlvb0=/351x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg\" imagesrcset=\"https://resizer.glanacion.com/resizer/mxeQgSo8rF_5hYakbXPqoXCi4lo=/820x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg 820w,https://resizer.glanacion.com/resizer/3IibxbS9Q7-2PL73hRaFQrk5XCA=/768x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg 768w,https://resizer.glanacion.com/resizer/W6Qqj-PwP6QDW_3kLX_oqF7HCog=/360x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg 360w,https://resizer.glanacion.com/resizer/ZpxaMJQuq3zkfZkZ47TcSELlvb0=/351x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/09-30-2022/t_be67699132db466a95827ceac7fcbc71_name_file_1280x720_2000_v3_1_.jpg 351w\"/>`;
        const expectedHistoryTelling = `<link rel=\"preload\" as=\"image\" fetchPriority=\"high\" href=\"https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg\" imagesrcset=\"https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 879w,https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg 1119w\"/>`;

        it('with resized Media, return array media data', () => {
            const wrapper = shallow(
                GetDataToLinkImage({
                    data: globalContent,
                    section: 'nota'
                })
            );
            expect(wrapper.html()).toEqual(expected);
        });

        it('Opening with video, it should return the preload of the facade image', () => {
            const wrapper1 = shallow(
                GetDataToLinkImage({
                    data: globalContentWithVideo,
                    section: 'nota'
                })
            );

            expect(wrapper1.html()).toEqual(expectedVideoType);
        });

        it('without resized Media, return empty Array', () => {
            const wrapper = shallow(
                GetDataToLinkImage({ data: {}, section: 'nota' })
            );
            expect(wrapper.isEmptyRender()).toEqual(true);
        });

        it('FOTOAL100 without promo_items.storytelling_mobile, return array media data', () => {
            const wrapper2 = shallow(
                GetDataToLinkImage({
                    data: { ...globalContent, subtype: '8' },
                    section: 'nota'
                })
            );
            expect(wrapper2.html()).toEqual(expected);
        });

        it('FOTOAL100 with promo_items.storytelling_mobile, return empty Array', () => {
            const wrapper1 = mount(
                GetDataToLinkImage({
                    data: { ...articleToExclude, subtype: '8' },
                    section: 'nota'
                })
            );

            expect(wrapper1).toEqual({});
        });
        it('STORYTELLING without promo_items.storytelling_mobile, return empty array', () => {
            const wrapper1 = shallow(
                GetDataToLinkImage({
                    data: { ...globalContent, subtype: '4' },
                    section: 'nota'
                })
            );
            expect(wrapper1.isEmptyRender()).toEqual(true);
        });

        it('STORYTELLING with promo_items.storytelling_mobile, return mobile preload', () => {
            const wrapper1 = shallow(
                GetDataToLinkImage({
                    data: { ...articleToExclude, subtype: '4' },
                    section: 'nota'
                })
            );

            expect(wrapper1.html()).toEqual(expectedHistoryTelling);
        });
    });

    /////////// HOME ///////////
    describe('When section is home', () => {
        const resizedUrls = `<link rel=\"preload\" as=\"image\" fetchPriority=\"high\" href=\"https://resizer.glanacion.com/resizer/FtoYG9gG-lYJTikOJudK9UNhnWA=/320x480/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg\" imagesrcset=\"https://resizer.glanacion.com/resizer/0-_Q3j7WaTgvazaqaWo1TlsdFYg=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg 768w,https://resizer.glanacion.com/resizer/v0nB_sKZ3HeDxcpmmYhzX6P49i0=/375x562/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg 375w,https://resizer.glanacion.com/resizer/FtoYG9gG-lYJTikOJudK9UNhnWA=/320x480/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/H53R624KARDARCICFNEC7ZC7YA.jpg 320w\"/>`;

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

            it('Return array images resized from video', () => {
                const resizedUrlsPosterVideo = `<link rel=\"preload\" as=\"image\" fetchPriority=\"high\" href=\"https://resizer.glanacion.com/resizer/w5UA7cfSRbm0OCe8l7RIB5aOTjc=/465x311/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/03-30-2022/t_4d232f9022d74394a511f30b4a7db176_name_file_1280x720_2000_v3_1_.jpg\" imagesrcset=\"https://resizer.glanacion.com/resizer/sOXHJ3BvskEeCkq1HN8F29gRsxY=/595x399/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/03-30-2022/t_4d232f9022d74394a511f30b4a7db176_name_file_1280x720_2000_v3_1_.jpg 595w,https://resizer.glanacion.com/resizer/frSnc4fMVEI_4x5qPr4_5e1z0mM=/635x424/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/03-30-2022/t_4d232f9022d74394a511f30b4a7db176_name_file_1280x720_2000_v3_1_.jpg 635w,https://resizer.glanacion.com/resizer/w5UA7cfSRbm0OCe8l7RIB5aOTjc=/465x311/smart/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/03-30-2022/t_4d232f9022d74394a511f30b4a7db176_name_file_1280x720_2000_v3_1_.jpg 465w\"/>`;
                const renderables = dataAperturaWithVideo;
                getVideoPosterResized.mockImplementation(
                    () => responseGetVideoPosterResized
                );

                const wrapper = shallow(
                    GetDataToLinkImage({
                        data: {},
                        section: 'home',
                        renderables
                    })
                );
                expect(wrapper.html()).toEqual(resizedUrlsPosterVideo);
            });
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

    describe('Accumulated flow', () => {
        describe('Empty cases', () => {
            const cases = [
                ['When is author', dataAccumulatedAuthor],
                [
                    'When has chains before the grid feature',
                    dataAccumulatedEconomy
                ],
                ['When has a collection in apertura', dataAccumulatedCulture]
            ];

            test.each(cases)('%s', (message, renderables) => {
                const props = {
                    renderables,
                    data: globalContent,
                    section: 'acumulado'
                };

                const { container } = render(<GetDataToLinkImage {...props} />);
                expect(container).toBeEmptyDOMElement();
            });
        });
    });
});
