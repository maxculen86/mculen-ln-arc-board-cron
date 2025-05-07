import * as video from '../../../../../components/features/LN-Api/Video/json';

const propsComponent = ({
    arcSite = 'la-nacion-ar',
    globalContent,
    globalContentConfig
}) => {
    return {
        arcSite,
        globalContent,
        globalContentConfig
    };
};

jest.mock('fusion:consumer', component => {
    return function (component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state = {};
            }
            fetchContent(param) {}
        };
    };
});

describe('components - features - LN-Api - Video - json.js', () => {
    const props = propsComponent({
        arcSite: 'la-nacion-ar',
        globalContent: {
            sources: [
                {
                    file: 'https://cdn.jwplayer.com/manifests/mockvideoid.m3u8',
                    type: 'application/vnd.apple.mpegurl'
                },
                {
                    file: 'https://cdn.jwplayer.com/videos/mockvideoid-kTExGaWf.mp4',
                    type: 'video/mp4',
                    height: 320,
                    width: 180,
                    label: '180p',
                    bitrate: 397521,
                    filesize: 5764067,
                    framerate: 30
                },
                {
                    file: 'https://cdn.jwplayer.com/videos/mockvideoid-K8B0kybS.mp4',
                    type: 'video/mp4',
                    height: 480,
                    width: 270,
                    label: '270p',
                    bitrate: 491137,
                    filesize: 7121499,
                    framerate: 30
                },
                {
                    file: 'https://cdn.jwplayer.com/videos/mockvideoid-46NIuRKO.mp4',
                    type: 'video/mp4',
                    height: 1280,
                    width: 720,
                    label: '720p',
                    bitrate: 1104258,
                    filesize: 16011751,
                    framerate: 30
                },
                {
                    file: 'https://cdn.jwplayer.com/videos/mockvideoid-hz5z2Tv4.m4a',
                    type: 'audio/mp4',
                    label: 'AAC Audio',
                    bitrate: 113816,
                    filesize: 1650346
                },
                {
                    file: 'https://cdn.jwplayer.com/videos/mockvideoid-FnZGUVnC.mp4',
                    type: 'video/mp4',
                    height: 640,
                    width: 360,
                    label: '360p',
                    bitrate: 591446,
                    filesize: 8575976,
                    framerate: 30
                },
                {
                    file: 'https://cdn.jwplayer.com/videos/mockvideoid-0G6Pwvlw.mp4',
                    type: 'video/mp4',
                    height: 960,
                    width: 540,
                    label: '540p',
                    bitrate: 836633,
                    filesize: 12131187,
                    framerate: 30
                }
            ],
            poster: 'https://cdn.jwplayer.com/v2/media/mockvideoid/poster.jpg?width=320',
            duration: 116,
            title: 'Video Title',
            posterVideo:
                'https://assets-jpcust.jwpsrv.com/thumbnails/hciqmbos-320.mp4',
            _id: '89a3904251d640fb4939fb0fd05c92554b07387827427dfdf8def89554bed408'
        },
        globalContentConfig: {
            source: 'videosJwCarruselSource',
            query: {
                uri: '/api/mobile/v1/video/byId/mockvideoid/',
                id: 'mockvideoid',
                website: 'la-nacion-ar',
                'arc-site': 'la-nacion-ar'
            }
        }
    });

    it('When video load props Ok', () => {
        const objVideo = new video.default(props);
        expect(objVideo.props).toMatchObject(props);

        expect(
            Object.keys(objVideo).sort((a, b) => a.localeCompare(b))
        ).toEqual(
            [
                'fullVideoDuration',
                'fullVideoUrl',
                'id',
                'posterUrl',
                'previewVideoUrl',
                'props',
                'state',
                'title'
            ].sort((a, b) => a.localeCompare(b))
        );

        expect(objVideo.id).toBe('mockvideoid');
        expect(objVideo.title).toBe('Video Title');
    });

    it('When globalContent is null', () => {
        const objVideo = new video.default({ ...props, globalContent: null });
        expect(objVideo.Success).toBeFalsy();
        expect(objVideo.Message).toBe('the video does not exist');
    });
});
