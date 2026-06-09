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

    const navigationTreeCommentsEnabled = {
        Termicas: { livefyre: 'true' },
        migration: { deadline_livefyre: '2020-02-07' }
    };

    const baseArticleState = {
        _id: 'AAABBBB',
        website_url:
            '/sociedad/coronavirus-en-argentina-casos-en-vera-santa-fe-al-29-de-junio-nid29062021/'
    };

    const baseImageState = {
        promo_items: {},
        _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3'
    };

    const renderArticleFeature = articleSourceNotaLN10 => {
        const props = { ...propsArticle };
        const resultFeature = new LN10Article(props);
        resultFeature.state = {
            articleSourceNotaLN10,
            articleImageLN10: baseImageState,
            articleVideoLN10: {},
            navigationTreeSourceLN10: navigationTreeCommentsEnabled
        };
        resultFeature.render();
        return resultFeature;
    };

    describe('comentarios', () => {
        test('passes comentarios to renderProps when comments are open', () => {
            renderArticleFeature({
                ...baseArticleState,
                comments: {
                    allow_comments: true,
                    display_comments: true
                },
                first_publish_date: '2020-07-06T18:04:32.394Z'
            });

            expect(renderPropsMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    comentarios: {
                        abiertoComentarios: true,
                        permitirComentarios: true
                    }
                }),
                baseImageState,
                {},
                expect.anything(),
                expect.anything()
            );
        });

        test('sets abiertoComentarios false when livefyre is disabled', () => {
            const props = { ...propsArticle };
            const resultFeature = new LN10Article(props);
            resultFeature.state = {
                articleSourceNotaLN10: {
                    ...baseArticleState,
                    comments: {
                        allow_comments: true,
                        display_comments: true
                    },
                    first_publish_date: '2020-07-06T18:04:32.394Z'
                },
                articleImageLN10: baseImageState,
                articleVideoLN10: {},
                navigationTreeSourceLN10: {
                    Termicas: { livefyre: 'false' },
                    migration: { deadline_livefyre: '2020-02-07' }
                }
            };
            resultFeature.render();

            expect(renderPropsMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    comentarios: {
                        abiertoComentarios: false,
                        permitirComentarios: true
                    }
                }),
                expect.anything(),
                expect.anything(),
                expect.anything(),
                expect.anything()
            );
        });

        test('sets abiertoComentarios false when article predates deadline_livefyre', () => {
            renderArticleFeature({
                ...baseArticleState,
                comments: {
                    allow_comments: true,
                    display_comments: true
                },
                first_publish_date: '2019-01-01T00:00:00.000Z'
            });

            expect(renderPropsMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    comentarios: {
                        abiertoComentarios: false,
                        permitirComentarios: true
                    }
                }),
                expect.anything(),
                expect.anything(),
                expect.anything(),
                expect.anything()
            );
        });

        test('sets permitirComentarios null when allow_comments is missing', () => {
            renderArticleFeature({
                ...baseArticleState,
                comments: { display_comments: true },
                first_publish_date: '2020-07-06T18:04:32.394Z'
            });

            expect(renderPropsMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    comentarios: {
                        abiertoComentarios: true,
                        permitirComentarios: false
                    }
                }),
                expect.anything(),
                expect.anything(),
                expect.anything(),
                expect.anything()
            );
        });
    });

    test('fetches navigationTreeSource with livefyre and deadline_livefyre filter', () => {
        const props = { ...propsArticle };
        const resultFeature = new LN10Article(props);
        const fetchCalls = resultFeature.fetchContent.mock.calls;
        const navigationCall = fetchCalls.find(
            ([config]) => config.navigationTreeSourceLN10
        );

        expect(navigationCall[0].navigationTreeSourceLN10.filter).toContain(
            'livefyre'
        );
        expect(navigationCall[0].navigationTreeSourceLN10.filter).toContain(
            'deadline_livefyre'
        );
    });
});
