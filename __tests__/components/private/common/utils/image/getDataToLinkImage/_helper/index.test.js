import {
    getResizedUrls,
    getResizerUrlJw,
    getWWWResizedUrls,
    shouldUseManualNotePreload
} from '../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper';

jest.mock(
    'fusion:properties',
    () => () => ({
        getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
    }),
    { virtual: true }
);

jest.mock(
    'fusion:environment',
    () => ({
        SITE_LANACION: 'https://www.lanacion.com.ar',
        RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com'
    }),
    { virtual: true }
);

describe('getDataToLinkImage - _helper', () => {
    describe('shouldUseManualNotePreload', () => {
        it('delegates a plain Noticia layout to React 19', () => {
            expect(
                shouldUseManualNotePreload({
                    layout: 'LN-nota-noticia',
                    promoItems: {}
                })
            ).toBe(false);
        });

        test.each([
            'LN-nota-storytelling',
            'LN-nota-foto-al-100',
            'LN-nota-receta',
            'LN-Nota-Liveblog_Editorial'
        ])('keeps manual preloads for picture layout %s', layout => {
            expect(shouldUseManualNotePreload({ layout, promoItems: {} })).toBe(
                true
            );
        });

        it('keeps a manual facade preload for JW video', () => {
            expect(
                shouldUseManualNotePreload({
                    layout: 'LN-nota-noticia',
                    promoItems: {
                        video_jw: { subtype: 'video_jw' }
                    }
                })
            ).toBe(true);
        });

        it('keeps manual preloads for a Storytelling v2 picture', () => {
            expect(
                shouldUseManualNotePreload({
                    layout: 'LN-nota-storytelling-v2',
                    promoItems: {
                        storytelling_mobile: {
                            url: 'https://example.com/mobile.jpg'
                        }
                    }
                })
            ).toBe(true);
        });

        it('delegates Storytelling v2 video with a mobile image to React', () => {
            expect(
                shouldUseManualNotePreload({
                    layout: 'LN-nota-storytelling-v2',
                    promoItems: {
                        storytelling_mobile: {
                            url: 'https://example.com/mobile.jpg'
                        },
                        video_jw: { subtype: 'video_jw' }
                    }
                })
            ).toBe(false);
        });

        it('defaults unknown image layouts to React-managed preload', () => {
            expect(
                shouldUseManualNotePreload({
                    layout: 'LN-unknown-note-layout',
                    promoItems: {}
                })
            ).toBe(false);
        });
    });

    describe('getResizedUrls', () => {
        const videoConfig = {
            subtype: 'video_jw',
            embed: {
                config: {
                    videoJw: {
                        description: ' ',
                        kind: 'Single Item',
                        playlist: [
                            {
                                description: ' ',
                                duration: '32020',
                                image: 'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=720',
                                images: [
                                    {
                                        src: 'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=320',
                                        type: 'image/jpeg',
                                        width: 320
                                    },
                                    {
                                        src: 'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=480',
                                        type: 'image/jpeg',
                                        width: 480
                                    },
                                    {
                                        src: 'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=640',
                                        type: 'image/jpeg',
                                        width: 640
                                    },
                                    {
                                        src: 'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=720',
                                        type: 'image/jpeg',
                                        width: 720
                                    },
                                    {
                                        src: 'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=1280',
                                        type: 'image/jpeg',
                                        width: 1280
                                    },
                                    {
                                        src: 'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=1920',
                                        type: 'image/jpeg',
                                        width: 1920
                                    }
                                ],
                                link: 'https://cdn.jwplayer.com/previews/6zSrEYgC',
                                mediaid: '6zSrEYgC',
                                pubdate: 1629228557,
                                sources: [
                                    {
                                        file: 'https://cdn.jwplayer.com/manifests/6zSrEYgC.m3u8',
                                        type: 'application/vnd.apple.mpegurl'
                                    },
                                    {
                                        bitrate: 379343,
                                        file: 'https://cdn.jwplayer.com/videos/6zSrEYgC-kTExGaWf.mp4',
                                        filesize: 1517372,
                                        framerate: 30,
                                        height: 180,
                                        label: '180p',
                                        type: 'video/mp4',
                                        width: 320
                                    },
                                    {
                                        bitrate: 522396,
                                        file: 'https://cdn.jwplayer.com/videos/6zSrEYgC-K8B0kybS.mp4',
                                        filesize: 2089585,
                                        framerate: 30,
                                        height: 270,
                                        label: '270p',
                                        type: 'video/mp4',
                                        width: 480
                                    },
                                    {
                                        bitrate: 1465334,
                                        file: 'https://cdn.jwplayer.com/videos/6zSrEYgC-46NIuRKO.mp4',
                                        filesize: 5861339,
                                        framerate: 30,
                                        height: 720,
                                        label: '720p',
                                        type: 'video/mp4',
                                        width: 1280
                                    },
                                    {
                                        bitrate: 117564,
                                        file: 'https://cdn.jwplayer.com/videos/6zSrEYgC-hz5z2Tv4.m4a',
                                        filesize: 455561,
                                        label: 'AAC Audio',
                                        type: 'audio/mp4'
                                    },
                                    {
                                        bitrate: 602627,
                                        file: 'https://cdn.jwplayer.com/videos/6zSrEYgC-FnZGUVnC.mp4',
                                        filesize: 2410509,
                                        framerate: 30,
                                        height: 360,
                                        label: '360p',
                                        type: 'video/mp4',
                                        width: 640
                                    },
                                    {
                                        bitrate: 989034,
                                        file: 'https://cdn.jwplayer.com/videos/6zSrEYgC-0G6Pwvlw.mp4',
                                        filesize: 3956138,
                                        framerate: 30,
                                        height: 540,
                                        label: '540p',
                                        type: 'video/mp4',
                                        width: 960
                                    }
                                ],
                                title: 'Cristina contó en qué coincidían Néstor Kirchner con el exministro de Economía, Nicolás Dujovne',
                                tracks: [
                                    {
                                        file: 'https://cdn.jwplayer.com/strips/6zSrEYgC-120.vtt',
                                        kind: 'thumbnails'
                                    }
                                ],
                                variations: {}
                            }
                        ],
                        title: 'Cristina contó en qué coincidían Néstor Kirchner con el exministro de Economía, Nicolás Dujovne'
                    }
                }
            }
        };

        const aperturaMultimedia = {
            apertura_multimedia: {
                ...videoConfig
            }
        };

        const videJw = {
            vide_jw: {
                ...videoConfig
            }
        };

        const basicDefault = {
            _id: '6NCIS6VGMJDIFJUJL44KSEGRM4',
            additional_properties: {
                mime_type: 'image/jpeg'
            },
            auth: {
                1: '3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951'
            },
            caption:
                'Cristina contó en qué coincidían Néstor Kirchner con el exministro de Economía, Nicolás Dujovne',
            created_date: '2021-08-17T19:29:12Z',
            height: 513,
            originalSizes: {
                height: 720,
                width: 1280
            },
            resized_urls: [
                {
                    option: {
                        height: 410,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 820
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=820&quality=70&smart=false'
                },
                {
                    option: {
                        height: 414,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 768
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=768&quality=70&smart=false'
                },
                {
                    option: {
                        height: 180,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 360
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=360&quality=70&smart=false'
                },
                {
                    option: {
                        height: 175,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 351
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=351&quality=70&smart=false'
                }
            ],
            subtitle:
                'Cristina contó en qué coincidían Néstor Kirchner con el exministro de Economía, Nicolás Dujovne',
            type: 'image',
            url: 'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=768&quality=70&smart=false',
            width: 768
        };

        it('should return resizer images from apertura_multimedia', () => {
            const resizers = getResizedUrls(
                '5',
                aperturaMultimedia,
                basicDefault
            );
            expect(resizers).toStrictEqual([
                {
                    option: {
                        media_preload: '(max-width: 767px)',
                        minScreenWidth: 0,
                        width: 0
                    },
                    resizedUrl:
                        'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=480'
                },
                {
                    option: {
                        media_preload: '(min-width: 768px)',
                        minScreenWidth: 768,
                        width: 768
                    },
                    resizedUrl:
                        'https://cdn.jwplayer.com/v2/media/6zSrEYgC/poster.jpg?width=720'
                }
            ]);
        });

        it('should return resizer images from video_jw', () => {
            const resizers = getResizedUrls('5', videJw, basicDefault);
            expect(resizers).toStrictEqual([
                {
                    option: {
                        height: 410,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 820
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=820&quality=70&smart=false'
                },
                {
                    option: {
                        height: 414,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 768
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=768&quality=70&smart=false'
                },
                {
                    option: {
                        height: 180,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 360
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=360&quality=70&smart=false'
                },
                {
                    option: {
                        height: 175,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 351
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=351&quality=70&smart=false'
                }
            ]);
        });

        it('should return resizer images from basic default', () => {
            const resizers = getResizedUrls('5', {}, basicDefault);
            expect(resizers).toStrictEqual([
                {
                    option: {
                        height: 410,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 820
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=820&quality=70&smart=false'
                },
                {
                    option: {
                        height: 414,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 768
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=768&quality=70&smart=false'
                },
                {
                    option: {
                        height: 180,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 360
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=360&quality=70&smart=false'
                },
                {
                    option: {
                        height: 175,
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        width: 351
                    },
                    resizedUrl:
                        'https://resizer.glanacion.com/resizer/v2/cristina-conto-en-que-coincidian-nestor-kirchner-6NCIS6VGMJDIFJUJL44KSEGRM4.jpg?auth=3054c851c3d140b5abacb1a75e9c54b41c96948246a2cc1ddf5eadb2bbbe5951&width=351&quality=70&smart=false'
                }
            ]);
        });

        it('should separate storytelling image preloads by isMobileDimension metadata', () => {
            const result = getResizedUrls(
                '4',
                {
                    storytelling_mobile: {
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://example.com/mobile-770.jpg',
                                option: {
                                    width: 770,
                                    height: 770,
                                    proportion: '1:1',
                                    isMobileDimension: true
                                }
                            },
                            {
                                resizedUrl:
                                    'https://example.com/mobile-desktop-like.jpg',
                                option: {
                                    width: 1200,
                                    height: 800,
                                    proportion: '3:2'
                                }
                            }
                        ]
                    }
                },
                {
                    resized_urls: [
                        {
                            resizedUrl: 'https://example.com/desktop-1920.jpg',
                            option: {
                                width: 1920,
                                height: 830,
                                proportion: '21:9'
                            }
                        },
                        {
                            resizedUrl: 'https://example.com/desktop-1280.jpg',
                            option: {
                                width: 1280,
                                height: 580,
                                proportion: '21:9'
                            }
                        },
                        {
                            resizedUrl:
                                'https://example.com/desktop-mobile-like.jpg',
                            option: {
                                width: 512,
                                height: 512,
                                proportion: '1:1',
                                isMobileDimension: true
                            }
                        }
                    ]
                }
            );

            expect(result.map(({ resizedUrl }) => resizedUrl)).toEqual([
                'https://example.com/desktop-1920.jpg',
                'https://example.com/desktop-1280.jpg',
                'https://example.com/mobile-770.jpg'
            ]);
        });

        it('should not use unmarked mobile resized urls as mobile fallback', () => {
            const result = getResizedUrls(
                '4',
                {
                    storytelling_mobile: {
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://example.com/mobile-desktop-like.jpg',
                                option: {
                                    width: 1200,
                                    height: 800,
                                    proportion: '3:2'
                                }
                            }
                        ]
                    }
                },
                {
                    resized_urls: [
                        {
                            resizedUrl: 'https://example.com/desktop-1920.jpg',
                            option: {
                                width: 1920,
                                height: 830,
                                proportion: '21:9'
                            }
                        }
                    ]
                }
            );

            expect(result.map(({ resizedUrl }) => resizedUrl)).toEqual([
                'https://example.com/desktop-1920.jpg'
            ]);
        });
    });

    describe('getResizerUrlJw', () => {
        const promoItemsFromSource = {
            basic: {
                resized_urls: [
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=510&quality=70&smart=false',
                        option: {
                            width: 510,
                            height: 765,
                            maxScreenWidth: 511,
                            media_preload: '(max-width: 511px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=767&quality=70&smart=false',
                        option: {
                            width: 767,
                            height: 1151,
                            minScreenWidth: 512,
                            media_preload:
                                '(min-width: 512px) and (max-width: 767px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=1023&quality=70&smart=false',
                        option: {
                            width: 1023,
                            height: 1535,
                            minScreenWidth: 768,
                            media_preload:
                                '(min-width: 768px) and (max-width: 1023px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=1279&quality=70&smart=false',
                        option: {
                            width: 1279,
                            height: 1919,
                            minScreenWidth: 1024,
                            media_preload:
                                '(min-width: 1024px) and (max-width: 1279px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=1366&quality=70&smart=false',
                        option: {
                            width: 1366,
                            height: 2049,
                            minScreenWidth: 1280,
                            media_preload:
                                '(min-width: 1280px) and (max-width: 1366px)',
                            proportion: '2:3'
                        }
                    }
                ]
            }
        };

        it('should map resized_urls preserving media_preload from source', () => {
            const result = getResizerUrlJw(promoItemsFromSource);
            const canonicalizeUrl = url =>
                url.replace(
                    'https://sandbox-resizer.glanacion.com',
                    'https://www.lanacion.com.ar'
                );

            expect(result).toStrictEqual([
                {
                    resizedUrl: canonicalizeUrl(
                        'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=510&quality=70&smart=false'
                    ),
                    option: {
                        media_preload: '(max-width: 511px)',
                        minScreenWidth: 0,
                        maxScreenWidth: 511,
                        width: 510
                    }
                },
                {
                    resizedUrl: canonicalizeUrl(
                        'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=767&quality=70&smart=false'
                    ),
                    option: {
                        media_preload:
                            '(min-width: 512px) and (max-width: 767px)',
                        minScreenWidth: 512,
                        maxScreenWidth: 0,
                        width: 767
                    }
                },
                {
                    resizedUrl: canonicalizeUrl(
                        'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=1023&quality=70&smart=false'
                    ),
                    option: {
                        media_preload:
                            '(min-width: 768px) and (max-width: 1023px)',
                        minScreenWidth: 768,
                        maxScreenWidth: 0,
                        width: 1023
                    }
                },
                {
                    resizedUrl: canonicalizeUrl(
                        'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=1279&quality=70&smart=false'
                    ),
                    option: {
                        media_preload:
                            '(min-width: 1024px) and (max-width: 1279px)',
                        minScreenWidth: 1024,
                        maxScreenWidth: 0,
                        width: 1279
                    }
                },
                {
                    resizedUrl: canonicalizeUrl(
                        'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FEUDawMqd%2Fposter.jpg%3Fwidth%3D720?auth=d63bd5d4f02320451df0aa7a2a841e08edbd6c1915da0277fe5f9504af58864b&width=1366&quality=70&smart=false'
                    ),
                    option: {
                        media_preload:
                            '(min-width: 1280px) and (max-width: 1366px)',
                        minScreenWidth: 1280,
                        maxScreenWidth: 0,
                        width: 1366
                    }
                }
            ]);
        });

        it('should return an empty array when promo items is empty', () => {
            const result = getResizerUrlJw({});
            expect(result).toStrictEqual([]);
        });
    });

    describe('getWWWResizedUrls', () => {
        const promoItems = {
            basic: {
                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FX763KUZa%2Fposter.jpg%3Fwidth%3D720?auth=cdd5a50bf880b3009eb40ba9c2d9e5b1c0079d7fce5339bfa1639958c7fe6a56&width=768&quality=70&smart=false',
                type: 'image',
                width: 768,
                height: 513,
                resized_urls: [
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FX763KUZa%2Fposter.jpg%3Fwidth%3D720?auth=cdd5a50bf880b3009eb40ba9c2d9e5b1c0079d7fce5339bfa1639958c7fe6a56&width=510&quality=70&smart=false',
                        option: {
                            width: 510,
                            height: 765,
                            maxScreenWidth: 511,
                            media_preload: '(max-width: 511px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FX763KUZa%2Fposter.jpg%3Fwidth%3D720?auth=cdd5a50bf880b3009eb40ba9c2d9e5b1c0079d7fce5339bfa1639958c7fe6a56&width=767&quality=70&smart=false',
                        option: {
                            width: 767,
                            height: 1151,
                            minScreenWidth: 512,
                            media_preload:
                                '(min-width: 512px) and (max-width: 767px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FX763KUZa%2Fposter.jpg%3Fwidth%3D720?auth=cdd5a50bf880b3009eb40ba9c2d9e5b1c0079d7fce5339bfa1639958c7fe6a56&width=1023&quality=70&smart=false',
                        option: {
                            width: 1023,
                            height: 1535,
                            minScreenWidth: 768,
                            media_preload:
                                '(min-width: 768px) and (max-width: 1023px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FX763KUZa%2Fposter.jpg%3Fwidth%3D720?auth=cdd5a50bf880b3009eb40ba9c2d9e5b1c0079d7fce5339bfa1639958c7fe6a56&width=1279&quality=70&smart=false',
                        option: {
                            width: 1279,
                            height: 1919,
                            minScreenWidth: 1024,
                            media_preload:
                                '(min-width: 1024px) and (max-width: 1279px)',
                            proportion: '2:3'
                        }
                    },
                    {
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fcdn.jwplayer.com%2Fv2%2Fmedia%2FX763KUZa%2Fposter.jpg%3Fwidth%3D720?auth=cdd5a50bf880b3009eb40ba9c2d9e5b1c0079d7fce5339bfa1639958c7fe6a56&width=1366&quality=70&smart=false',
                        option: {
                            width: 1366,
                            height: 2049,
                            minScreenWidth: 1280,
                            media_preload:
                                '(min-width: 1280px) and (max-width: 1366px)',
                            proportion: '2:3'
                        }
                    }
                ]
            }
        };

        it('should normalize host to www', () => {
            const resizedUrls = getWWWResizedUrls(promoItems);

            expect(resizedUrls).toHaveLength(5);
            expect(
                resizedUrls.every(result =>
                    result.resizedUrl.startsWith(
                        'https://www.lanacion.com.ar/resizer/'
                    )
                )
            ).toBe(true);
        });

        it('should return [] if promoItems is undefined or empty', () => {
            expect(getWWWResizedUrls(undefined)).toEqual([]);
            expect(getWWWResizedUrls({})).toEqual([]);
        });
    });
});
