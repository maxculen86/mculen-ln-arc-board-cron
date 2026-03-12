import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { preload } from 'react-dom';
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

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    preload: jest.fn()
}));

describe('Common - GetDataToLinkImage', () => {
    beforeEach(() => {
        preload.mockClear();
    });

    describe('When section is note,', () => {
        it('with resized Media, return array media data', () => {
            render(<GetDataToLinkImage data={globalContent} section="nota" />);
            expect(preload).toHaveBeenCalledTimes(3);
        });

        it('Opening with video, it should return the preload of the facade image', () => {
            render(
                <GetDataToLinkImage
                    data={globalContentWithVideo}
                    section="nota"
                />
            );

            expect(preload).toHaveBeenCalledTimes(2);
        });

        it('without resized Media, return empty string', () => {
            const { container } = render(<GetDataToLinkImage section="nota" />);
            expect(container.innerHTML).toEqual('');
            expect(preload).not.toHaveBeenCalled();
        });

        it('FOTOAL100 without promo_items.storytelling_mobile, return array media data', () => {
            render(
                <GetDataToLinkImage
                    data={{ ...globalContent, subtype: '8' }}
                    section="nota"
                />
            );

            expect(preload).toHaveBeenCalledTimes(3);
        });

        it('STORYTELLING without promo_items.storytelling_mobile, return desk preload', () => {
            render(
                <GetDataToLinkImage
                    {...{
                        data: { ...globalContent, subtype: '4' },
                        section: 'nota'
                    }}
                />
            );

            expect(preload).toHaveBeenCalledTimes(3);
            preload.mock.calls.forEach(([href, options]) => {
                expect(options.fetchPriority).toEqual('high');
                expect(options.as).toEqual('image');
                expect(href).toBeTruthy();
                expect(options.media).toBeTruthy();
            });
        });

        it('STORYTELLING with promo_items.storytelling_mobile, return mobile preload', () => {
            render(
                <GetDataToLinkImage
                    {...{
                        data: { ...articleToExclude, subtype: '4' },
                        section: 'nota'
                    }}
                />
            );

            expect(preload).toHaveBeenCalled();
            preload.mock.calls.forEach(([href, options]) => {
                expect(options.fetchPriority).toEqual('high');
                expect(options.as).toEqual('image');
                expect(href).toBeTruthy();
                expect(options.media).toBeTruthy();
            });
        });

        it('If the opening has video and image for desktop, it should return the mobile image-only preload.', () => {
            render(
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

            expect(preload).toHaveBeenCalledTimes(2);
            const [, firstOptions] = preload.mock.calls[0];
            const [, secondOptions] = preload.mock.calls[1];
            expect(firstOptions.media).toStrictEqual(
                '(min-width: 768px) and (max-width: 1023px)'
            );
            expect(secondOptions.media).toStrictEqual('(max-width: 767px)');
        });

        it('excludes preload when subtype is CARDS', () => {
            const { container } = render(
                <GetDataToLinkImage
                    data={{ ...globalContent, subtype: '14' }}
                    section="nota"
                />
            );
            expect(container.innerHTML).toEqual('');
            expect(preload).not.toHaveBeenCalled();
        });

        it('does not exclude preload when subtype is not CARDS', () => {
            render(
                <GetDataToLinkImage
                    data={{ ...globalContent, subtype: '1' }}
                    section="nota"
                />
            );
            expect(preload).toHaveBeenCalledTimes(3);
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

                render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: bombaVisible
                        }}
                    />
                );

                expect(preload).toHaveBeenCalledTimes(3);
            });

            it('Visible with noteId, return Array with imageResizedUrls', () => {
                useGetMediaData.mockImplementation(
                    () => responseArticleSourceNota
                );

                render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: bombaVisibleOnlyNoteId
                        }}
                    />
                );

                expect(preload).toHaveBeenCalledTimes(3);
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

                render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: dataApertura
                        }}
                    />
                );

                expect(preload).toHaveBeenCalledTimes(3);
            });

            test('Return array images resized from video', () => {
                useGetMediaData.mockImplementation(
                    () => responseGetVideoPosterResized
                );

                render(
                    <GetDataToLinkImage
                        {...{
                            data: {},
                            section: 'home',
                            renderables: dataAperturaWithVideo
                        }}
                    />
                );

                expect(preload).toHaveBeenCalledTimes(2);
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
