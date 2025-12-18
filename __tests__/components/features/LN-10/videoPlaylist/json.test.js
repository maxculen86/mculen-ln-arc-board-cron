import VideoPlaylistFeature from '../../../../../components/features/LN-10/videoPlaylist/json';

jest.mock('fusion:consumer', () => {
    return Component =>
        class extends Component {
            fetchContent() {
                void 0;
            }
        };
});
jest.mock('../../../../../components/chains/utils/isTodayEnabled', () =>
    jest.fn()
);

import isTodayEnabled from '../../../../../components/chains/utils/isTodayEnabled';

describe('VideoPlaylistFeature test', () => {
    const arcSite = 'la-nacion-ar';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('render()', () => {
        it('Returns null when no content was fetched', () => {
            const feature = new VideoPlaylistFeature({
                arcSite,
                customFields: { playlistId: '123' }
            });

            feature.state = {};

            expect(feature.render()).toBeNull();
        });

        it('Returns null when playlist is empty', () => {
            const feature = new VideoPlaylistFeature({
                arcSite,
                customFields: { playlistId: '123' }
            });

            feature.state = {
                playlist: { playlist: [] }
            };

            expect(feature.render()).toBeNull();
        });

        it('Returns null when isTodayEnabled is false', () => {
            isTodayEnabled.mockReturnValue(false);
            const feature = new VideoPlaylistFeature({
                arcSite,
                customFields: {
                    playlistId: '123',
                    shouldSchedule: true,
                    enabledDays: ['lunes']
                }
            });

            feature.state = {
                playlist: { playlist: [{ mediaid: '1' }] }
            };

            expect(feature.render()).toBeNull();
        });

        it('Returns null when hidePlaylist is true', () => {
            isTodayEnabled.mockReturnValue(true);
            const feature = new VideoPlaylistFeature({
                arcSite,
                customFields: {
                    playlistId: '123',
                    shouldSchedule: true,
                    enabledDays: ['lunes'],
                    hidePlaylist: true
                }
            });

            feature.state = {
                playlist: { playlist: [{ mediaid: '1' }] }
            };

            expect(feature.render()).toBeNull();
        });

        it('Returns transformed videos when playlist has items', () => {
            isTodayEnabled.mockReturnValue(true);

            const feature = new VideoPlaylistFeature({
                arcSite,
                customFields: {
                    playlistId: '123',
                    shouldSchedule: false,
                    hidePlaylist: false
                }
            });

            feature.state = {
                playlist: {
                    playlist: [
                        {
                            title: 'Video A',
                            mediaid: 'A1',
                            image: 'posterA.jpg',
                            duration: 100,
                            posterVideo: 'prevA.mp4',
                            sources: [
                                {
                                    file: 'https://cdn.jwplayer.com/manifests/prevA.m3u8',
                                    type: 'application/vnd.apple.mpegurl'
                                }
                            ]
                        },
                        {
                            title: 'Video B',
                            mediaid: 'B2',
                            image: 'posterB.jpg',
                            duration: 200,
                            posterVideo: 'prevB.mp4',
                            sources: [
                                {
                                    file: 'https://cdn.jwplayer.com/manifests/prevB.m3u8',
                                    type: 'application/vnd.apple.mpegurl'
                                }
                            ]
                        }
                    ]
                }
            };

            const result = feature.render();

            expect(result).toEqual([
                {
                    id: 'A1',
                    title: 'Video A',
                    posterUrl: 'posterA.jpg',
                    fullVideoUrl:
                        'https://cdn.jwplayer.com/manifests/prevA.m3u8',
                    previewVideoUrl: 'prevA.mp4',
                    fullVideoDuration: 100
                },
                {
                    id: 'B2',
                    title: 'Video B',
                    posterUrl: 'posterB.jpg',
                    fullVideoUrl:
                        'https://cdn.jwplayer.com/manifests/prevB.m3u8',
                    previewVideoUrl: 'prevB.mp4',
                    fullVideoDuration: 200
                }
            ]);
        });
    });
});
