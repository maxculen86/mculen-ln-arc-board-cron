import {
    videoJWNota,
    videoJWNotaMobile
} from '../../../../../../../../components/private/LN/api/common/elements/story/videoJW';

const elementVideoJW = {
    _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
    additional_properties: {},
    embed: {
        config: {
            idPlayer: 'ih0086X3',
            idVideo: '1ryaz60h',
            videoJw: {
                description: '',
                kind: 'Single Item',
                playlist: [
                    {
                        description: '',
                        duration: 18,
                        image: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=720',
                        images: [
                            {
                                src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=320',
                                type: 'image/jpeg',
                                width: 320
                            },
                            {
                                src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=480',
                                type: 'image/jpeg',
                                width: 480
                            },
                            {
                                src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=640',
                                type: 'image/jpeg',
                                width: 640
                            },
                            {
                                src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=720',
                                type: 'image/jpeg',
                                width: 720
                            },
                            {
                                src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=1280',
                                type: 'image/jpeg',
                                width: 1280
                            },
                            {
                                src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=1920',
                                type: 'image/jpeg',
                                width: 1920
                            }
                        ],
                        link: 'https://cdn.jwplayer.com/previews/1ryaz60h',
                        mediaid: '1ryaz60h',
                        pubdate: 1716906719,
                        sources: [
                            {
                                file: 'https://cdn.jwplayer.com/manifests/1ryaz60h.m3u8',
                                type: 'application/vnd.apple.mpegurl'
                            },
                            {
                                bitrate: 322524,
                                file: 'https://cdn.jwplayer.com/videos/1ryaz60h-kTExGaWf.mp4',
                                filesize: 725680,
                                framerate: 30,
                                height: 318,
                                label: '180p',
                                type: 'video/mp4',
                                width: 180
                            },
                            {
                                bitrate: 398741,
                                file: 'https://cdn.jwplayer.com/videos/1ryaz60h-K8B0kybS.mp4',
                                filesize: 897168,
                                framerate: 30,
                                height: 478,
                                label: '270p',
                                type: 'video/mp4',
                                width: 270
                            },
                            {
                                bitrate: 494885,
                                file: 'https://cdn.jwplayer.com/videos/1ryaz60h-FnZGUVnC.mp4',
                                filesize: 1113493,
                                framerate: 30,
                                height: 638,
                                label: '360p',
                                type: 'video/mp4',
                                width: 360
                            }
                        ],
                        title: 'Las imágenes del camión chocado en Au.25 de Mayo',
                        tracks: [
                            {
                                file: 'https://cdn.jwplayer.com/strips/1ryaz60h-120.vtt',
                                kind: 'thumbnails'
                            }
                        ],
                        variations: {}
                    }
                ],
                title: 'Las imágenes del camión chocado en Au.25 de Mayo'
            }
        }
    },
    subtype: 'video_jw',
    type: 'custom_embed'
};
const respExpected = {
    _t: 'vid',
    id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
    duracion: 18000,
    tituloHome: 'Las imágenes del camión chocado en Au.25 de Mayo',
    multimedioFile: {
        _t: 'mmf',
        width: 360,
        height: 638,
        url: 'https://cdn.jwplayer.com/videos/1ryaz60h-FnZGUVnC.mp4'
    },
    multimedioFiles: [
        {
            _t: 'mmf',
            width: 180,
            height: 318,
            url: 'https://cdn.jwplayer.com/videos/1ryaz60h-kTExGaWf.mp4'
        },
        {
            _t: 'mmf',
            width: 270,
            height: 478,
            url: 'https://cdn.jwplayer.com/videos/1ryaz60h-K8B0kybS.mp4'
        },
        {
            _t: 'mmf',
            width: 360,
            height: 638,
            url: 'https://cdn.jwplayer.com/videos/1ryaz60h-FnZGUVnC.mp4'
        }
    ],
    multimedioImagen: {
        _t: 'mmi',
        orden: 0,
        src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=720'
    }
};

const respExpectedV2 = {
    _t: 'video',
    duration: 18000,
    multimediaFile: {
        _t: 'mmf',
        width: 360,
        height: 638,
        url: 'https://cdn.jwplayer.com/videos/1ryaz60h-FnZGUVnC.mp4'
    },
    multimediaFiles: [
        {
            _t: 'mmf',
            width: 180,
            height: 318,
            url: 'https://cdn.jwplayer.com/videos/1ryaz60h-kTExGaWf.mp4'
        },
        {
            _t: 'mmf',
            width: 270,
            height: 478,
            url: 'https://cdn.jwplayer.com/videos/1ryaz60h-K8B0kybS.mp4'
        },
        {
            _t: 'mmf',
            width: 360,
            height: 638,
            url: 'https://cdn.jwplayer.com/videos/1ryaz60h-FnZGUVnC.mp4'
        }
    ],
    thumbnailImage: {
        _t: 'mmi',
        order: 0,
        src: 'https://cdn.jwplayer.com/v2/media/1ryaz60h/poster.jpg?width=720'
    },
    multimediaHls: 'https://cdn.jwplayer.com/manifests/1ryaz60h.m3u8'
};

const expectedGlobalWarning = videoData =>
    `Error Version Global Video JW - Missing playList in content: ${JSON.stringify(
        videoData || {}
    )}`;

const expectedMobileWarning = videoData =>
    `Error Version Mobile Video JW - Missing playList in content: ${JSON.stringify(
        videoData || {}
    )}`;

describe('components - private - LN - api - common - elements - story - videoJW', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        jest.spyOn(console, 'error');
        console.warn.mockImplementation(() => null);
    });

    it('videoJWNota when data is ok', () => {
        const resp = videoJWNota(elementVideoJW, '123');
        expect(console.warn).not.toHaveBeenCalled();
        expect(resp).toMatchObject(respExpected);
    });

    it('videoJWNota when data not have id', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        // eslint-disable-next-line no-underscore-dangle
        newElementVideoJW._id = null;
        newElementVideoJW.embed.config.videoJw.playlist[0].mediaid = null;
        const resp = videoJWNota(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(resp).toBe(null);
    });

    it('videoJWNotaMobile when data is ok', () => {
        const resp = videoJWNotaMobile(elementVideoJW, '123');
        expect(console.warn).not.toHaveBeenCalled();
        expect(resp).toMatchObject(respExpectedV2);
    });

    it('videoJWNotaMobile should return title when contains epigraph title', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.epigraphTitle =
            'titulo del video';
        const resp = videoJWNotaMobile(newElementVideoJW, '123');
        expect(console.warn).not.toHaveBeenCalled();
        expect(resp).toStrictEqual({
            ...respExpectedV2,
            title: 'titulo del video'
        });
    });

    it('videoJWNotaMobile should not return the title when it does not contain the title of the epigraph', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.epigraphTitle = '';
        const resp = videoJWNotaMobile(newElementVideoJW, '123');
        expect(console.warn).not.toHaveBeenCalled();
        expect(resp).toStrictEqual(respExpectedV2);
    });

    it('videoJWNotaMobile when data missing', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = null;
        const resp = videoJWNotaMobile(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedMobileWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNota when playlist is null', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = null;
        const resp = videoJWNota(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedGlobalWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNota when playlist is undefined', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = undefined;
        const resp = videoJWNota(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedGlobalWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNota when playlist is empty array', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = [];
        const resp = videoJWNota(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedGlobalWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNota when playlist first item is null', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = [null];
        const resp = videoJWNota(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedGlobalWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNota when playlist first item is undefined', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = [undefined];
        const resp = videoJWNota(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedGlobalWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNotaMobile when playlist missing', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = [];
        const resp = videoJWNotaMobile(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedMobileWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNotaMobile when playlist first item is null', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = [null];
        const resp = videoJWNotaMobile(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedMobileWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });

    it('videoJWNotaMobile when playlist first item is undefined', () => {
        const newElementVideoJW = JSON.parse(JSON.stringify(elementVideoJW));
        newElementVideoJW.embed.config.videoJw.playlist = [undefined];
        const resp = videoJWNotaMobile(newElementVideoJW, '123');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
            expectedMobileWarning(newElementVideoJW)
        );
        expect(resp).toBe(null);
    });
});
