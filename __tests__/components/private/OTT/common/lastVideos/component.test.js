import Consumer from 'fusion:consumer';
import get from '../../../../../../components/private/common/utils/get';

jest.mock(
    '../../../../../../components/private/OTT/common/lastVideos/component',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import LastVideosComponent from '../../../../../../components/private/OTT/common/lastVideos/container';
import testHelper from '../../../../../utils/testHelper';

describe('private - OTT - component - LastVideos', () => {
    let videosArray = [
        {
            type: 'video',
            canonical_url: 'canonical_url',
            canonical_website: 'canonical_website',
            short_url: 'short_url',
            first_publish_date: '20190404',
            publish_date: '20190505',
            headlines: {
                basic: 'asd'
            },
            description: {
                basic: 'asdasdasdasd'
            },
            promo_items: {
                basic: {
                    url: '/url/qwe'
                }
            }
        },
        {
            type: 'video',
            canonical_url: 'canonical_url',
            canonical_website: 'canonical_website',
            short_url: 'short_url',
            first_publish_date: '20190404',
            publish_date: '20190505',
            headlines: {
                basic: 'asd'
            },
            description: {
                basic: 'asdasdasdasd'
            },
            promo_items: {
                basic: {
                    url: '/url/qwe'
                }
            }
        },
        {
            type: 'video',
            canonical_url: 'canonical_url',
            canonical_website: 'canonical_website',
            short_url: 'short_url',
            first_publish_date: '20190404',
            publish_date: '20190505',
            headlines: {
                basic: 'asd'
            },
            description: {
                basic: 'asdasdasdasd'
            },
            promo_items: {
                basic: {
                    url: '/url/qwe'
                }
            }
        },
        {
            type: 'video',
            canonical_url: 'canonical_url',
            canonical_website: 'canonical_website',
            short_url: 'short_url',
            first_publish_date: '20190404',
            publish_date: '20190505',
            headlines: {
                basic: 'asd'
            },
            description: {
                basic: 'asdasdasdasd'
            },
            promo_items: {
                basic: {
                    url: '/url/qwe'
                }
            }
        }
    ];

    let container = mount(<LastVideosComponent videos={videosArray} />);

    let component = container.find('mock-component');

    let videosDelMock = component.prop('videos');
    let videosDelMockLength = videosDelMock.length;

    it('Testeo que reciba los videos', () => {
        testHelper.expectSameValue(videosDelMock, videosArray);
    });

    it('Testeo que reciba los la cantidad correcta de videos', () => {
        testHelper.expectSameValue(videosDelMockLength, 4);
    });
});
