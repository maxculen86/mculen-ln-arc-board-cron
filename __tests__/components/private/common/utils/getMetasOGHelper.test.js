import {
    getAppId,
    getUrl,
    setMetaDescription,
    getData,
    validateTitle,
    getDescription,
    getImageProps,
    buildOgMetas,
    setMetaTitle,
    buildArticleMetas,
    buildFbMetas,
    buildTwitterMetas,
    ensureAtSymbol,
    getTwitterLink,
    getDataForProfileType
} from '../../../../../components/private/common/utils/getMetasOGHelper';
import {
    getModifiedDate,
    getPublishDate
} from '../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        arcSite: 'la-nacion-ar'
    }))
}));

jest.mock(
    '../../../../../components/private/common/utils/schema/liveBlog/generatePostObject',
    () => ({
        getPublishDate: jest.fn(),
        getModifiedDate: jest.fn()
    })
);

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock('fusion:properties', () => () => ({
    host: 'https://www.lanacion.com.ar'
}));

describe('Test return functions by getMetasOGHelper', () => {
    it('Test return default function getAppId', () => {
        const siteProperties = undefined;
        expect(getAppId(siteProperties)).toStrictEqual(undefined);
    });
    it('Test function getUrl', () => {
        const domain = 'https://www.lanacion.com.ar/';
        const url = '/el-mundo/un-argentino-contrajo-coronavirus';
        expect(getUrl(url, domain)).toStrictEqual(
            'https://www.lanacion.com.ar//el-mundo/un-argentino-contrajo-coronavirus/'
        );
    });

    it('Test return getDescription', () => {
        const props = {
            isArticle: false,
            subheadlinesBasic: 'Todas las noticias de Argentina y el mundo',
            section: 'nota',
            descriptionDefault: 'La nacion',
            metaDescription: 'Ultimas noticias de Argentina y el mundo.',
            arcSite: 'la-nacion-ar'
        };
        expect(getDescription(props)).toStrictEqual(
            'Ultimas noticias de Argentina y el mundo.'
        );
    });
    it('Test return validateTitle', () => {
        const longTitle = 'La Nacion';
        const titleDefault = 'Ultimas noticias en Argentina y El mundo';
        const section = 'home';
        expect(validateTitle(section, longTitle, titleDefault)).toStrictEqual(
            'La Nacion'
        );
    });

    it('Test return function setMetaDescription', () => {
        const props = {
            data: {
                subtype: 6,
                description: '',
                title: 'Ultimas noticias de Argentina y el Mundo'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Ultimas noticias de Argentina y el Mundo'
        );
    });

    it('Test return function setMetaDescription subtype RECETA', () => {
        const props = {
            data: {
                subtype: '7',
                description: 'Preparacion de arroz chaufa de mariscos',
                title: 'Arroz chaufa de mariscos',
                arcSite: 'la-nacion-ar'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Preparacion de arroz chaufa de mariscos. Encontrá acá la receta de Arroz chaufa de mariscos'
        );
    });

    it('Test return function setMetaDescription subtype RECETA and description string empty', () => {
        const props = {
            data: {
                subtype: '7',
                description: '',
                title: 'Arroz chaufa de mariscos',
                arcSite: 'la-nacion-ar'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Encontrá acá la receta de Arroz chaufa de mariscos'
        );
    });

    it('Test return function setMetaDescription subtype !== RECETA and description string != empty', () => {
        const props = {
            data: {
                subtype: '8',
                description: 'El mundo',
                title: ''
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual('El mundo');
    });

    it('Test return default function setMetaDescription', () => {
        const props = {
            data: {
                subtype: 5,
                description:
                    'Todas las noticias de Argentina y el mundo en La Nacion',
                title: 'Ultimas noticias de Argentina y el Mundo'
            },
            arcSite: 'la-nacion-ar',
            section: 'home'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Todas las noticias de Argentina y el mundo en La Nacion'
        );
    });
    it('Test return function setMetaDescription subtype VIDEO without description', () => {
        const props = {
            data: {
                subtype: '5',
                description: '',
                title: 'El titulo del video',
                arcSite: 'la-nacion-ar',
                displayDate: '2024-01-09T19:22:33.461Z'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'Video de El titulo del video - 09/01/2024'
        );
    });
    it('Test return function setMetaDescription subtype VIDEO with description', () => {
        const props = {
            data: {
                subtype: '5',
                description: 'La descripcion del video',
                title: 'El titulo del video',
                arcSite: 'la-nacion-ar',
                displayDate: '2024-01-09T19:22:33.461Z'
            },
            arcSite: 'la-nacion-ar',
            section: 'nota'
        };

        expect(setMetaDescription(props)).toStrictEqual(
            'La descripcion del video'
        );
    });

    describe('Test return function ensureAtSymbol', () => {
        it('adds "@" if the username does not start with it', () => {
            expect(ensureAtSymbol('user')).toBe('@user');
        });

        it('does not add "@" if the username already starts with it', () => {
            expect(ensureAtSymbol('@user')).toBe('@user');
        });

        it('returns undefined if the username is undefined', () => {
            expect(ensureAtSymbol(undefined)).toBeUndefined();
        });

        it('returns the username unchanged if it is an empty string', () => {
            expect(ensureAtSymbol('')).toBe('');
        });
    });

    describe('Test return function getTwitterLink', () => {
        it('returns null if author is undefined', () => {
            expect(getTwitterLink(undefined)).toBeNull();
        });

        it('returns null if author is an empty object', () => {
            expect(getTwitterLink({})).toBeNull();
        });

        it('returns undefined if author has no social links', () => {
            const author = { social_links: [] };
            expect(getTwitterLink(author)).toBeUndefined();
        });

        it('returns undefined if there is no Twitter link in social links', () => {
            const author = {
                social_links: [{ site: 'facebook', url: '@facebookAccount' }]
            };
            expect(getTwitterLink(author)).toBeUndefined();
        });

        it('returns the Twitter account if it exists in social links', () => {
            const author = {
                social_links: [
                    { site: 'twitter', url: '@twitterAccount' },
                    { site: 'facebook', url: '@facebookAccount' }
                ]
            };
            expect(getTwitterLink(author)).toBe('@twitterAccount');
        });

        it('handles missing url in a social link gracefully', () => {
            const author = {
                social_links: [
                    { site: 'twitter' },
                    { site: 'facebook', url: '@facebookAccount' }
                ]
            };
            expect(getTwitterLink(author)).toBeUndefined();
        });
    });
});

describe('Case return getData', () => {
    const props = {
        siteProperties: {
            title: 'Noticias en La Nacion',
            description: 'Ultimas noticias de Argentina y el mundo',
            longTitle: 'La Nacion',
            shareConfig: {
                facebook: {
                    appID: '154042854349421'
                }
            }
        },
        globalContent: {
            _id: 'EZYG5OEVH5HSJJCUMJO5XAHTTA',
            canonical_url:
                '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
            headlines: { basic: 'Arroz chaufa de mariscos' },
            promo_items: {
                basic: {
                    type: 'image',
                    url: 'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg',
                    width: 768,
                    height: 512
                },
                receta: {}
            },
            publish_date: '2021-01-08T15:24:00.940Z',
            display_date: '2021-01-08T15:24:00.940Z',
            first_publish_date: '2021-01-08T15:24:00.940Z',
            last_updated_date: '2021-01-08T15:24:00.940Z',
            subheadlines: { basic: '' },
            subtype: '7',
            type: 'story',
            website_url:
                '/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
            credits: {
                by: [{ name: 'Carlos Pagni' }]
            },
            taxonomy: {
                tags: [{ text: 'Odisea Argentina' }],
                primary_section: { name: 'Receta' }
            }
        },
        metaValue: function metaValue(name) {
            return name === 'title' ? 'Arroz chaufa de mariscos' : '';
        },

        contextPath: '/pf',
        deployment: function deployment() {
            return '$LATEST';
        },
        section: 'nota'
    };
    it('Test return function getData', () => {
        expect(getData(props)).toStrictEqual({
            type: 'article',
            title: 'Arroz chaufa de mariscos',
            description: '',
            displayDate: '2021-01-08T15:24:00.940Z',
            image: {
                url: 'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg?width=1200&height=675&quality=85&smart=true',
                width: '1200',
                height: '675',
                alt: '',
                type: ''
            },
            url: 'https://www.lanacion.com.ar/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
            fbAppId: '154042854349421',
            isArticle: true,
            publishDate: '2021-01-08T15:24:00.940Z',
            firstPublishDate: '2021-01-08T15:24:00.940Z',
            lastUpdatedDate: '2021-01-08T15:24:00.940Z',
            tier: 'metered',
            subtype: '7',
            authors: [{ name: 'Carlos Pagni' }],
            primarySection: 'Receta',
            tags: [{ text: 'Odisea Argentina' }],
            twitterAccount: '@LANACION'
        });
    });

    it('Test return function getData section home', () => {
        const properties = {
            ...props,
            globalContent: {
                ...props.globalContent,
                canonical_url: undefined,
                headlines: { basic: 'Ultimas noticias La Nacion' },
                promo_items: {},
                subheadlines: { basic: '' },
                type: 'website'
            },
            metaValue: function metaValue(name) {
                return undefined;
            },
            section: 'home'
        };
        expect(getData(properties)).toStrictEqual({
            type: 'website',
            title: 'La Nacion',
            description: 'Ultimas noticias de Argentina y el mundo',
            image: {
                url: 'undefined$LATEST',
                width: '1200',
                height: '630',
                alt: 'Placeholder de LA NACION',
                type: 'image/png'
            },
            url: 'https://www.lanacion.com.arEZYG5OEVH5HSJJCUMJO5XAHTTA/',
            fbAppId: '154042854349421',
            isArticle: false,
            subtype: '7',
            twitterAccount: '@LANACION'
        });
    });

    it('Test return getData globalContent undefined', () => {
        const props = {
            siteProperties: {
                title: 'Noticias en La Nacion',
                description: 'Ultimas noticias de Argentina y el mundo',
                longTitle: 'La Nacion'
            },

            metaValue: function metaValue(name) {
                return undefined;
            },

            deployment: function deployment() {
                return '$LATEST';
            },
            globalContentConfig: {
                query: {
                    id: '/'
                }
            }
        };

        expect(getData(props)).toStrictEqual({
            description: undefined,
            fbAppId: '',
            image: {
                url: 'undefined$LATEST',
                width: '1200',
                height: '630',
                alt: 'Placeholder de LA NACION',
                type: 'image/png'
            },
            isArticle: false,
            subtype: undefined,
            title: 'Noticias en La Nacion',
            type: 'website',
            url: 'https://www.lanacion.com.ar',
            twitterAccount: '@LANACION'
        });
    });

    it('Test return getData with author containing social_links', () => {
        const propsCopy = {
            ...props
        };

        propsCopy.globalContent.credits = {
            by: [
                {
                    name: 'Carlos Pagni',
                    social_links: [{ site: 'twitter', url: '@CarlosPagni' }]
                }
            ]
        };

        expect(getData(propsCopy)).toStrictEqual({
            type: 'article',
            title: 'Arroz chaufa de mariscos',
            description: '',
            displayDate: '2021-01-08T15:24:00.940Z',
            image: {
                url: 'https://resizer.glanacion.com.ar/resizer/lBMqatupoieyG9OvjZ2Cu91TgVw=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/GDAKALQ7IZBETO6NO4MUEDYBCU.jpg?width=1200&height=675&quality=85&smart=true',
                width: '1200',
                height: '675',
                alt: '',
                type: ''
            },
            url: 'https://www.lanacion.com.ar/recetas/platos-de-comida-principal/arroz-chaufa-de-mariscos-nid29102019-6/',
            fbAppId: '154042854349421',
            isArticle: true,
            publishDate: '2021-01-08T15:24:00.940Z',
            firstPublishDate: '2021-01-08T15:24:00.940Z',
            lastUpdatedDate: '2021-01-08T15:24:00.940Z',
            tier: 'metered',
            subtype: '7',
            authors: [
                {
                    name: 'Carlos Pagni',
                    social_links: [{ site: 'twitter', url: '@CarlosPagni' }]
                }
            ],
            primarySection: 'Receta',
            tags: [{ text: 'Odisea Argentina' }],
            twitterAccount: '@CarlosPagni'
        });
    });
});

describe('Case return getImageProps', () => {
    it('if acuOgImage object exists', () => {
        const acuOgImg = {
            url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/7Y2TB3CA3VAUFPUPWJSKH7HIFI.png',
            height: '800',
            width: '800',
            additional_properties: { mime_type: 'image/png' }
        };
        const section = '/deportes';
        const output = {
            url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/7Y2TB3CA3VAUFPUPWJSKH7HIFI.png',
            height: '800',
            width: '800',
            alt: `Placeholder de ${section.slice(1)} en LA NACION`,
            type: 'image/png'
        };

        expect(getImageProps(acuOgImg, {}, '', section)).toEqual(output);
    });

    it('if acuOgImage object does not exist and promoItemsBasic exists', () => {
        const promoItemsBasic = {
            url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/7Y2TB3CA3VAUFPUPWJSKH7HIFI.png',
            type: 'image',
            height: '800',
            width: '800',
            additional_properties: { mime_type: 'image/png' },
            embed: {},
            caption: 'image description'
        };
        const output = {
            url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/7Y2TB3CA3VAUFPUPWJSKH7HIFI.png?width=1200&height=675&quality=85&smart=true',
            width: '1200',
            height: '675',
            alt: 'image description',
            type: 'image/png'
        };
        expect(getImageProps({}, promoItemsBasic, '', '')).toEqual(output);
    });

    it('if the promoItemsBasic object exists and includes the embed object, it is a JW video and should return the poster', () => {
        const promoItemsBasicWithJwVideo = {
            url: 'https://cdn.jwplayer.com/v2/media/fSuIciiV/poster.jpg?width=720',
            embed: {
                config: {
                    videoJw: {
                        title: 'video title',
                        playlist: []
                    }
                }
            }
        };
        const output = {
            url: 'https://cdn.jwplayer.com/v2/media/fSuIciiV/poster.jpg?width=1280',
            width: '1280',
            height: undefined,
            alt: 'video title',
            type: 'image/jpeg'
        };
        expect(getImageProps({}, promoItemsBasicWithJwVideo, '')).toEqual(
            output
        );
    });

    it('by default, it returns the placeholder', () => {
        const output = {
            url: 'placeholder',
            width: '1200',
            height: '630',
            alt: 'Placeholder de LA NACION',
            type: 'image/png'
        };
        expect(getImageProps({}, {}, 'placeholder')).toEqual(output);
    });
});

describe('Case return buildOgMetas', () => {
    const params = {
        type: 'website',
        arcSite: 'la-nacion-ar',
        pageBuilderTitle: 'Test Title',
        section: 'home',
        siteProperties: { title: 'My Website' },
        data: { description: 'text description' },
        requestUri: '/test-uri',
        metaValue: 'testMetaValue',
        image: {
            url: 'https://example.com/image.jpg',
            type: 'image/jpeg',
            alt: 'Example Image',
            width: '1200',
            height: '630'
        },
        url: 'https://example.com',
        layout: 'default'
    };

    it('should return the OG meta tags correctly', () => {
        const result = buildOgMetas(params);

        expect(result).toEqual([
            { property: 'og:type', content: 'website' },
            {
                property: 'og:title',
                content: setMetaTitle({
                    arcSite: 'la-nacion-ar',
                    pageBuilderTitle: 'Test Title'
                })
            },
            {
                property: 'og:description',
                content: setMetaDescription({
                    data: { description: 'text description' },
                    section: 'home',
                    arcSite: 'la-nacion-ar',
                    requestUri: '/',
                    metaValue: '/'
                })
            },
            { property: 'og:locale', content: 'es_AR' },
            { property: 'og:image', content: 'https://example.com/image.jpg' },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: 'Example Image' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:url', content: 'https://example.com/' },
            { property: 'og:site_name', content: 'My Website' }
        ]);
    });

    it('If any attribute of the image or section object does not exist, it should return the OG meta tags correctly', () => {
        const copyParams = { ...params, image: { ...params.image } };
        copyParams.image.alt = undefined;
        copyParams.image.height = undefined;
        copyParams.section = 'other';

        const result = buildOgMetas(copyParams);

        expect(result).toEqual([
            { property: 'og:type', content: 'website' },
            {
                property: 'og:title',
                content: setMetaTitle({
                    arcSite: 'la-nacion-ar',
                    pageBuilderTitle: 'Test Title',
                    section: 'home',
                    siteProperties: { title: 'My Website' }
                })
            },
            {
                property: 'og:description',
                content: setMetaDescription({
                    data: { description: 'text description' },
                    section: 'home',
                    arcSite: 'la-nacion-ar',
                    requestUri: '/',
                    metaValue: '/'
                })
            },
            { property: 'og:locale', content: 'es_AR' },
            { property: 'og:image', content: 'https://example.com/image.jpg' },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:url', content: 'https://example.com/' }
        ]);
    });

    it('If author or wiki person should build the correct meta tags for those cases', () => {
        const globalContent = {
            isWiki: true,
            firstName: 'Juan',
            lastName: 'Pravata',
            middleName: 'Guillermo',
            node_type: 'author',
            wikiSourceData: {
                schemas_info: {
                    family_name: 'Messi',
                    given_name: 'Lionel',
                    additional_name: ''
                },
                type: 1
            }
        };
        const globalContentConfig = {
            query: {
                slug: 'el-messi-slug',
                _id: 'el-autor-slug'
            }
        };

        expect(
            buildOgMetas({ ...params, globalContent, globalContentConfig })
        ).toEqual([
            { property: 'og:type', content: 'profile' },
            { property: 'og:title', content: 'Test Title' },
            { property: 'og:description', content: 'text description' },
            { property: 'og:locale', content: 'es_AR' },
            { property: 'og:image', content: 'https://example.com/image.jpg' },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: 'Example Image' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:url', content: 'https://example.com/' },
            { property: 'og:site_name', content: 'My Website' },
            { property: 'profile:first_name', content: 'Lionel' },
            { property: 'profile:last_name', content: 'Messi' },
            { property: 'profile:username', content: 'el-messi-slug' }
        ]);

        expect(
            buildOgMetas({
                ...params,
                globalContent: { ...globalContent, isWiki: false },
                globalContentConfig
            })
        ).toEqual([
            { property: 'og:type', content: 'profile' },
            { property: 'og:title', content: 'Test Title' },
            { property: 'og:description', content: 'text description' },
            { property: 'og:locale', content: 'es_AR' },
            { property: 'og:image', content: 'https://example.com/image.jpg' },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: 'Example Image' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:url', content: 'https://example.com/' },
            { property: 'og:site_name', content: 'My Website' },
            { property: 'profile:first_name', content: 'Juan Guillermo' },
            { property: 'profile:last_name', content: 'Pravata' },
            { property: 'profile:username', content: 'el-autor-slug' }
        ]);
    });

    it('If the _id contains an accent, it should be displayed correctly', () => {
        const globalContent = {
            isWiki: true,
            firstName: 'Juan',
            lastName: 'Pravata',
            middleName: 'Guillermo',
            node_type: 'author',
            wikiSourceData: {
                schemas_info: {
                    family_name: 'Díaz',
                    given_name: 'Bruno',
                    additional_name: ''
                },
                type: 1
            }
        };
        const globalContentConfig = {
            query: {
                slug: 'bruno-d%C3%ADaz',
                _id: 'bruno-d%C3%ADaz'
            }
        };

        expect(
            buildOgMetas({ ...params, globalContent, globalContentConfig })
        ).toEqual([
            { property: 'og:type', content: 'profile' },
            { property: 'og:title', content: 'Test Title' },
            { property: 'og:description', content: 'text description' },
            { property: 'og:locale', content: 'es_AR' },
            { property: 'og:image', content: 'https://example.com/image.jpg' },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: 'Example Image' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:url', content: 'https://example.com/' },
            { property: 'og:site_name', content: 'My Website' },
            { property: 'profile:first_name', content: 'Bruno' },
            { property: 'profile:last_name', content: 'Díaz' },
            { property: 'profile:username', content: 'bruno-díaz' }
        ]);

        expect(
            buildOgMetas({
                ...params,
                globalContent: { ...globalContent, isWiki: false },
                globalContentConfig
            })
        ).toEqual([
            { property: 'og:type', content: 'profile' },
            { property: 'og:title', content: 'Test Title' },
            { property: 'og:description', content: 'text description' },
            { property: 'og:locale', content: 'es_AR' },
            { property: 'og:image', content: 'https://example.com/image.jpg' },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: 'Example Image' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { property: 'og:url', content: 'https://example.com/' },
            { property: 'og:site_name', content: 'My Website' },
            { property: 'profile:first_name', content: 'Juan Guillermo' },
            { property: 'profile:last_name', content: 'Pravata' },
            { property: 'profile:username', content: 'bruno-díaz' }
        ]);
    });
});

describe('getDataForProfileType function', () => {
    const globalContentConfig = {
        query: {
            slug: 'el-messi-slug',
            _id: 'el-autor-slug'
        }
    };
    it('Should build the correct values for wiki person', () => {
        expect(
            getDataForProfileType(
                {
                    isWiki: true,
                    node_type: 'acumulado',
                    wikiSourceData: {
                        schemas_info: {
                            family_name: 'Messi',
                            given_name: 'Lionel',
                            additional_name: ''
                        },
                        type: 1
                    }
                },
                globalContentConfig
            )
        ).toEqual({
            profileLastName: 'Messi',
            profileName: 'Lionel',
            profileUsername: 'el-messi-slug'
        });
    });

    it('Should build the correct values for author', () => {
        expect(
            getDataForProfileType(
                {
                    isWiki: false,
                    firstName: 'Juan',
                    lastName: 'Pravata',
                    middleName: 'Guillermo',
                    node_type: 'author'
                },
                globalContentConfig
            )
        ).toEqual({
            profileLastName: 'Pravata',
            profileName: 'Juan Guillermo',
            profileUsername: 'el-autor-slug'
        });
    });

    it('Should build the correct values for author with wikiSourceData and without additional name', () => {
        expect(
            getDataForProfileType(
                {
                    isWiki: true,
                    firstName: 'Juan',
                    lastName: 'Pravata',
                    middleName: 'Guillermo',
                    node_type: 'author',
                    wikiSourceData: {
                        schemas_info: {
                            additional_name: '',
                            family_name: 'Messi',
                            given_name: 'Juan'
                        }
                    }
                },
                globalContentConfig
            )
        ).toEqual({
            profileLastName: 'Messi',
            profileName: 'Juan',
            profileUsername: 'el-messi-slug'
        });
    });

    it('Should build the correct values for author with wikiSourceData correctly', () => {
        expect(
            getDataForProfileType(
                {
                    isWiki: true,
                    firstName: 'Juan',
                    lastName: 'Pravata',
                    middleName: 'Guillermo',
                    node_type: 'author',
                    wikiSourceData: {
                        schemas_info: {
                            additional_name: 'Pedro',
                            family_name: 'Messi',
                            given_name: 'Juan'
                        }
                    }
                },
                globalContentConfig
            )
        ).toEqual({
            profileLastName: 'Messi',
            profileName: 'Juan Pedro',
            profileUsername: 'el-messi-slug'
        });
    });
});

describe('Case return buildArticleMetas', () => {
    const params = {
        firstPublishDate: '2023-01-01T00:00:00Z',
        displayDate: '2023-01-01T12:00:00Z',
        lastUpdatedDate: '2023-01-02T00:00:00Z',
        primarySection: 'News',
        authors: [{ name: 'John Doe' }, { name: 'Jane Doe' }],
        tags: [{ text: 'Tech' }, { text: 'Science' }]
    };

    it('should return an empty array if isArticle is false', () => {
        const result = buildArticleMetas(false, {});
        expect(result).toEqual([]);
    });

    it('should return the OG article meta tags correctly', () => {
        getPublishDate.mockReturnValue('2023-01-01T12:00:00Z');
        getModifiedDate.mockReturnValue('2023-01-02T00:00:00Z');

        const result = buildArticleMetas(true, params);

        expect(result).toEqual([
            {
                property: 'article:published_time',
                content: '2023-01-01T12:00:00Z'
            },
            {
                property: 'article:modified_time',
                content: '2023-01-02T00:00:00Z'
            },
            { property: 'article:section', content: 'News' },
            { property: 'article:author', content: 'John Doe' },
            { property: 'article:author', content: 'Jane Doe' },
            { property: 'article:tag', content: 'Tech' },
            { property: 'article:tag', content: 'Science' }
        ]);
    });

    it('If the article has no defined tags or authors, it should return the OG article meta tags correctly', () => {
        getPublishDate.mockReturnValue('2023-01-01T12:00:00Z');
        getModifiedDate.mockReturnValue('2023-01-02T00:00:00Z');

        const copyParams = { ...params };
        copyParams.authors = [];
        copyParams.tags = [];

        const result = buildArticleMetas(true, copyParams);

        expect(result).toEqual([
            {
                property: 'article:published_time',
                content: '2023-01-01T12:00:00Z'
            },
            {
                property: 'article:modified_time',
                content: '2023-01-02T00:00:00Z'
            },
            { property: 'article:section', content: 'News' }
        ]);
    });
});

describe('Case return buildFbMetas', () => {
    it('should return an array with the correct fb:app_id object', () => {
        const fbAppId = '123456789';
        const result = buildFbMetas(fbAppId);

        expect(result).toEqual([{ property: 'fb:app_id', content: fbAppId }]);
    });
});

describe('Case return buildTwitterMetas', () => {
    it('should return the twitter meta tags correctly', () => {
        const props = {
            image: { url: 'https://example.com/image.jpg' },
            arcSite: 'la-nacion-ar',
            pageBuilderTitle: 'Test Title',
            section: 'home',
            data: { description: 'text description' },
            requestUri: '/test-uri',
            metaValue: 'testMetaValue',
            url: 'https://example.com',
            twitterAccount: '@LANACION'
        };
        const result = buildTwitterMetas(props);

        expect(result).toEqual([
            { name: 'twitter:image', content: 'https://example.com/image.jpg' },
            { name: 'twitter:card', content: 'summary_large_image' },
            {
                name: 'twitter:title',
                content: 'Test Title'
            },
            {
                name: 'twitter:description',
                content: 'text description'
            },
            { name: 'twitter:site', content: '@LANACION' },
            { name: 'twitter:creator', content: '@LANACION' },
            { name: 'twitter:domain', content: 'lanacion.com.ar' },
            { name: 'twitter:url', content: 'https://example.com/' }
        ]);
    });
});
