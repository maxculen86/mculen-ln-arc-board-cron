import { respChildrens } from '../../../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/chainsTypes/videoPlayer';
import * as _helpers from '../../../../../../../../../../../components/private/LN/api/global/components/common/utils/_helpers';
import * as _helpers_WebApi from '../../../../../../../../../../../components/chains/utils/common/_helpers-WebApi';
describe('respChildrens videoPlayer', () => {
    it('should return null when validateChildrensApi returns false', () => {
        const props = {
            children: { parameter: 'a' },
            customFields: { layout: 'bn_player_3_grid' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(false);
        const result = respChildrens(props);
        expect(result).toBeNull();
    });
    it('should return correct articles and video when layout is bn_player_3_grid and validateChildrensApi returns true', () => {
        const props = {
            children: [
                {
                    _id: 'XCV'
                },
                {
                    _id: 'ASD'
                },
                {
                    _id: 'ERT'
                },
                {
                    _id: 'ERT1'
                },
                {
                    _id: 'ERT2'
                },
                {
                    _id: 'ERT3'
                },
                {
                    id: '9SP9fXDX',
                    posterUrl:
                        'http://cdn.jwplayer.com/v2/media/9SP9fXDX/poster.jpg?width=320',
                    previewVideoUrl:
                        'https://assets-jpcust.jwpsrv.com/thumbnails/sh0dhtyg-320.mp4',
                    fullVideoUrl:
                        'http://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                    fullVideoDuration: 10,
                    badgeStyle: 'default'
                }
            ],
            customFields: { layout: 'bn_player_3_grid' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(true);
        const result = respChildrens(props);
        expect(Object.keys(result).sort()).toEqual(
            ['articles', 'video'].sort()
        );
        expect(result).toStrictEqual({
            articles: [
                {
                    _id: 'XCV'
                },
                {
                    _id: 'ASD'
                },
                {
                    _id: 'ERT'
                }
            ],
            video: {
                id: '9SP9fXDX',
                posterUrl:
                    'http://cdn.jwplayer.com/v2/media/9SP9fXDX/poster.jpg?width=320',
                previewVideoUrl:
                    'https://assets-jpcust.jwpsrv.com/thumbnails/sh0dhtyg-320.mp4',
                fullVideoUrl: 'http://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                fullVideoDuration: 10,
                badgeStyle: 'default'
            }
        });
    });

    it('should return correct articles and video when layout is bn_player_4_grid and validateChildrensApi returns true', () => {
        const props = {
            children: [
                {
                    _id: 'XCV'
                },
                {
                    _id: 'ASD'
                },
                {
                    _id: 'ERT'
                },
                {
                    _id: 'ERT1'
                },
                {
                    _id: 'ERT2'
                },
                {
                    _id: 'ERT3'
                },
                {
                    id: '9SP9fXDX',
                    posterUrl:
                        'http://cdn.jwplayer.com/v2/media/9SP9fXDX/poster.jpg?width=320',
                    previewVideoUrl:
                        'https://assets-jpcust.jwpsrv.com/thumbnails/sh0dhtyg-320.mp4',
                    fullVideoUrl:
                        'http://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                    fullVideoDuration: 10,
                    badgeStyle: 'default'
                }
            ],
            customFields: { layout: 'bn_player_4_grid' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(true);
        const result = respChildrens(props);
        expect(Object.keys(result).sort()).toEqual(
            ['articles', 'video'].sort()
        );
        expect(result).toStrictEqual({
            articles: [
                {
                    _id: 'XCV'
                },
                {
                    _id: 'ASD'
                },
                {
                    _id: 'ERT'
                },
                {
                    _id: 'ERT1'
                }
            ],
            video: {
                id: '9SP9fXDX',
                posterUrl:
                    'http://cdn.jwplayer.com/v2/media/9SP9fXDX/poster.jpg?width=320',
                previewVideoUrl:
                    'https://assets-jpcust.jwpsrv.com/thumbnails/sh0dhtyg-320.mp4',
                fullVideoUrl: 'http://cdn.jwplayer.com/manifests/9SP9fXDX.m3u8',
                fullVideoDuration: 10,
                badgeStyle: 'default'
            }
        });
    });
});
