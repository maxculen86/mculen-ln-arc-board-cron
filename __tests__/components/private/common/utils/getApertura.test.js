import getApertura from '../../../../../components/private/common/utils/getApertura';

describe('getApertura test', () => {
    const basicImage = null;
    const videoBackground = {
        _id: '76c88e0b-33e7-405f-b6ad-b6a98fef7c77',
        additional_properties: {
            advertising: {
                playAds: true
            }
        },
        created_date: '2019-06-10T17:20:12Z',
        credits: {},
        duration: 59178,
        headlines: {
            basic: 'Test cambio de nombre y ordenn'
        },
        promo_items: {
            basic: {
                caption: 'ver que onda',
                credits: {},
                height: 720,
                type: 'image',
                url:
                    'https://d3us6z9haan6vf.cloudfront.net/06-10-2019/t_2214b49fc13b40e9a536fe92a650694e_name_file_1280x720_2000_v3_1_.jpg',
                width: 1280
            }
        },
        publish_date: '2020-03-18T12:35:37Z',
        streams: [
            {
                height: 360,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/10/5cfe914c46e0fb000981496e/t_520577cda990476baa7a9ecf733e4a97_name_05_30_2019_t_a35f599ee6764026add3d7967f88b000_name_Marilina_Rolling_1920x1080_2/file_640x360-600.mp4',
                width: 640
            },
            {
                height: 720,
                stream_type: 'mp4',
                url:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/10/5cfe914c46e0fb000981496e/t_520577cda990476baa7a9ecf733e4a97_name_05_30_2019_t_a35f599ee6764026add3d7967f88b000_name_Marilina_Rolling_1920x1080_2/file_1280x720-2000-v3_1.mp4',
                width: 1280
            }
        ],
        type: 'video'
    };
    const isMobile = false;
    const storytellingMobile = {
        _id: '5V7HOVM465E4FHY2FZ35TYITCE',
        additional_properties: {
            iptc_source: ''
        },
        caption:
            '2007. Una entrevista en Olivos entre la Presidenta Cristina Kirchner y LA NACION',
        credits: {
            by: [
                {
                    name: '',
                    type: 'author'
                }
            ]
        },
        description: {
            basic:
                '2007. Una entrevista en Olivos entre la Presidenta Cristina Kirchner y LA NACION'
        },
        distributor: {
            name: ''
        },
        height: 1125,
        resized_urls: [
            {
                option: {
                    height: 1280,
                    media: '(min-width: 1280px)',
                    media_preload: '(min-width: 1280.1px)',
                    width: 1920
                },
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/tzoA__c9WrZ3mG5-Yo36C9XSYlU=/1920x1280/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/5V7HOVM465E4FHY2FZ35TYITCE.jpg'
            },
            {
                option: {
                    height: 800,
                    media: '(min-width: 1024px)',
                    media_preload:
                        '(min-width: 1024.1px and max-width: 1280px)',
                    width: 1200
                },
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/2DQb4VTlospabMyEdMbVgRit_PY=/1200x800/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/5V7HOVM465E4FHY2FZ35TYITCE.jpg'
            },
            {
                option: {
                    height: 682,
                    media: '(min-width: 768px)',
                    media_preload: '(min-width: 768.1px and max-width: 1024px)',
                    width: 1023
                },
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/MXtN_IrP3kNmEq1QsOHZdTm-gvw=/1023x682/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/5V7HOVM465E4FHY2FZ35TYITCE.jpg'
            },
            {
                option: {
                    height: 1152,
                    media: '(min-width: 360px)',
                    media_preload: '(min-width: 375.1px and max-width: 768px)',
                    width: 768
                },
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/Ipvpz6pSwc5uPe9vabZz3frdTJU=/768x1152/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/5V7HOVM465E4FHY2FZ35TYITCE.jpg'
            },
            {
                option: {
                    height: 540,
                    media: '(min-width: 320px)',
                    media_preload: '(max-width: 375px)',
                    width: 360
                },
                resizedUrl:
                    'https://resizer.glanacion.com/resizer/-UhqIeu0gTLHGtA58IBQ4epQjwo=/360x540/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/5V7HOVM465E4FHY2FZ35TYITCE.jpg'
            }
        ],
        subtitle:
            '2007. Una entrevista en Olivos entre la Presidenta Cristina Kirchner y LA NACION',
        type: 'image',
        url:
            'https://resizer.glanacion.com/resizer/jAy1YvTHpx2cmfB2pxX77T48pKY=/1920x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/5V7HOVM465E4FHY2FZ35TYITCE.jpg',
        width: 2000
    };

    const apertura = getApertura(
        isMobile,
        basicImage,
        videoBackground,
        storytellingMobile
    );
    it('Check throw values from function', () => {
        expect(apertura).toBeTruthy();
        expect(apertura.video).toBe(
            'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/2019/06/10/5cfe914c46e0fb000981496e/t_520577cda990476baa7a9ecf733e4a97_name_05_30_2019_t_a35f599ee6764026add3d7967f88b000_name_Marilina_Rolling_1920x1080_2/file_1280x720-2000-v3_1.mp4'
        );
        expect(apertura.caption).toBe('Test cambio de nombre y ordenn');
        expect(apertura.src).toBe(
            'https://d3us6z9haan6vf.cloudfront.net/06-10-2019/t_2214b49fc13b40e9a536fe92a650694e_name_file_1280x720_2000_v3_1_.jpg'
        );
    });
});
