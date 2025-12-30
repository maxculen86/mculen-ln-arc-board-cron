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
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ASD',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT1',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT2',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT3',
                    type: 'LN-10/article'
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
                    badgeStyle: 'default',
                    type: 'LN-10/videoPlayer'
                }
            ],
            customFields: { layout: 'bn_player_3_grid' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(true);
        const result = respChildrens(props);
        expect(Object.keys(result).sort()).toEqual(
            ['articles', 'video'].sort()
        );
        expect(result).toEqual({
            articles: [
                {
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ASD',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
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
                badgeStyle: 'default',
                type: 'LN-10/videoPlayer'
            }
        });
    });

    it('should return correct articles and video when layout is bn_player_4_grid and validateChildrensApi returns true', () => {
        const props = {
            children: [
                {
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ASD',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT1',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT2',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT3',
                    type: 'LN-10/article'
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
                    badgeStyle: 'default',
                    type: 'LN-10/videoPlayer'
                }
            ],
            customFields: { layout: 'bn_player_4_grid' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(true);
        const result = respChildrens(props);
        expect(Object.keys(result).sort()).toEqual(
            ['articles', 'video'].sort()
        );
        expect(result).toEqual({
            articles: [
                {
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ASD',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT1',
                    type: 'LN-10/article'
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
                badgeStyle: 'default',
                type: 'LN-10/videoPlayer'
            }
        });
    });

    it('should return correct articles and video when layout is left-focal-video-vertical and validateChildrensApi returns true and features contains LN-10/timeline & nulls', () => {
        const props = {
            children: [
                {
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                null,
                null,
                {
                    _id: 'ASD',
                    type: 'LN-10/article'
                },
                null,
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT21',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT22',
                    type: 'LN-10/timeline'
                },
                {
                    _id: 'ERT23',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT24',
                    type: 'LN-10/article'
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
                    badgeStyle: 'default',
                    type: 'LN-10/videoPlayer'
                }
            ],
            customFields: { layout: 'left-focal-video-vertical' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(true);
        const result = respChildrens(props);
        expect(Object.keys(result).sort()).toEqual(
            ['articles', 'video'].sort()
        );
        expect(result).toEqual({
            articles: [
                {
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ASD',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT21',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT23',
                    type: 'LN-10/article'
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
                badgeStyle: 'default',
                type: 'LN-10/videoPlayer'
            }
        });
    });

    it('should return correct articles and video when layout is bn_player_3_grid and articles contains null values', () => {
        const props = {
            children: [
                {
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                null,
                null,
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT2',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT3',
                    type: 'LN-10/article'
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
                    badgeStyle: 'default',
                    type: 'LN-10/videoPlayer'
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
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT2',
                    type: 'LN-10/article'
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
                badgeStyle: 'default',
                type: 'LN-10/videoPlayer'
            }
        });
    });

    it('should return correct articles and video when layout is bn_player_4_grid and articles contains null values', () => {
        const props = {
            children: [
                {
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                null,
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                null,
                {
                    _id: 'ERT2',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT3',
                    type: 'LN-10/article'
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
                    badgeStyle: 'default',
                    type: 'LN-10/videoPlayer'
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
                    _id: 'XCV',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT2',
                    type: 'LN-10/article'
                },
                {
                    _id: 'ERT3',
                    type: 'LN-10/article'
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
                badgeStyle: 'default',
                type: 'LN-10/videoPlayer'
            }
        });
    });

    it('should return only articles when video is not present', () => {
        const props = {
            children: [{ _id: 'XCV', type: 'LN-10/article' }],
            customFields: { layout: 'bn_player_4_grid' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(true);
        const result = respChildrens(props);
        expect(result).toStrictEqual({
            video: null,
            articles: [{ _id: 'XCV', type: 'LN-10/article' }]
        });
    });
});
