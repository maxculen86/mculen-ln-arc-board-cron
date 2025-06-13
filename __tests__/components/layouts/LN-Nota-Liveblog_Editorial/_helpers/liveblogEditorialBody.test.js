import { getContentBeforeLiveblogPosts, reorderGroupsByPinnedBlock } from "../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody";

jest.mock('../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody', () => {
    const originalModule = jest.requireActual('../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody');
    return {
        ...originalModule,
        isLiveblogMarker: jest.fn((element) => element.type === 'custom_embed' && element.subtype === 'custom-liveblog'),
    };
});

describe('Components - layouts - LN-Nota-Liveblog_Editorial - _helpers - liveblogEditorialBody', () => {
    describe('getContentBeforeLiveblogPosts', () => {
        const content = [
            {
                _id: "6QUYKQ2CERHTTLF644T4JBZJYY",
                additional_properties: {},
                content: "Fue Bergoglio quien en 2023 lo llevó a la curia romana para que se encargara del Dicasterio para los Obispos",
                type: "text"
            },
            {
                _id: "XFIUMFX2DJENTGZ4AXGYPNOL5Y",
                additional_properties: {
                    mime_type: "image/jpeg"
                },
                type: 'image',
                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/XFIUMFX2DJENTGZ4AXGYPNOL5Y.jpg?auth=c3257e97aa8eb1d566362cb3a6dfcd6b3fbdecd81441e73af01d82a7727fa880&width=768&height=432&quality=70&smart=true'
            },
        ];

        it('should return an empty array if input is not an array', () => {
            expect(getContentBeforeLiveblogPosts(null)).toEqual([]);
            expect(getContentBeforeLiveblogPosts(undefined)).toEqual([]);
            expect(getContentBeforeLiveblogPosts({})).toEqual([]);
            expect(getContentBeforeLiveblogPosts('string')).toEqual([]);
        });

        it('should return the entire array if no liveblog marker is found', () => {
            expect(getContentBeforeLiveblogPosts(content)).toEqual(content);
        });

        it('should return elements before the first liveblog marker', () => {
            const contentElements = [
                ...content,
                {
                    _id: "CAWHD2JZYJHPNKUTHB75CZYBII",
                    embed: {},
                    subtype: "custom-liveblog",
                    type: "custom_embed"
                },
                ...content
            ];

            expect(getContentBeforeLiveblogPosts(contentElements)).toEqual(content);
        });

        it('should return an empty array if the liveblog marker is the first element', () => {
            const contentElements = [
                {
                    _id: "CAWHD2JZYJHPNKUTHB75CZYBII",
                    embed: {},
                    subtype: "custom-liveblog",
                    type: "custom_embed"
                },
                ...content
            ];
            expect(getContentBeforeLiveblogPosts(contentElements)).toEqual([]);
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
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

            const post = [
                {
                    items: [
                        { embed: { config: { isPinned: true, pinnedAt: yesterday } } }
                    ]
                },
                {
                    items: [
                        { embed: { config: { isPinned: true, pinnedAt: now } } }
                    ]
                },
                {
                    items: [
                        { embed: { config: { isPinned: false } } }
                    ]
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
                { items: [{ embed: { config: { isPinned: true, pinnedAt: '2024-01-01T00:00:00Z' } } }] }
            ];

            const result = reorderGroupsByPinnedBlock(post);
            expect(result[0].isPinned).toBe(true);
        });
    });
});