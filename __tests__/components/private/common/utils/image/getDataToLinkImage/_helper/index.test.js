import { getResizedUrls } from '../../../../../../../../components/private/common/utils/image/getDataToLinkImage/_helper';

describe('getDataToLinkImage - _helper', () => {
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
    });
});
