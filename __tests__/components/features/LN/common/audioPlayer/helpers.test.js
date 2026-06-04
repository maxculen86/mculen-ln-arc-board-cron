import {
    getDurations,
    getMode,
    sendReproduction,
    setupBwReproductionTracking,
    PROGRESS_AUDIO
} from '../../../../../../components/features/LN/common/audioPlayer/helpers';
import getAudioEvents from '../../../../../../components/features/LN/common/audioPlayer/getAudioEvents';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/audioPlayer/getAudioEvents',
    () => ({
        __esModule: true,
        default: jest.fn((_globalContent, _globalContentConfig, isSummary) => ({
            audio_id: 'mock-audio-id',
            nota_id: 'SVKPHDGANBE4PDOA2EF6LXM2ZE',
            mode: isSummary ? 'summary' : 'full',
            origin: 'nota',
            seccion: 'sociedad',
            method: 'MP3',
            autor_nombre: 'N/A',
            custom_voice: false
        }))
    })
);

describe('components - features - LN - common - audioPlayer - helpers', () => {
    describe('getDurations', () => {
        it('should return full and summary when item has full and summary duration', () => {
            const item = {
                id: '70d69fe2-2a67-4ee4-9777-b940818ce0cc',
                duration: 99.97,
                summarization: {
                    audio: [
                        {
                            contentType: 'application/x-mpegURL',
                            duration: 35.218,
                            id: 82151128,
                            url: 'blob:http://arc.lanacion.com.ar/ef89da92-c29d-4f15-9938-bcb342296705'
                        },
                        {
                            contentType: 'audio/mpeg',
                            duration: 35.232,
                            id: 82151125,
                            url: 'https://cdn.beyondwords.io/audio/projects/38983/podcasts/70d69fe2-2a67-4ee4-9777-b940818ce0cc/versions/1754680057/media/ce5373938bbaa4ed1ffc02a9bdad1f48_compiled.mp3'
                        }
                    ]
                }
            };

            const res = getDurations(item);
            expect(res).toEqual({ full: 99.97, summary: 35.218 });
        });

        it('should return full and summary with value 0 when item is null/undefined', () => {
            expect(getDurations(null)).toEqual({ full: 0, summary: 0 });
            expect(getDurations(undefined)).toEqual({ full: 0, summary: 0 });
        });

        it('should preserve full when summarization/audio are missing', () => {
            const itemNoSummary = { duration: 88.5 };
            expect(getDurations(itemNoSummary)).toEqual({
                full: 88.5,
                summary: 0
            });

            const itemEmptyAudio = {
                duration: 70,
                summarization: { audio: [] }
            };
            expect(getDurations(itemEmptyAudio)).toEqual({
                full: 70,
                summary: 0
            });
        });
    });

    describe('getMode', () => {
        it('should return "summary" when player summary is true', () => {
            expect(getMode({ summary: true })).toBe('summary');
        });

        it('should return "full" when summary is falsy', () => {
            expect(getMode({ summary: false })).toBe('full');
            expect(getMode({})).toBe('full');
            expect(getMode(null)).toBe('full');
        });
    });

    describe('sendReproduction', () => {
        it('should use isSummary from context when it is explicitly boolean', () => {
            const context = {
                globalContent: {
                    _id: 'SVKPHDGANBE4PDOA2EF6LXM2ZE',
                    credits: { by: [] }
                },
                globalContentConfig: {
                    query: {
                        uri: '/autos/prueba-de-audio-con-autor-y-bajada-nid24102024/'
                    }
                },
                isSummary: true
            };

            sendReproduction(context, 50);

            expect(getAudioEvents).toHaveBeenCalledWith(
                context.globalContent,
                context.globalContentConfig,
                true
            );

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
            const trackingEvent = addEventToDataLayerV2.mock.calls[0][0];

            expect(trackingEvent.event).toBe('page_listened');
            expect(trackingEvent.rest.reproduccion).toBe('50');
            expect(trackingEvent.rest).toEqual(
                expect.objectContaining({
                    audio_id: 'mock-audio-id',
                    nota_id: 'SVKPHDGANBE4PDOA2EF6LXM2ZE',
                    mode: 'summary',
                    seccion: 'sociedad'
                })
            );
        });

        it('should fallback to player summary when isSummary is not provided in context', () => {
            const context = {
                globalContent: { _id: 'SVKPHDGANBE4PDOA2EF6LXM2ZE' },
                globalContentConfig: { section: 'sociedad' },
                player: { summary: false }
            };

            sendReproduction(context, 75);

            expect(getAudioEvents).toHaveBeenCalledWith(
                context.globalContent,
                context.globalContentConfig,
                false
            );

            expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
            const trackingEvent = addEventToDataLayerV2.mock.calls[0][0];

            expect(trackingEvent.event).toBe('page_listened');
            expect(trackingEvent.rest.reproduccion).toBe('75');
            expect(trackingEvent.rest).toEqual(
                expect.objectContaining({
                    nota_id: 'SVKPHDGANBE4PDOA2EF6LXM2ZE',
                    mode: 'full'
                })
            );
        });

        it('should accept numeric percentages and convert them to string', () => {
            const context = {
                globalContent: {},
                globalContentConfig: {},
                player: { summary: false }
            };
            sendReproduction(context, 100);
            const { rest } = addEventToDataLayerV2.mock.calls[0][0];
            expect(rest.reproduccion).toBe('100');
            expect(typeof rest.reproduccion).toBe('string');
        });
    });

    describe('setupBwReproductionTracking', () => {
        const createPlayer = content => {
            const handlers = {};
            return {
                content,
                addEventListener: jest.fn((event, cb) => {
                    handlers[event] = cb;
                }),
                fire: event => handlers[event]?.()
            };
        };

        const setupTracking = (player, overrides = {}) => {
            const args = {
                playerRef: { current: player },
                globalContent: {},
                globalContentConfig: {},
                setContentAvailable: jest.fn(),
                setSummaryAvailable: jest.fn(),
                ...overrides
            };
            setupBwReproductionTracking(args);
            return args;
        };

        describe('summary availability on ContentAvailable', () => {
            it('reports summary available when the summarization track has duration', () => {
                const player = createPlayer([
                    {
                        id: 'audio-1',
                        duration: 120,
                        summarization: { audio: [{ duration: 30 }] }
                    }
                ]);
                const { setSummaryAvailable } = setupTracking(player);

                player.fire('ContentAvailable');

                expect(setSummaryAvailable).toHaveBeenCalledWith(true);
            });

            it('reports summary unavailable when there is no summarization duration', () => {
                const player = createPlayer([{ id: 'audio-1', duration: 120 }]);
                const { setSummaryAvailable } = setupTracking(player);

                player.fire('ContentAvailable');

                expect(setSummaryAvailable).toHaveBeenCalledWith(false);
            });

            it('marks content as available', () => {
                const player = createPlayer([{ id: 'audio-1', duration: 120 }]);
                const { setContentAvailable } = setupTracking(player);

                player.fire('ContentAvailable');

                expect(setContentAvailable).toHaveBeenCalledWith(true);
            });
        });

        describe('reproduction thresholds', () => {
            const makeMockPlayer = ({
                id = 'A1',
                full = 100,
                summary = 40,
                startSummary = false
            } = {}) => ({
                summary: startSummary,
                currentTime: 0,
                content: [
                    {
                        id,
                        duration: full,
                        summarization: { audio: [{ duration: summary }] }
                    }
                ],
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            });

            const getHandler = (player, type) => {
                const match = player.addEventListener.mock.calls.find(
                    ([t]) => t === type
                );
                return match ? match[1] : undefined;
            };

            it('should emit 25/50/75 at thresholds', () => {
                const player = makeMockPlayer({ full: 100 });

                setupBwReproductionTracking({
                    playerRef: { current: player },
                    globalContent: {},
                    globalContentConfig: {},
                    setContentAvailable: () => {}
                });

                const onContentAvailable = getHandler(
                    player,
                    'ContentAvailable'
                );
                const onPlaybackPlaying = getHandler(player, 'PlaybackPlaying');
                const onCurrentTimeUpdated = getHandler(
                    player,
                    'CurrentTimeUpdated'
                );

                onContentAvailable?.();
                onPlaybackPlaying?.();

                player.currentTime = 24.9;
                onCurrentTimeUpdated?.();
                expect(addEventToDataLayerV2).not.toHaveBeenCalled();

                player.currentTime = 25;
                onCurrentTimeUpdated?.();
                expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
                expect(
                    addEventToDataLayerV2.mock.calls[0][0].rest.reproduccion
                ).toBe('25');

                player.currentTime = 50;
                onCurrentTimeUpdated?.();
                expect(addEventToDataLayerV2).toHaveBeenCalledTimes(2);
                expect(
                    addEventToDataLayerV2.mock.calls[1][0].rest.reproduccion
                ).toBe('50');

                player.currentTime = 75;
                onCurrentTimeUpdated?.();
                expect(addEventToDataLayerV2).toHaveBeenCalledTimes(3);
                expect(
                    addEventToDataLayerV2.mock.calls[2][0].rest.reproduccion
                ).toBe('75');

                player.currentTime = 90;
                onCurrentTimeUpdated?.();
                expect(addEventToDataLayerV2).toHaveBeenCalledTimes(3);
            });

            it('should emit 100 only on PlaybackEnded', () => {
                const player = makeMockPlayer({ full: 100 });

                setupBwReproductionTracking({
                    playerRef: { current: player },
                    globalContent: {},
                    globalContentConfig: {},
                    setContentAvailable: () => {}
                });

                const onContentAvailable = getHandler(
                    player,
                    'ContentAvailable'
                );
                const onPlaybackPlaying = getHandler(player, 'PlaybackPlaying');
                const onCurrentTimeUpdated = getHandler(
                    player,
                    'CurrentTimeUpdated'
                );
                const onPlaybackEnded = getHandler(player, 'PlaybackEnded');

                onContentAvailable?.();
                onPlaybackPlaying?.();

                player.currentTime = 100;
                onCurrentTimeUpdated?.();
                expect(addEventToDataLayerV2).toHaveBeenCalledTimes(
                    PROGRESS_AUDIO.length
                );

                onPlaybackEnded?.();
                expect(addEventToDataLayerV2).toHaveBeenCalledTimes(
                    PROGRESS_AUDIO.length + 1
                );
            });
        });
    });
});
