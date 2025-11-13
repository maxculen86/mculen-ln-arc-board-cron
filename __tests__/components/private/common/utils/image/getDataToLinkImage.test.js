import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import getProperties from 'fusion:properties';
import GetDataToLinkImage from '../../../../../../components/private/common/utils/image/getDataToLinkImage';
import useGetMediaData from '../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/useGetMediaData';
import dataAccumulatedAuthor from '../../../../../../__mocks__/data/renderables/dataAccumulatedAuthor.json';
import dataAccumulatedEconomy from '../../../../../../__mocks__/data/renderables/dataAccumulatedEconomy.json';
import dataAccumulatedCulture from '../../../../../../__mocks__/data/renderables/dataAccumulatedCulture.json';
import bombaOculta from '../../../../../../__mocks__/data/renderables/bomba/bombaOculta';
import bombaVisible from '../../../../../../__mocks__/data/renderables/bomba/bombaVisible.json';
import dataApertura from '../../../../../../__mocks__/data/renderables/dataApertura2.json';
import bombaVisibleOnlyNoteId from '../../../../../../__mocks__/data/renderables/bomba/bombaVisibleOnlyNoteId';
import articleToExclude from '../../../../../../__mocks__/data/images/getDataToLinkImage/articleToExclude.json';
import globalContent from '../../../../../../__mocks__/data/images/getDataToLinkImage/globalContent.json';
import globalContentWithVideo from '../../../../../../__mocks__/data/images/getDataToLinkImage/globalContentWithVideo';
import responseArticleSourceNota from '../../../../../../__mocks__/data/images/getDataToLinkImage/responseArticleSourceNota';
import responseRelatedImageSource from '../../../../../../__mocks__/data/images/getDataToLinkImage/responseRelatedImageSource.json';
import dataAperturaWithVideo from '../../../../../../__mocks__/data/renderables/dataAperturaWithVideo.json';
import responseGetVideoPosterResized from '../../../../../../__mocks__/data/videos/getDataToLinkImage/responseGetVideoPosterResized.json';
import storytellingWithVideoAndImgDesktop from '../../../../../../__mocks__/data/images/getDataToLinkImage/storytellingWithVideoAndImageDesktop.json';
import { fillMaxWidth } from '../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper';

jest.mock(
    '../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper/_homeHelper/useGetMediaData',
    () => jest.fn()
);

describe('Common - GetDataToLinkImage', () => {
    describe('When section is note,', () => {
        const expected =
            '<link rel="preload" as="image" fetchpriority="high" media="(min-width: 1280.1px)" href="https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg"><link rel="preload" as="image" fetchpriority="high" media="(min-width: 1024.1px and max-width: 1280px)" href="https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg"><link rel="preload" as="image" fetchpriority="high" media="(max-width: 1024px)" href="https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg">';
        const expectedVideoType =
            '<link rel="preload" as="image" fetchpriority="high" media="(max-width: 767px)" href="https://cdn.jwplayer.com/v2/media/aomrvRI3/poster.jpg?width=480"><link rel="preload" as="image" fetchpriority="high" media="(min-width: 768px)" href="https://cdn.jwplayer.com/v2/media/aomrvRI3/poster.jpg?width=720">';
        const expectedFotoAl100 =
            '<link rel="preload" as="image" fetchpriority="high" media="(min-width: 1280.1px)" href="https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg"><link rel="preload" as="image" fetchpriority="high" media="(min-width: 1024.1px and max-width: 1280px)" href="https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg"><link rel="preload" as="image" fetchpriority="high" media="(max-width: 1024px)" href="https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg">';

        it('with resized Media, return array media data', () => {
            const { container } = render(
                <GetDataToLinkImage data={globalContent} section="nota" />
            );

            expect(container.innerHTML).toEqual(expected);
        });

        it('Opening with video, it should return the preload of the facade image', () => {
            const { container } = render(
                <GetDataToLinkImage
                    data={globalContentWithVideo}
                    section="nota"
                />
            );

            expect(container.innerHTML).toEqual(expectedVideoType);
        });

        it('without resized Media, return empty string', () => {
            const { container } = render(<GetDataToLinkImage section="nota" />);
            expect(container.innerHTML).toEqual('');
        });

        it('FOTOAL100 without promo_items.storytelling_mobile, return array media data', () => {
            const { container } = render(
                <GetDataToLinkImage
                    data={{ ...globalContent, subtype: '8' }}
                    section="nota"
                />
            );
            expect(container.innerHTML).toEqual(expectedFotoAl100);
        });

        it('STORYTELLING without promo_items.storytelling_mobile, return desk preload', () => {
            const { container } = render(
                <GetDataToLinkImage
                    {...{
                        data: { ...globalContent, subtype: '4' },
                        section: 'nota'
                    }}
                />
            );

            const linksPreload = container.querySelectorAll('link');

            expect(linksPreload).toHaveLength(3);
            expect(container).toMatchSnapshot();

            linksPreload.forEach(link => {
                expect(link.getAttribute('fetchpriority')).toEqual('high');
                expect(link.getAttribute('as')).toEqual('image');
                expect(link.getAttribute('rel')).toEqual('preload');
                expect(link.hasAttribute('href')).toBeTruthy();
                expect(link.hasAttribute('media')).toBeTruthy();
            });
        });

        it('STORYTELLING with promo_items.storytelling_mobile, return mobile preload', () => {
            const { container } = render(
                <GetDataToLinkImage
                    {...{
                        data: { ...articleToExclude, subtype: '4' },
                        section: 'nota'
                    }}
                />
            );

            const linksPreload = container.querySelectorAll('link');

            expect(linksPreload).toHaveLength(5);
            expect(container).toMatchSnapshot();

            linksPreload.forEach(link => {
                expect(link.getAttribute('fetchpriority')).toEqual('high');
                expect(link.getAttribute('as')).toEqual('image');
                expect(link.getAttribute('rel')).toEqual('preload');
                expect(link.hasAttribute('href')).toBeTruthy();
                expect(link.hasAttribute('media')).toBeTruthy();
            });
        });

        it('If the opening has video and image for desktop, it should return the mobile image-only preload.', () => {
            const { container } = render(
                <GetDataToLinkImage
                    {...{
                        data: {
                            ...storytellingWithVideoAndImgDesktop,
                            subtype: '4'
                        },
                        section: 'nota'
                    }}
                />
            );

            const linksPreload = container.querySelectorAll('link');

            expect(linksPreload).toHaveLength(2);
            expect(linksPreload[0].getAttribute('media')).toStrictEqual(
                '(min-width: 768px) and (max-width: 1023px)'
            );
            expect(linksPreload[1].getAttribute('media')).toStrictEqual(
                '(max-width: 767px)'
            );
        });

        it('excludes preload when subtype is CARDS', () => {
            const { container } = render(
                <GetDataToLinkImage
                    data={{ ...globalContent, subtype: '14' }}
                    section="nota"
                />
            );
            expect(container.innerHTML).toEqual('');
        });

        it('does not exclude preload when subtype is not CARDS', () => {
            const { container } = render(
                <GetDataToLinkImage
                    data={{ ...globalContent, subtype: '1' }}
                    section="nota"
                />
            );

            expect(container.innerHTML).toEqual(expected);
        });
    });

    describe('When section is home', () => {
        it('without renderables, return empty fragment', () => {
            const { container } = render(
                <GetDataToLinkImage
                    {...{
                        data: {},
                        section: 'home',
                        renderables: []
                    }}
                />
            );

            expect(container).toMatchInlineSnapshot(`<div />`);
        });

        describe('with Bomba', () => {
            it('Visible with imageId, return Array with imageResizedUrls', () => {
                useGetMediaData.mockImplementation(
                    () => responseRelatedImageSource
                );

                const { container } = render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: bombaVisible
                        }}
                    />
                );

                const linksPreload = container.querySelectorAll('link');

                expect(linksPreload).toHaveLength(3);
                expect(linksPreload).toMatchSnapshot();
            });

            it('Visible with noteId, return Array with imageResizedUrls', () => {
                useGetMediaData.mockImplementation(
                    () => responseArticleSourceNota
                );

                const { container } = render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: bombaVisibleOnlyNoteId
                        }}
                    />
                );

                const linksPreload = container.querySelectorAll('link');

                expect(linksPreload).toHaveLength(3);
                expect(linksPreload).toMatchSnapshot();
            });

            it('Hiden, return Empty Array', () => {
                useGetMediaData.mockImplementation(() => {});

                const { container } = render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: bombaOculta
                        }}
                    />
                );
                const linkPreload = container.querySelector('link');

                expect(linkPreload).toBeNull();
                expect(container).toMatchInlineSnapshot(`<div />`);
            });
        });

        describe('with Apertura', () => {
            test('Return Array with imageResizedUrls', () => {
                useGetMediaData.mockImplementation(
                    () => responseRelatedImageSource
                );

                const { container } = render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: dataApertura
                        }}
                    />
                );

                const linksPreload = container.querySelectorAll('link');

                expect(linksPreload).toHaveLength(3);
                expect(linksPreload).toMatchSnapshot();
            });

            test('Return array images resized from video', () => {
                useGetMediaData.mockImplementation(
                    () => responseGetVideoPosterResized
                );

                const { container } = render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: dataAperturaWithVideo
                        }}
                    />
                );

                const linksPreload = container.querySelectorAll('link');

                expect(linksPreload).toHaveLength(2);
                expect(linksPreload).toMatchSnapshot();
            });
        });
    });

    describe('When section is undefined return empty string', () => {
        it('GetDataToLinkImage - nuevaSeccion', () => {
            const globalContent = {};
            const renderables = [];
            const { container } = render(
                <GetDataToLinkImage
                    data={globalContent}
                    section="nuevaSeccion"
                    renderables={renderables}
                />
            );
            expect(container.innerHTML).toEqual('');
        });
    });

    describe('When the params is undefined', () => {
        it('without defined parameters, return empty string', () => {
            const { container } = render(<GetDataToLinkImage />);
            expect(container.innerHTML).toEqual('');
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

describe('fillMaxWidth function', () => {
    test('should correctly set maxWidth for images without maxWidth', () => {
        const images = [
            { minWidth: 200 },
            { minWidth: 100, maxWidth: 199 },
            { minWidth: 50 }
        ];
        const expected = [
            { minWidth: 200, maxWidth: 99 },
            { minWidth: 100, maxWidth: 199 },
            { minWidth: 50 }
        ];
        const result = fillMaxWidth(images);
        expect(result).toEqual(expected);
    });

    test('should not modify maxWidth if it is already defined', () => {
        const images = [
            { minWidth: 200, maxWidth: 250 },
            { minWidth: 100, maxWidth: 199 },
            { minWidth: 50 }
        ];
        const expected = [
            { minWidth: 200, maxWidth: 250 },
            { minWidth: 100, maxWidth: 199 },
            { minWidth: 50 }
        ];
        const result = fillMaxWidth(images);
        expect(result).toEqual(expected);
    });

    test('should handle an empty array without errors', () => {
        const images = [];
        const result = fillMaxWidth(images);
        expect(result).toEqual([]);
    });
});
