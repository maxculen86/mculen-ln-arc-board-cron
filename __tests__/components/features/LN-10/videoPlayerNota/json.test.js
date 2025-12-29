import VideoPlayerNotaFeature from '../../../../../components/features/LN-10/videoPlayerNota/json';
import responseArticleSourceNota from '../../../../../__mocks__/data/articles/2CIOHVMKJBHKDMMHH2WBIZGJWE.json';

jest.mock('fusion:consumer', () => {
    return Component =>
        class extends Component {
            fetchContent() {
                void 0;
            }
        };
});

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn(() => true)
);

describe('Video Player Nota Feature test', () => {
    const arcSite = 'la-nacion-ar';

    describe('Given an invalid video ID', () => {
        it('Renders null', () => {
            const video1 = new VideoPlayerNotaFeature({
                arcSite,
                customFields: { noteId: '', video: '' }
            });

            const video2 = new VideoPlayerNotaFeature({
                arcSite,
                customFields: { noteId: '', video: '1LL4faUg' }
            });

            const video3 = new VideoPlayerNotaFeature({
                arcSite,
                customFields: {
                    noteId: 'ACBGU55SYBCYPCNFII2RFBE2PA',
                    video: ''
                }
            });

            expect(video1.render()).toBeNull();
            expect(video2.render()).toBeNull();
            expect(video3.render()).toBeNull();
        });
    });

    describe('Given a non-existent video ID', () => {
        it('Renders null', () => {
            const video = new VideoPlayerNotaFeature({
                arcSite,
                customFields: { video: '000000' }
            });

            video.state = { videosJwData: null };

            const result = video.render();
            expect(result).toBeNull();
        });
    });

    describe('Given a valid video ID and article', () => {
        it('Renders the correct object', () => {
            const video = new VideoPlayerNotaFeature({
                arcSite,
                customFields: {
                    video: '000000',
                    noteId: '2CIOHVMKJBHKDMMHH2WBIZGJWE'
                }
            });

            video.state = {
                articleSourceNota: { ...responseArticleSourceNota },
                videosJwData: {
                    _id: '_ID',
                    title: 'Título desde JW',
                    poster: 'poster.jpg?width=320',
                    duration: 4003,
                    posterVideo: 'poster-video-320.mp4',
                    sources: [
                        {
                            file: 'playlist.m3u8',
                            type: 'application/vnd.apple.mpegurl'
                        },
                        {
                            file: 'video-180.mp4',
                            type: 'video/mp4',
                            height: 180,
                            width: 320,
                            label: '180p',
                            bitrate: 245727,
                            filesize: 101753,
                            framerate: 25
                        }
                    ]
                }
            };

            const result = video.render();
            expect(result._id).not.toBeUndefined();
            expect(result.videoData).toEqual({
                id: '000000',
                title: 'Título desde JW',
                posterUrl: 'poster.jpg?width=320',
                previewVideoUrl: 'poster-video-320.mp4',
                fullVideoUrl: 'playlist.m3u8',
                fullVideoDuration: 4003
            });
        });
    });
});
