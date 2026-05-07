import { convertMillisecondsToMinutes } from '../../../../../components/features/LN-common/LN10_En_Vivo/_helpers';
import {
    calculateTimePublish,
    formatDateToSpanish,
    reorderGroupsByPinnedBlock
} from '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody';
import { getContentBeforeMarkers } from '../../../../../components/layouts/helpers/groupingUtils';

jest.mock(
    '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody',
    () => {
        const originalModule = jest.requireActual(
            '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody'
        );
        return {
            ...originalModule,
            isLiveblogMarker: jest.fn(
                element =>
                    element.type === 'custom_embed' &&
                    element.subtype === 'custom-liveblog'
            ),
            formatDateToSpanish: jest.fn(() => '30/06/2025')
        };
    }
);

jest.mock(
    '../../../../../components/features/LN-common/LN10_En_Vivo/_helpers',
    () => ({
        convertMillisecondsToMinutes: jest.fn()
    })
);

describe('Components - layouts - LN-Nota-Liveblog_Editorial - _helpers - liveblogEditorialBody', () => {
    describe('getLiveblogHeaderData author/link/photo logic', () => {
        const {
            getLiveblogHeaderData
        } = require('../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody');

        const buildGroup = (authors, extraConfig = {}) => ({
            _id: 'group_1',
            items: [
                {
                    type: 'custom_embed',
                    subtype: 'custom-liveblog',
                    embed: {
                        config: {
                            title: 'Título',
                            authors,
                            showCustomTime: true,
                            customTime: 'Ahora',
                            ...extraConfig
                        }
                    }
                }
            ]
        });

        it('single author: shows photo and link when both provided', () => {
            const group = buildGroup([
                {
                    id: 'ana-333',
                    name: 'Ana',
                    link: '/autor/ana/',
                    photo: 'https://img/ana.jpg'
                }
            ]);

            const header = getLiveblogHeaderData(group);
            expect(header.author).toEqual({ name: 'Ana', link: '/autor/ana/' });
            expect(header.photo).toBe('https://img/ana.jpg');
            expect(header.hasAuthors).toBe(true);
        });

        it('single author: no photo but has link then no photo and linkable name', () => {
            const group = buildGroup([
                {
                    _id: 'ana-333',
                    name: 'Ana',
                    link: '/autor/ana/'
                }
            ]);
            const header = getLiveblogHeaderData(group);
            expect(header.author).toEqual({ name: 'Ana', link: '/autor/ana/' });
            expect(header.photo).toBe('');
        });

        it('single author: has photo but no link on BioPage and no id -> non-linkable name, photo shown', () => {
            const group = buildGroup([
                {
                    name: 'Ana',
                    photo: 'https://img/ana.jpg'
                }
            ]);
            const header = getLiveblogHeaderData(group);
            expect(header.author).toEqual({ name: 'Ana', link: '' });
            expect(header.photo).toBe('https://img/ana.jpg');
        });

        it('multiple authors: no photo, linkable authors list', () => {
            const group = buildGroup([
                { id: 'ana-333', name: 'Ana' },
                { name: 'Bob', link: '/autor/bob/' }
            ]);
            const header = getLiveblogHeaderData(group);
            expect(header.author).toBeNull();
            expect(header.photo).toBeNull();
            expect(header.authors).toEqual([
                { name: 'Ana', link: '/autor/ana-333/' },
                { name: 'Bob', link: '/autor/bob/' }
            ]);
            expect(header.hasAuthors).toBe(true);
        });
    });
    describe('getContentBeforeMarkers for liveblog', () => {
        const content = [
            {
                _id: '6QUYKQ2CERHTTLF644T4JBZJYY',
                additional_properties: {},
                content:
                    'Fue Bergoglio quien en 2023 lo llevó a la curia romana para que se encargara del Dicasterio para los Obispos',
                type: 'text'
            },
            {
                _id: 'XFIUMFX2DJENTGZ4AXGYPNOL5Y',
                additional_properties: {
                    mime_type: 'image/jpeg'
                },
                type: 'image',
                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/XFIUMFX2DJENTGZ4AXGYPNOL5Y.jpg?auth=c3257e97aa8eb1d566362cb3a6dfcd6b3fbdecd81441e73af01d82a7727fa880&width=768&height=432&quality=70&smart=true'
            }
        ];

        it('should return an empty array if input is not an array', () => {
            expect(getContentBeforeMarkers(null, 'custom-liveblog')).toEqual(
                []
            );
            expect(
                getContentBeforeMarkers(undefined, 'custom-liveblog')
            ).toEqual([]);
            expect(getContentBeforeMarkers({}, 'custom-liveblog')).toEqual([]);
            expect(
                getContentBeforeMarkers('string', 'custom-liveblog')
            ).toEqual([]);
        });

        it('should return the entire array if no liveblog marker is found', () => {
            expect(getContentBeforeMarkers(content, 'custom-liveblog')).toEqual(
                content
            );
        });

        it('should return elements before the first liveblog marker', () => {
            const contentElements = [
                ...content,
                {
                    _id: 'CAWHD2JZYJHPNKUTHB75CZYBII',
                    embed: {},
                    subtype: 'custom-liveblog',
                    type: 'custom_embed'
                },
                ...content
            ];

            expect(
                getContentBeforeMarkers(contentElements, 'custom-liveblog')
            ).toEqual(content);
        });

        it('should return an empty array if the liveblog marker is the first element', () => {
            const contentElements = [
                {
                    _id: 'CAWHD2JZYJHPNKUTHB75CZYBII',
                    embed: {},
                    subtype: 'custom-liveblog',
                    type: 'custom_embed'
                },
                ...content
            ];
            expect(
                getContentBeforeMarkers(contentElements, 'custom-liveblog')
            ).toEqual([]);
        });
    });

    describe('reorderGroupsByPinnedBlock', () => {
        it('should return the same array if there are no pinned items', () => {
            const post = [
                { items: [{ embed: { config: { isPinned: false } } }] },
                { items: [{ embed: { config: {} } }] }
            ];

            const result = reorderGroupsByPinnedBlock(post);
            expect(result).toEqual(post);
        });

        it('should reorder groups putting the one with the most recent pinned item first and add isPinned: true', () => {
            const now = new Date().toISOString();
            const yesterday = new Date(
                Date.now() - 24 * 60 * 60 * 1000
            ).toISOString();

            const post = [
                {
                    items: [
                        {
                            embed: {
                                config: { isPinned: true, pinnedAt: yesterday }
                            }
                        }
                    ]
                },
                {
                    items: [
                        { embed: { config: { isPinned: true, pinnedAt: now } } }
                    ]
                },
                {
                    items: [{ embed: { config: { isPinned: false } } }]
                }
            ];

            const result = reorderGroupsByPinnedBlock(post);

            expect(result[0].items[0].embed.config.pinnedAt).toBe(now);
            expect(result[0].isPinned).toBe(true);

            expect(result[0]).toEqual({ isPinned: true, ...post[1] });
            expect(result[1]).toEqual(post[0]);
            expect(result[2]).toEqual(post[2]);
        });

        it('should not throw if embed or config is missing', () => {
            const post = [
                { items: [{}] },
                { items: [{ embed: {} }] },
                {
                    items: [
                        {
                            embed: {
                                config: {
                                    isPinned: true,
                                    pinnedAt: '2024-01-01T00:00:00Z'
                                }
                            }
                        }
                    ]
                }
            ];

            const result = reorderGroupsByPinnedBlock(post);
            expect(result[0].isPinned).toBe(true);
        });
    });

    describe('calculateTimePublish', () => {
        const baseConfig = {
            date: '2025-06-30',
            time: '12:00',
            showCustomTime: false
        };

        const currentDate = new Date('2025-06-30T13:00:00');

        afterEach(() => jest.clearAllMocks());

        it('returns "Hace X min" when diff is less than 60 minutes', () => {
            convertMillisecondsToMinutes.mockReturnValue(45);

            const result = calculateTimePublish(baseConfig, currentDate);
            expect(result).toEqual({ relative: 'Hace 45 min' });
        });

        it('returns exact time when diff is between 60 and 720 minutes (inclusive)', () => {
            convertMillisecondsToMinutes.mockReturnValue(120);

            const result = calculateTimePublish(baseConfig, currentDate);
            expect(result.time).toMatch(/^\d{2}:\d{2}$/);
            expect(result.date).toBeUndefined();
        });

        it('returns time and formatted date when diff is more than 720 minutes', () => {
            convertMillisecondsToMinutes.mockReturnValue(800);

            const result = calculateTimePublish(baseConfig, currentDate);
            expect(result.time).toMatch(/^\d{2}:\d{2}$/);
            expect(result.date).toBe('30 de Junio de 2025');
        });

        it('returns empty object if config is empty', () => {
            const result = calculateTimePublish({});
            expect(result).toEqual({});
        });

        it('returns empty object if showCustomTime is true', () => {
            const result = calculateTimePublish({
                ...baseConfig,
                showCustomTime: true
            });
            expect(result).toEqual({});
        });

        it('returns empty object if date or time is missing', () => {
            expect(calculateTimePublish({ time: '12:00' })).toEqual({});
            expect(calculateTimePublish({ date: '2025-06-30' })).toEqual({});
        });
    });

    describe('calculateTimePublish - timezone fix (GMT-3 Argentina)', () => {
        afterEach(() => jest.clearAllMocks());

        it('should return "Hace 10 min" for a post published 10 minutes ago in Argentina, simulating a UTC client', () => {
            // Post publicado a las 08:00 ART (UTC-3) = 11:00 UTC
            // currentDate = 10 min después = 11:10 UTC
            const config = {
                date: '2026-05-05',
                time: '08:00',
                showCustomTime: false
            };
            const currentDate = new Date('2026-05-05T11:10:00Z');
            convertMillisecondsToMinutes.mockReturnValue(10);

            const result = calculateTimePublish(config, currentDate);

            expect(result).toEqual({ relative: 'Hace 10 min' });
        });

        it('should return time as HH:MM string for a post published 2 hours ago in Argentina', () => {
            // Post publicado a las 08:00 ART (UTC-3) = 11:00 UTC
            // currentDate = 2 horas después = 13:00 UTC
            const config = {
                date: '2026-05-05',
                time: '08:00',
                showCustomTime: false
            };
            const currentDate = new Date('2026-05-05T13:00:00Z');
            convertMillisecondsToMinutes.mockReturnValue(120);

            const result = calculateTimePublish(config, currentDate);

            expect(result.time).toMatch(/^\d{2}:\d{2}$/);
            expect(result.date).toBeUndefined();
        });

        it('should return time and date for a post published 13 hours ago in Argentina', () => {
            // Post publicado a las 08:00 ART (UTC-3) = 11:00 UTC
            // currentDate = 13 horas después = 00:00 UTC next day
            const config = {
                date: '2026-05-05',
                time: '08:00',
                showCustomTime: false
            };
            const currentDate = new Date('2026-05-06T00:00:00Z');
            convertMillisecondsToMinutes.mockReturnValue(780);

            const result = calculateTimePublish(config, currentDate);

            expect(result.time).toMatch(/^\d{2}:\d{2}$/);
            expect(result.date).toBeDefined();
        });
    });

    describe('originalFormatDateToSpanish', () => {
        const { formatDateToSpanish: originalFormatDateToSpanish } =
            jest.requireActual(
                '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody'
            );

        it('should format valid date string to Spanish format', () => {
            expect(originalFormatDateToSpanish('2025-07-02')).toBe(
                '02 de Julio de 2025'
            );
            expect(originalFormatDateToSpanish('2020-01-01')).toBe(
                '01 de Enero de 2020'
            );
        });

        it('should return empty string for invalid month', () => {
            expect(originalFormatDateToSpanish('2025-13-02')).toBe('');
        });

        it('should return empty string for invalid input', () => {
            expect(originalFormatDateToSpanish('')).toBe('');
            expect(originalFormatDateToSpanish(null)).toBe('');
            expect(originalFormatDateToSpanish(undefined)).toBe('');
            expect(originalFormatDateToSpanish(123)).toBe('');
        });

        it('should handle single-digit days correctly', () => {
            expect(originalFormatDateToSpanish('2025-04-7')).toBe(
                '07 de Abril de 2025'
            );
        });
    });
});
