import apiJwVideoPlaylistLayout from '../../../../components/layouts/Api-LN-videoPlaylist/json.js';

describe('apiJwVideoPlaylistLayout', () => {
    it('Filtra los nulls y aplana los arrays correctamente', () => {
        const video1 = {
            id: 'asdasdas',
            title: 'video 1',
            posterUrl:
                'https://cdn.jwplayer.com/v2/media/asdasdas/poster.jpg?width=720',
            fullVideoUrl: 'https://cdn.jwplayer.com/manifests/asdasdas.m3u8',
            fullVideoDuration: 933
        };

        const video2 = {
            id: 'abcd1234',
            title: 'video 2',
            posterUrl:
                'https://cdn.jwplayer.com/v2/media/abcd1234/poster.jpg?width=720',
            fullVideoUrl: 'https://cdn.jwplayer.com/manifests/abcd1234.m3u8',
            fullVideoDuration: 500
        };

        const children = [
            [null, [video1, video2], null, [video2, video1], null]
        ];

        const result = apiJwVideoPlaylistLayout({ children });

        expect(result.videos).toEqual([video1, video2, video2, video1]);
        expect(result.videos.length).toBe(4);
    });

    it('Devuelve array vacío si children[0] no existe', () => {
        const result = apiJwVideoPlaylistLayout({ children: [] });

        expect(result.videos).toEqual([]);
    });
});
