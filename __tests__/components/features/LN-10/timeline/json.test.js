import LN10Timeline from '../../../../../components/features/LN-10/timeline/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        const newComponent = component;
        // Mock fetchContent
        newComponent.prototype.fetchContent = jest.fn();

        return newComponent;
    };
});

jest.mock(
    '../../../../../components/private/LN/api/global/components/features/article/LN/renderProps.js',
    () => {
        return {
            __esModule: true,
            renderProps: (elem, image, video, propsElem) => {
                if (propsElem.id === 'throw') {
                    throw new Error('Error');
                }
                if (!elem) {
                    return null;
                }
                return elem;
            }
        };
    }
);

jest.mock(
    '../../../../../components/private/LN/api/global/components/chains/common/respChildrens/index',
    () => {
        return {
            __esModule: true,
            default: (props, containerImage) => {
                if (props.flagError === 'error') {
                    throw new Error('Error');
                }
                return {
                    information: { ...props.customFields },
                    articles: props.children
                };
            }
        };
    }
);

jest.mock(
    '../../../../../components/private/common/utils/sectionsFormated.js',
    () => {
        return {
            __esModule: true,
            default: sections => 'tecnología,economía,política,recetas'
        };
    }
);

jest.mock('../../../../../components/private/common/utils/get.js', () => {
    return {
        __esModule: true,
        default: (element, key, defaultValue) => {
            if (key === 'customFields') {
                return element.customFields;
            }
            if (key === '_id') {
                return element._id;
            }
            return null;
        }
    };
});
describe('components - feature - LN10 Timeline - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const propsTimeline = {};
    propsTimeline.id = '10';
    propsTimeline.customFields = {
        size: 5,
        sectionTagType: 'section',
        sectionTagValue: '',
        collectionId: '',
        url: '',
        title: 'Últimas noticias',
        hideTitle: false,
        source: 'byLastNews',
        sections: [
            '/el-mundo',
            '/sociedad',
            '/politica',
            '/economia',
            '/deportes',
            '/seguridad'
        ]
    };
    propsTimeline.children = [1, 2, 3];
    propsTimeline.renderables = [
        {
            props: {
                id: '1'
            },
            children: [1, 2, 3]
        },
        {
            props: {
                id: '2'
            },
            children: [1, 2, 3]
        },
        {
            props: {
                id: '3'
            },
            children: [1, 2, 3]
        },
        {
            props: {
                id: '4'
            },
            children: [1, 2, 3]
        }
    ];

    const articles = {
        type: 'story',
        content_elements: [
            {
                _id: 'AAAA',
                website_url:
                    '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/',
                content_restrictions: {
                    content_code: 'común'
                }
            },
            {
                _id: 'BBBB',
                website_url:
                    '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062022/',
                content_restrictions: {
                    content_code: 'común'
                }
            },
            {
                _id: 'CCCC',
                website_url:
                    '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062023/',
                content_restrictions: {
                    content_code: 'común'
                }
            },
            {
                _id: 'DDDD',
                website_url:
                    '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062024/',
                content_restrictions: {
                    content_code: 'común'
                }
            },
            {
                _id: 'EEEE',
                website_url:
                    '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062025/',
                content_restrictions: {
                    content_code: 'común'
                }
            },
            {
                _id: 'FFFF',
                website_url:
                    '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062026/',
                content_restrictions: {
                    content_code: 'común'
                }
            }
        ]
    };

    test('LN10 timeline OK', () => {
        const props = Object.assign({}, propsTimeline);

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = {};
        resultFeature.state.acuArticlesSourceTime = articles;

        const resultTimeline = resultFeature.render();

        expect(resultTimeline.information).toMatchObject({
            collectionId: '',
            hideTitle: false,
            layout: 'timeline',
            sections: [
                '/el-mundo',
                '/sociedad',
                '/politica',
                '/economia',
                '/deportes',
                '/seguridad'
            ],
            sectionTagType: 'section',
            sectionTagValue: '',
            size: 5,
            source: 'byLastNews',
            title: 'Últimas noticias',
            url: ''
        });

        expect(resultTimeline.articles.length).toBe(5);

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('LN10 timeline when source is byTagSection', () => {
        const props = Object.assign({}, propsTimeline);
        const customFields = Object.assign({}, propsTimeline.customFields);
        customFields.source = 'byTagSection';
        props.customFields = customFields;

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = {};
        resultFeature.state.acuArticlesSourceTime = articles;

        const resultTimeline = resultFeature.render();

        expect(resultTimeline.information).toMatchObject({
            collectionId: '',
            hideTitle: false,
            layout: 'timeline',
            sections: [
                '/el-mundo',
                '/sociedad',
                '/politica',
                '/economia',
                '/deportes',
                '/seguridad'
            ],
            sectionTagType: 'section',
            sectionTagValue: '',
            size: 5,
            source: 'byTagSection',
            title: 'Últimas noticias',
            url: ''
        });

        expect(resultTimeline.articles.length).toBe(5);

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('LN10 timeline when sections is null', () => {
        const props = Object.assign({}, propsTimeline);
        const customFields = Object.assign({}, propsTimeline.customFields);
        customFields.sections = null;
        props.customFields = customFields;

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = {};
        resultFeature.state.acuArticlesSourceTime = articles;

        const resultTimeline = resultFeature.render();

        expect(resultTimeline.information).toMatchObject({
            collectionId: '',
            hideTitle: false,
            layout: 'timeline',
            sections: null,
            sectionTagType: 'section',
            sectionTagValue: '',
            size: 5,
            source: 'byLastNews',
            title: 'Últimas noticias',
            url: ''
        });

        expect(resultTimeline.articles.length).toBe(5);

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('LN10 timeline when acuArticlesSourceTime is null', () => {
        const props = Object.assign({}, propsTimeline);

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = {};
        resultFeature.state.acuArticlesSourceTime = null;

        const resultTimeline = resultFeature.render();

        expect(resultTimeline).toBeNull();
        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('LN10 timeline when Throw render', () => {
        const props = Object.assign({}, propsTimeline);
        props.flagError = 'error';

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = {};
        resultFeature.state.acuArticlesSourceTime = articles;

        const resultTimeline = resultFeature.render();

        expect(resultTimeline.Message).toBe('Error');
        expect(resultTimeline.Success).toBe(false);

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('LN10 timeline when this.state is null', () => {
        const props = Object.assign({}, propsTimeline);

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = null;

        const resultTimeline = resultFeature.render();
        expect(resultTimeline).toBeNull();

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('LN10 timeline when size is null', () => {
        const props = Object.assign({}, propsTimeline);
        const customFields = Object.assign({}, propsTimeline.customFields);
        customFields.size = undefined;
        props.customFields = customFields;

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = {};
        resultFeature.state.acuArticlesSourceTime = articles;

        const resultTimeline = resultFeature.render();

        expect(resultTimeline.information).toMatchObject({
            collectionId: '',
            hideTitle: false,
            layout: 'timeline',
            sections: [
                '/el-mundo',
                '/sociedad',
                '/politica',
                '/economia',
                '/deportes',
                '/seguridad'
            ],
            sectionTagType: 'section',
            sectionTagValue: '',
            size: undefined,
            source: 'byLastNews',
            title: 'Últimas noticias',
            url: ''
        });

        expect(resultTimeline.articles.length).toBe(5);

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });

    test('LN10 timeline when content_elements is null', () => {
        const props = Object.assign({}, propsTimeline);

        const timeline = LN10Timeline;
        const resultFeature = new timeline(props);
        resultFeature.state = {};
        resultFeature.state.acuArticlesSourceTime = {
            type: 'story'
        };

        const resultTimeline = resultFeature.render();

        expect(resultTimeline.information).toMatchObject({
            collectionId: '',
            hideTitle: false,
            layout: 'timeline',
            sections: [
                '/el-mundo',
                '/sociedad',
                '/politica',
                '/economia',
                '/deportes',
                '/seguridad'
            ],
            sectionTagType: 'section',
            sectionTagValue: '',
            size: 5,
            source: 'byLastNews',
            title: 'Últimas noticias',
            url: ''
        });

        expect(resultTimeline.articles.length).toBe(0);

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['getQueryElement', 'props', 'state'].sort()
        );
    });
});
