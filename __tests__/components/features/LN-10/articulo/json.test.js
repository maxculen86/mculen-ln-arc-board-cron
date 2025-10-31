import LN10Article from '../../../../../components/features/LN-10/article/json';

jest.mock('fusion:consumer', component => {
    return function (component) {
        const newComponent = component;
        // Mock fetchContent
        newComponent.prototype.fetchContent = jest.fn();

        return newComponent;
    };
});

jest.mock('fusion:properties', () => {
    return {
        __esModule: true,
        default: arcSite => {
            return {
                cajaTemaConfig: {
                    focalLeft3: {
                        className: '--focal --left',
                        articles: {
                            0: [],
                            1: [],
                            2: []
                        }
                    }
                }
            };
        }
    };
});

jest.mock('../../../../../properties/sites/la-nacion-ar', () => {
    return {
        layoutsName: {
            Home: 'LN-Home_Main',
            HomeLN10: 'LN10-Home_Main',
            Acumulado: 'LN-acumulado',
            Columnistas: 'LN-acumulado-columnistas',
            FotoAl100: 'LN-nota-foto-al-100',
            Deportes: 'LN-Home_Sports',
            Noticia: 'LN-nota-noticia'
        }
    };
});
const { renderProps: renderPropsMock } = jest.requireMock(
    '../../../../../components/private/LN/api/global/components/features/article/LN10/renderProps.js'
);
jest.mock(
    '../../../../../components/private/LN/api/global/components/features/article/LN10/renderProps.js',
    () => ({
        __esModule: true,
        renderProps: jest.fn(
            (
                articleSourceNotaRender,
                articleImageRender,
                articleVideoRender,
                propsRender,
                configs
            ) => {
                if (propsRender?.id === 'throw') {
                    throw new Error('Error');
                }
                if (!articleSourceNotaRender) {
                    return null;
                }
                return {
                    _id: '1A',
                    website_url:
                        '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
                };
            }
        )
    })
);

jest.mock(
    '../../../../../components/private/LN/api/global/components/features/article/common/sources/articleSourceNotaSourceInclude',
    () => {
        return {
            articleSourceNotaSourceInclude: typeCard =>
                'taxonomy,distributor.name,related_content.basic,_id,last_updated_date,headlines,workflow,subheadlines,description,label,promo_items,canonical_website,credits,subtype,first_publish_date,publish_date,website,website_url,taxonomy.primary_section'
        };
    }
);

jest.mock(
    '../../../../../components/private/LN/api/global/components/features/article/LN10/props/validateProps',
    () => {
        return {
            validateProps: props => {
                return props;
            }
        };
    }
);

jest.mock('../../../../../content/filters/LN/home/LN10/videoFilterLN10', () => {
    return {
        videoFilterLN10: () => ({})
    };
});

jest.mock('../../../../../content/filters/LN/home/videoFilter', () => {
    return {
        filterVideo: () => ({})
    };
});

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn(() => true)
);

describe('components - feature - LN10 Articulo - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const propsArticle = {};
    propsArticle.id = '1';
    propsArticle.customFields = {
        noteId: 'RH34RVAJTZGDFEZAME5NQP7ESU ',
        hideDescription: false,
        variant: 'regular',
        pbInternal_cloneId: 'f0ft14zw0XIV5od',
        hideImage: false,
        lead: '',
        imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
        title: '',
        cllBoard:
            'https://canchallena.clanacion.com.ar/futbol/copa-argentina-2025/boca-juniors-argentino-monte-maiz-aeptpxkh2li6vimrypjso0ff8'
    };
    propsArticle.children = [1, 2, 3];
    propsArticle.renderables = [
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

    test('LN10 Article OK', () => {
        const props = { ...propsArticle };

        const article = LN10Article;
        const resultFeature = new article(props);
        resultFeature.state = {};
        resultFeature.state.articleSourceNotaLN10 = {
            _id: 'AAABBBB',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        };
        resultFeature.state.articleImageLN10 = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultFeature.state.articleVideoLN10 = {};
        const resultArticle = resultFeature.render();

        expect(resultArticle).toMatchObject({
            _id: '1A',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        });

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['configs', 'onlyOneApeturaValidateForWWW', 'props', 'state'].sort()
        );
    });
    test('LN10 Article OK when contains cllBoard', () => {
        const props = { ...propsArticle };

        const article = LN10Article;
        const configs = {
            imageConfig: '',
            config: undefined,
            index: -1,
            boxPosition: '00',
            layout: '',
            chainId: ''
        };
        const resultFeature = new article(props);
        resultFeature.state = {};
        resultFeature.state.articleSourceNotaLN10 = {
            _id: 'AAABBBB',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        };
        resultFeature.state.articleImageLN10 = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultFeature.state.articleVideoLN10 = {};
        const resultArticle = resultFeature.render();
        expect(renderPropsMock).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.anything(),
            props,
            configs
        );
        expect(resultArticle).toMatchObject({
            _id: '1A',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        });

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['configs', 'onlyOneApeturaValidateForWWW', 'props', 'state'].sort()
        );
    });
    test('LN10 Article when state is null', () => {
        const props = { ...propsArticle };

        const article = LN10Article;
        const resultFeature = new article(props);
        resultFeature.state = null;

        const resultArticle = resultFeature.render();

        expect(resultArticle).toBeNull();

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['configs', 'onlyOneApeturaValidateForWWW', 'props', 'state'].sort()
        );
    });

    test('LN10 Article when this.configs is null', () => {
        const props = { ...propsArticle };

        const article = LN10Article;
        const resultFeature = new article(props);
        resultFeature.state = {};
        resultFeature.state.articleSourceNotaLN10 = {
            _id: 'AAABBBB',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        };
        resultFeature.state.articleImageLN10 = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultFeature.state.articleVideoLN10 = {};
        resultFeature.configs = {};
        const resultArticle = resultFeature.render();
        expect(resultArticle).toMatchObject({
            _id: '1A',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        });
        expect(Object.keys(resultFeature).sort()).toEqual(
            ['configs', 'onlyOneApeturaValidateForWWW', 'props', 'state'].sort()
        );
    });

    test('LN10 Article when articleSourceNotaLN10 is null', () => {
        const props = { ...propsArticle };

        const article = LN10Article;
        const resultFeature = new article(props);
        resultFeature.state = {};
        resultFeature.state.articleSourceNotaLN10 = null;
        resultFeature.state.articleImageLN10 = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultFeature.state.articleVideoLN10 = {};
        const resultArticle = resultFeature.render();

        expect(resultArticle).toBeNull();

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['configs', 'onlyOneApeturaValidateForWWW', 'props', 'state'].sort()
        );
    });

    test('LN10 Article when validateArticleFeature is Error', () => {
        const props = {
            ...propsArticle,
            customFields: { ...propsArticle.customFields, video: 'RHlxTj40' }
        };

        const article = LN10Article;
        const resultFeature = new article(props);
        resultFeature.state = {};
        resultFeature.state.articleSourceNotaLN10 = {
            _id: 'AAABBBB',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        };
        resultFeature.state.articleImageLN10 = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultFeature.state.articleVideoLN10 = null;
        const resultArticle = resultFeature.render();

        expect(resultArticle).toBeNull();

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['configs', 'onlyOneApeturaValidateForWWW', 'props', 'state'].sort()
        );
    });

    test('LN10 Article when throw Error', () => {
        const props = { ...propsArticle };
        props.id = 'throw';

        const article = LN10Article;
        const resultFeature = new article(props);
        resultFeature.state = {};
        resultFeature.state.articleSourceNotaLN10 = {
            _id: 'AAABBBB',
            website_url:
                '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
        };
        resultFeature.state.articleImageLN10 = {
            promo_items: {},
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
        };
        resultFeature.state.articleVideoLN10 = {};
        const resultArticle = resultFeature.render();

        expect(resultArticle.Message).toBe('Error');
        expect(resultArticle.Success).toBe(false);

        expect(Object.keys(resultFeature).sort()).toEqual(
            ['configs', 'onlyOneApeturaValidateForWWW', 'props', 'state'].sort()
        );
    });
});
