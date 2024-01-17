import urlForPrerollAds from '../../../../../components/private/LN/common/utils/urlForPrerollAds';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('components - private - common - utils', () => {
    Context.useAppContext = jest.fn(() => ({
        requestUri: '',
        globalContent: {
            taxonomy: {
                sections: ['section1', 'section2'],
                tags: ['tag1', 'tag2']
            },
            label: {
                mostrar_banners: {
                    text: 'Yes'
                }
            },
            _id: '123',
            credits: {
                by: ['author1', 'author2']
            },
            contentElements: []
        },
        outputType: 'default'
    }));
    it('should return a valid URL for powa', () => {
        const device = 'desktop';
        const isJw = false;

        const result = urlForPrerollAds(device, isJw);

        expect(result).toContain(
            'https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/la_nacion_desktop/Nota/preroll_dsk&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&cust_params=section%3D%2C%2C%2C%2C%2C123&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&url=undefined&description_url=undefined&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator='
        );
    });

    it('should return a valid URL for videoJw', () => {
        const device = 'desktop';
        const isJw = true;

        const result = urlForPrerollAds(device, isJw);

        const baseUrl =
            'https://pubads.g.doubleclick.net/gampad/ads?slotname=/133919216/la_nacion_video/nota/preroll&sz=640x480|400x300&ciu_szs=300x250&unviewed_position_start=1&output=vast&impl=s&env=vp&gdfp_req=1&ad_rule=0&vad_type=linear&vpos=preroll&cust_params=tags_nuevos%3D%2C%2C%2C%2C%2C123&pod=3&ppos=1&lip=true&min_ad_duration=0&max_ad_duration=30000&vrid=6256&url=undefined&description_url=undefined&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0&correlator=';
        expect(result).toMatch(new RegExp(`^${baseUrl}`));

        const correlatorValue = result.split('correlator=')[1];
        expect(correlatorValue).toMatch(/^\d+$/);
    });

    it('should return an empty string when mostrar_banners label is set to No', () => {
        Context.useAppContext = jest.fn(() => ({
            requestUri: '',
            globalContent: {
                taxonomy: {
                    sections: ['section1', 'section2'],
                    tags: ['tag1', 'tag2']
                },
                label: {
                    mostrar_banners: {
                        text: 'No'
                    }
                },
                _id: '123',
                credits: {
                    by: ['author1', 'author2']
                },
                contentElements: []
            },
            outputType: 'default'
        }));
        const result = urlForPrerollAds('desktop', false);

        expect(result).toBe('');
    });
});
