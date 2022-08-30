jest.mock(
    '../../../../../../components/private/OTT/common/videoArticle',
    () => 'mock-componentItem'
);

jest.mock(
    '../../../../../../components/private/OTT/programa/lastVideosByProgram/showMoreVideos',
    () => 'mock-componentButton'
);

import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../utils/testHelper';
import LastVideosByProgramContainer from '../../../../../../components/private/OTT/programa/lastVideosByProgram/component';
import get from '../../../../../../components/private/common/utils/get';

describe('private - OTT - feature - LastVideosByPrograms component', () => {
    function nextPage() {}

    let videosArray = [
        {
            headlines: {
                basic: 'Test Ale.S',
                meta_title: 'Test Ale.S'
            },
            promo_items: {
                basic: {
                    type: 'image',
                    version: '0.5.8',
                    credits: {},
                    caption: 'dsadasd',
                    url:
                        'https://d3us6z9haan6vf.cloudfront.net/04-08-2019/t_197ed75e275e4b5986a51da3a4657cfb_name_file_1920x1080_5400_v4_.jpg',
                    width: 1920,
                    height: 1080
                }
            }
        },
        {
            headlines: {
                basic: 'Test Ale.S',
                meta_title: 'Test Ale.S'
            },
            promo_items: {
                basic: {
                    type: 'image',
                    version: '0.5.8',
                    credits: {},
                    caption: 'dsadasd',
                    url:
                        'https://d3us6z9haan6vf.cloudfront.net/04-08-2019/t_197ed75e275e4b5986a51da3a4657cfb_name_file_1920x1080_5400_v4_.jpg',
                    width: 1920,
                    height: 1080
                }
            }
        },
        {
            headlines: {
                basic: 'Test Ale.S',
                meta_title: 'Test Ale.S'
            },
            promo_items: {
                basic: {
                    type: 'image',
                    version: '0.5.8',
                    credits: {},
                    caption: 'dsadasd',
                    url:
                        'https://d3us6z9haan6vf.cloudfront.net/04-08-2019/t_197ed75e275e4b5986a51da3a4657cfb_name_file_1920x1080_5400_v4_.jpg',
                    width: 1920,
                    height: 1080
                }
            }
        }
    ];

    let container = mount(
        <LastVideosByProgramContainer
            videos={videosArray}
            nextPageHandler={nextPage}
            hasNext={true}
        />
    );

    let component = container.find('mock-componentItem');
    let componentShowMoreVideos = container.find('mock-componentButton');

    //component tenga 3 elementos
    //que reciban las props correspondientes cada uno
    //chequeo que llegue la funcion
    //si tiene has next, dibuja boton
    //si no tiene has next, no dibuja boton

    it('Testeo que tenga 3 videos', () => {
        testHelper.expectSameValue(component.length, 3);
    });

    it('Testeo que muestre las props que yo le pase', () => {
        testHelper.expectProp(
            component.at(0),
            'imgSrc',
            videosArray[0].promo_items.basic.url
        );
        testHelper.expectProp(
            component.at(0),
            'description',
            videosArray[0].headlines.basic
        );
    });

    it('Testeo que muestre las props que yo le pase', () => {
        testHelper.expectProp(
            component.at(1),
            'imgSrc',
            videosArray[1].promo_items.basic.url
        );
        testHelper.expectProp(
            component.at(1),
            'description',
            videosArray[1].headlines.basic
        );
    });

    it('Testeo que muestre las props que yo le pase', () => {
        testHelper.expectProp(
            component.at(2),
            'imgSrc',
            videosArray[2].promo_items.basic.url
        );
        testHelper.expectProp(
            component.at(2),
            'description',
            videosArray[2].headlines.basic
        );
    });

    it('Testeo que tenga evento onclick que yo le pase', () => {
        if (componentShowMoreVideos.exists())
            testHelper.expectSameValue(
                componentShowMoreVideos.prop('onClick'),
                nextPage
            );
    });

    it('Testeo que se renderee el boton mas videos', () => {
        testHelper.expectSameValue(componentShowMoreVideos.exists(), true);
    });
});

describe('private - OTT - feature - LastVideosByPrograms component', () => {
    function nextPage() {}

    let videosArray = [
        {
            headlines: {
                basic: 'Test Ale.S',
                meta_title: 'Test Ale.S'
            },
            promo_items: {
                basic: {
                    type: 'image',
                    version: '0.5.8',
                    credits: {},
                    caption: 'dsadasd',
                    url:
                        'https://d3us6z9haan6vf.cloudfront.net/04-08-2019/t_197ed75e275e4b5986a51da3a4657cfb_name_file_1920x1080_5400_v4_.jpg',
                    width: 1920,
                    height: 1080
                }
            }
        },
        {
            headlines: {
                basic: 'Test Ale.S',
                meta_title: 'Test Ale.S'
            },
            promo_items: {
                basic: {
                    type: 'image',
                    version: '0.5.8',
                    credits: {},
                    caption: 'dsadasd',
                    url:
                        'https://d3us6z9haan6vf.cloudfront.net/04-08-2019/t_197ed75e275e4b5986a51da3a4657cfb_name_file_1920x1080_5400_v4_.jpg',
                    width: 1920,
                    height: 1080
                }
            }
        },
        {
            headlines: {
                basic: 'Test Ale.S',
                meta_title: 'Test Ale.S'
            },
            promo_items: {
                basic: {
                    type: 'image',
                    version: '0.5.8',
                    credits: {},
                    caption: 'dsadasd',
                    url:
                        'https://d3us6z9haan6vf.cloudfront.net/04-08-2019/t_197ed75e275e4b5986a51da3a4657cfb_name_file_1920x1080_5400_v4_.jpg',
                    width: 1920,
                    height: 1080
                }
            }
        }
    ];

    let container = mount(
        <LastVideosByProgramContainer
            videos={videosArray}
            nextPageHandler={nextPage}
            hasNext={false}
        />
    );

    let componentShowMoreVideos = container.find('mock-componentButton');

    it('Testeo que NO se renderee el boton mas videos', () => {
        testHelper.expectSameValue(componentShowMoreVideos.exists(), false);
    });
});
