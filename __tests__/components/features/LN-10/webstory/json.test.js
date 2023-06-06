import { object } from 'prop-types';
import LN10WebStory from '../../../../../components/features/LN-10/webStory/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
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
                            '0': [],
                            '1': [],
                            '2': []
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
            Noticia: 'LN-nota-noticia',
            OttFicha: 'OTT-ficha'
        }
    };
});

jest.mock(
    '../../../../../components/private/LN/api/global/components/features/article/LN10/renderProps.js',
    () => {
        //renderProps
        return {
            __esModule: true,
            renderProps: (
                articleSourceNotaRender,
                articleImageRender,
                articleVideoRender,
                propsRender,
                configs
            ) => {
                if (propsRender.id === 'throw') {
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
        };
    }
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

jest.mock(
    '../../../../../components/private/LN/api/global/components/features/article/LN10/props/validatePropsRender',
    () => {
        return {
            validatePropsRender: (
                articleSourceNotaLN10,
                articleImageLN10,
                articleVideoLN10,
                props,
                configs
            ) => ({
                propsRender: props,
                articleSourceNotaRender: articleSourceNotaLN10,
                articleImageRender: articleImageLN10,
                articleVideoRender: articleVideoLN10
            })
        };
    }
);

jest.mock(
    '../../../../../components/features/LN-10/article/common/_helper-WebApi.js',
    () => {
        return {
            __esModule: true,
            getChainConfig: ({ featureId, renderables, cajaTemaConfig }) => {
                if (featureId === 'error') {
                    return {
                        index: 0,
                        boxPosition: '01',
                        layout: 'error',
                        config: {
                            titleTag: 'h1',
                            subheadTag: 'h2',
                            withSection: true,
                            withMarquee: true,
                            withMarqueeImg: true,
                            withSubhead: false,
                            withMedia: true
                        }
                    };
                }
                return {
                    index: 0,
                    boxPosition: '01',
                    layout: 'bn-opening-4',
                    config: {
                        titleTag: 'h1',
                        subheadTag: 'h2',
                        withSection: true,
                        withMarquee: true,
                        withMarqueeImg: true,
                        withSubhead: false,
                        withMedia: true
                    }
                };
            },
            validateArticleFeature: params => {
                if (params.layout === 'error') {
                    return { message: 'error lalala' };
                }
                return null;
            },
            isInApertura: params => {
                return false;
            }
        };
    }
);

describe('components - feature - LN10 WebStory - json', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn');
        console.warn.mockImplementation(() => null);
    });
    const props = {
        id: '1',
        customFields: {
            imageId: 'UF5S34BB25DD5CWPOCQZGHCO3U',
            link: 'https://example.com',
            title: 'Web Story Title'
        }
    };
    props.children = [1, 2, 3];
    props.renderables = [
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
    test('LN10 WebStory OK', () => {
        const feature = new LN10WebStory(props);
        feature.state.webstoryImageLN10 = {};

        const result = feature.render();

        expect(result).toEqual({
            _id: 'webstory1',
            website_url: 'https://example.com',
            additionalProperties: {
                ...props.customFields,
                imagen: feature.state.webstoryImageLN10,
                variant: 'webstories',
                imageId: props.customFields.imageId
            }
        });
    });
    test('LN10 WebStory return null when dont has image', () => {
        const propsWithoutImage = props;
        propsWithoutImage.customFields.imageId = '';
        const feature = new LN10WebStory(propsWithoutImage);

        const result = feature.render();

        expect(result).toBeNull();
    });

    test('LN10 WebStory return null when dont has link', () => {
        const feature = new LN10WebStory({
            ...props,
            customFields: { ...props.customFields, link: '' }
        });
        feature.state.webstoryImageLN10 = {
            /* image data */
        };

        const result = feature.render();

        expect(result).toBeNull();
    });
});
