import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import ArticleFeature from '../../../../../components/features/LN-10/article/default';
import { fireEvent, render, screen } from '@testing-library/react';
import contentElementsLiveblog from '.././../../../../__mocks__/data/articles/contentElementsLiveblog.json';
import * as cajaTemasValidators from '../../../../../components/private/LN/common/utils/cajaTemasValidators';
import * as _helper from '../../../../../components/features/LN-10/article/_helper';
import * as _helperWebApi from '../../../../../components/features/LN-10/article/common/_helper-WebApi';
import * as helpers from '../../../../../components/chains/utils/_helpers';
import * as _helperArticle from '../../../../../components/private/LN/common/utils/articuloHelper';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return {
        default: function (Component) {
            return props => <Component {...props} />;
        },
        useComponentContext: jest.fn(() => ({}))
    };
});

jest.spyOn(_helperWebApi, 'getChainConfig').mockReturnValue({
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
});

jest.mock('../../../../../components/chains/utils/_helpers', () => ({
    ...jest.requireActual('../../../../../components/chains/utils/_helpers'),
    checkVariants: jest.fn()
}));

jest.mock('../../../../../components/features/LN-10/article/_helper', () => ({
    ...jest.requireActual(
        '../../../../../components/features/LN-10/article/_helper'
    ),
    getMediaData: jest.fn()
}));

const article = (authors, content_elements) => ({
    _id: 'BBU3ZCWFBRALRO4FZAHJ5XGW74',
    content_restrictions: { content_code: 'comun' },
    credits: { by: authors },
    display_date: '2021-11-23T20:40:21.467Z',
    headlines: {
        basic: 'Dejó un puesto gerencial. Se mudó a un pueblo de 800 habitantes y armó un lodge de lujo: “Ganamos una tranquilidad que no tiene precio”',
        mobile: ''
    },
    label: {
        recomendar: { text: 'Si' },
        volanta: { display: true, text: 'Esto es volanta.' }
    },
    promo_items: {
        basic: {
            height: 1333,
            resized_urls: [],
            type: 'image',
            url: 'https://resizer.glanacion.com/resizer/aPpzwat2vydqHtvHAqbvYMMLNpU=/1920x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg',
            width: 2000
        }
    },
    publish_date: '2023-01-23T14:18:54.470Z',
    related_content: { basic: [] },
    subheadlines: { basic: 'Esto es un subhead ' },
    subtype: '4',
    taxonomy: {
        primary_section: {
            _id: '/lifestyle',
            additional_properties: [],
            name: 'Lifestyle',
            path: '/lifestyle'
        },
        tags: []
    },
    content_elements,
    website_url:
        '/lifestyle/dejo-un-puesto-gerencial-se-mudo-a-un-pueblo-de-800-habitantes-y-armo-un-lodge-de-lujo-ganamos-una-nid23112021/'
});

describe('Components - features - LN-10 - articulo - default', () => {
    jest.spyOn(cajaTemasValidators, 'validateArticleFeature').mockReturnValue(
        false
    );

    Context.useAppContext = jest.fn(() => ({
        isAdmin: false,
        renderables: [],
        layout: 'LN10-Home_Main',
        arcSite: 'la-nacion-ar'
    }));

    const getProps = (variant, dinamycFields) => ({
        id: 'f0f9g3fKOoHW25c',
        customFields: {
            noteId: '2KOBND62KNFVVBFQZOADNN6WNY',
            imageId: '',
            video: '',
            html: '',
            cllBoard: '',
            mobileImageId: '',
            lead: 'LeadNota',
            title: 'Nota',
            variant,
            chapitaStyle: _helperWebApi.typeBadge[2],
            ...dinamycFields
        },
        searchableField: () => {},
        isBomba: false
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Tests variant Liveblog', () => {
        const casesWithOutSubhead = [
            ['Must not have a subhead.', { ...getProps('liveblog') }],
            [
                'hould not return a subhead even if it is set by custom field.',
                {
                    ...getProps('liveblog', {
                        description: 'Subhead personalizado'
                    })
                }
            ]
        ];

        test.each(casesWithOutSubhead)('%s', (message, props) => {
            useContent.mockReturnValue(article());
            const { container } = render(<ArticleFeature {...props} />);
            expect(container.querySelector('.subhead')).toBeNull();
        });

        test('must always return the badget ', () => {
            render(<ArticleFeature {...getProps('liveblog')} />);
            expect(screen.getByText('vivo')).toBeVisible();
        });

        test('Should return the text of the badget that is configured in the custom field "chapita" ', () => {
            const chapita = 'Chapita personalizada';

            render(<ArticleFeature {...getProps('liveblog', { chapita })} />);
            expect(screen.getByText(chapita)).toBeVisible();
        });

        test('Should show the author(s) whenever you have', () => {
            const authors = [
                {
                    image: {
                        resized_urls: [
                            {
                                option: {
                                    height: 80,
                                    media: '(min-width: 320px)',
                                    width: 80
                                },
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/ZnZOQF59aM1zxza6X79jrDuFP5g=/80x0/filters:format(webp):quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
                            }
                        ],
                        url: 'https://bucket.glanacion.com/anexos/fotos/91/2219591.png'
                    },
                    name: 'Carlos Pagni',
                    type: 'author'
                }
            ];
            useContent.mockReturnValue(article(authors));

            Context.useAppContext = jest.fn(() => ({
                isAdmin: false,
                renderables: [],
                layout: 'LN10-Home_Main',
                arcSite: 'la-nacion-ar'
            }));

            const { container } = render(
                <ArticleFeature {...getProps('liveblog', { delTest: true })} />
            );
            expect(screen.getByText('Carlos Pagni')).toBeVisible();
            expect(container.innerHTML).toMatch('marquee-img');
        });

        test('It should return the titles of the note powerups instead of the subhead.', () => {
            useContent.mockReturnValue(article([], contentElementsLiveblog));

            const resultTitle1 = 'El blue, volátil';
            const resultTitle2 = 'Bancos vuelven a operar';
            const resultTitle3 = 'Los títulos soberanos se hunden';
            const resultTime1 = '14:15';
            const resultTime2 = '13:04';
            const resultTime3 = '12:41';

            render(<ArticleFeature {...getProps('liveblog')} />);

            expect(screen.getByText(resultTime1)).toBeVisible();
            expect(screen.getByText(resultTime2)).toBeVisible();
            expect(screen.getByText(resultTime3)).toBeVisible();
            expect(
                screen.getByRole('heading', { name: resultTitle1 })
            ).toBeVisible();
            expect(
                screen.getByRole('heading', { name: resultTitle2 })
            ).toBeVisible();
            expect(
                screen.getByRole('heading', { name: resultTitle3 })
            ).toBeVisible();
            expect(screen.getAllByRole('listitem')).toHaveLength(3);
        });
    });

    it('should test card autor variant', () => {
        useContent.mockReturnValue(article());
        const { container } = render(
            <ArticleFeature {...getProps('author')} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should test card autor to be regular and not show marquee img with more than 2 authors', () => {
        useContent.mockReturnValue(article(['Leuco', 'Leuco JR']));
        const { container } = render(
            <ArticleFeature {...getProps('author')} />
        );
        expect(screen.getByRole('article')).not.toHaveClass('--author');
        expect(container.innerHTML).not.toMatch('marquee-img');
    });

    it('should render page builder error', () => {
        useContent.mockReturnValue(null);

        jest.spyOn(
            cajaTemasValidators,
            'validateArticleFeature'
        ).mockReturnValue({
            message: 'El ID de la nota es incorrecto.'
        });

        Context.useAppContext = jest.fn(() => ({
            isAdmin: true,
            renderables: [],
            layout: 'LN10-Home_Main',
            arcSite: 'la-nacion-ar'
        }));

        render(<ArticleFeature {...getProps()} />);

        expect(
            screen.getByText('El ID de la nota es incorrecto.')
        ).toBeDefined();
    });

    it('should initialize config with an empty object when config is undefined', () => {
        jest.spyOn(_helperWebApi, 'getChainConfig').mockReturnValue({
            index: 0,
            boxPosition: '01',
            layout: 'bn-opening-4',
            config: undefined
        });

        useContent.mockReturnValue(article());

        render(<ArticleFeature {...getProps('author')} />);

        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('should set source to null when checkForId(videoId) is false', () => {
        jest.spyOn(_helperWebApi, 'checkForId').mockReturnValue(false);

        useContent.mockReturnValue(article());

        const props = getProps('author');
        props.customFields.videoId = 'testId';
        render(<ArticleFeature {...props} />);

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: null
            })
        );
    });

    it('should call registerSuccessEvent when hasVariants is true', () => {
        helpers.checkVariants.mockReturnValue(true);

        const registerSuccessEventMock = jest.fn();
        Context.useComponentContext.mockReturnValue({
            registerSuccessEvent: registerSuccessEventMock
        });

        useContent.mockReturnValue(article());

        const props = getProps('author');
        render(<ArticleFeature {...props} />);

        const cardElement = screen.getByRole('link');
        expect(cardElement).toBeInTheDocument();

        fireEvent.click(cardElement);
        expect(registerSuccessEventMock).toHaveBeenCalled();
    });

    it('should not call registerSuccessEvent when hasVariants is false', () => {
        helpers.checkVariants.mockReturnValue(false);

        const registerSuccessEventMock = jest.fn();
        Context.useComponentContext.mockReturnValue({
            registerSuccessEvent: registerSuccessEventMock
        });

        useContent.mockReturnValue(article());

        const props = getProps('author');
        render(<ArticleFeature {...props} />);

        const cardElement = screen.getByRole('link');
        expect(cardElement).toBeInTheDocument();

        fireEvent.click(cardElement);
        expect(registerSuccessEventMock).not.toHaveBeenCalled();
    });

    it('should make request for image if no HTML and no videoId', () => {
        const props = getProps('author');
        props.customFields.html = '';
        props.customFields.videoId = '';
        props.customFields.imageId = 'testimage';

        const getImageSpy = jest.spyOn(_helperArticle, 'getImage');

        render(<ArticleFeature {...props} />);

        expect(getImageSpy).toHaveBeenCalledTimes(1);

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'relatedImageSource'
            })
        );
    });

    it('should make request for video if videoId exists and HTML is empty', () => {
        jest.spyOn(_helperWebApi, 'checkForId').mockReturnValue(true);

        useContent.mockReturnValue(article());

        const props = getProps('author');
        props.customFields.videoId = 'testId';
        props.customFields.html = '';
        render(<ArticleFeature {...props} />);

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'videosJwSource'
            })
        );
    });

    it('should not make requests for video or image if HTML exists', () => {
        useContent.mockReturnValue(article());

        const props = getProps('author');
        props.customFields.html =
            '<div style="position:relative;overflow:hidden;padding-bottom:56.25%"><iframe src="https://cdn.jwplayer.com/players/3GCCLgtb-bWFcPBAT.html" width="100%" height="100%" frameborder="0" scrolling="auto" title="Coloradans V. Texans  The Great Tomato War Continues" style="position:absolute;" allowfullscreen></iframe></div>';
        props.customFields.videoId = '223';
        props.customFields.imageId = '';

        render(<ArticleFeature {...props} />);

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: null
            })
        );
    });

    it('should make request for video and not image if videoId exists and HTML is empty', () => {
        useContent.mockReturnValue(article());
        jest.spyOn(_helperWebApi, 'checkForId').mockReturnValue(true);

        const getImageSpy = jest.spyOn(_helperArticle, 'getImage');

        const props = getProps('author');

        render(<ArticleFeature {...props} />);
        props.customFields.videoId = '82738923';
        props.customFields.imageId = 'testImageId';
        props.customFields.html = '';

        const result = _helper.getImageIdValidations(
            props.customFields.html,
            props.customFields.videoId,
            props.customFields.imageId
        );
        expect(result).toBeNull();

        expect(getImageSpy).toHaveBeenCalled();

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'videosJwSource'
            })
        );
    });

    it('should not make requests for image or video if only HTML exists', () => {
        const props = getProps('author');
        props.customFields.html =
            '<div style="position:relative;overflow:hidden;padding-bottom:56.25%"><iframe src="https://cdn.jwplayer.com/players/3GCCLgtb-bWFcPBAT.html" width="100%" height="100%" frameborder="0" scrolling="auto" title="Coloradans V. Texans  The Great Tomato War Continues" style="position:absolute;" allowfullscreen></iframe></div>';
        props.customFields.videoId = '';
        props.customFields.imageId = '';

        render(<ArticleFeature {...props} />);

        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: null
            })
        );
    });

    it('Should show the live badge when the subtype is liveblog editorial.', () => {
        useContent.mockReturnValue({ ...article(), subtype: '11' });
        render(<ArticleFeature {...getProps()} />);

        expect(screen.getByText('vivo')).toBeVisible();
    });

    describe('getImageIdValidations', () => {
        test('should return imageIdParam when isHtmlParam is false, isVideoParam is false, and imageIdParam is not an empty string', () => {
            const result = _helper.getImageIdValidations(
                false,
                false,
                'image123'
            );
            expect(result).toBe('image123');
        });

        test('should return null when imageIdParam is empty string and both isHtmlParam and isVideoParam are false', () => {
            const result = _helper.getImageIdValidations(false, false, '');
            expect(result).toBeNull();
        });

        it('should return null when either isHtmlParam or isVideoParam is true, regardless of imageIdParam value', () => {
            const result = _helper.getImageIdValidations(
                true,
                true,
                'image456'
            );
            expect(result).toBeNull();
        });

        test('should return null when imageIdParam is empty string and either isHtmlParam or isVideoParam is true', () => {
            const result = _helper.getImageIdValidations(true, false, '');
            expect(result).toBeNull();
        });

        test('should return null when imageIdParam is empty string and isHtmlParam and isVideoParam are both true', () => {
            const result = _helper.getImageIdValidations(true, true, '');
            expect(result).toBeNull();
        });

        test('should return null when imageIdParam is null', () => {
            const result = _helper.getImageIdValidations(false, false, null);
            expect(result).toBeNull();
        });

        it('should render video player when videoId is set', () => {
            useContent.mockReturnValue(article());
            _helper.getMediaData.mockReturnValue({
                type: 'video',
                dataSrc:
                    'https://cdn.jwplayer.com/videos/62BbXEwp-kTExGaWf.mp4',
                poster: 'https://cdn.jwplayer.com/v2/media/62BbXEwp/poster.jpg?width=320'
            });

            const props = getProps('regular');
            props.customFields.video = 'testId';

            render(<ArticleFeature {...props} />);
            expect(document.querySelector('video')).toBeInTheDocument();
        });

        it('should render iframe when HTML is set', () => {
            const src = 'https://youtube.com/watch';
            _helper.getMediaData.mockReturnValue({
                type: 'embedCode',
                embedCode: `<iframe src=${src}> </iframe>`,
                dataSrc: src
            });

            useContent.mockReturnValue(article());

            const props = getProps('regular');
            props.customFields.html = `<iframe src=${src}> </iframe>`;
            render(<ArticleFeature {...props} />);

            const iframe = document.querySelector('iframe');
            expect(iframe).toBeInTheDocument();
            expect(iframe).toHaveAttribute('src', src);
        });

        it('should render data-testid attribute when HTML is set and vivoComercial is true', () => {
            const src = 'https://youtube.com/watch';
            const dataTestID = 'vivoYoutube-container-article-disabled';
            _helper.getMediaData.mockReturnValue({
                type: 'embedCode',
                embedCode: `<iframe src=${src}> </iframe>`,
                dataSrc: src
            });

            useContent.mockReturnValue(article());

            const props = getProps('regular');
            props.customFields.html = `<iframe src=${src}> </iframe>`;
            props.customFields.videoComercial = true;
            render(<ArticleFeature {...props} />);
            const articleNode = document.querySelector('article');
            expect(articleNode).toHaveAttribute('data-testid', dataTestID);
        });

        it('should render iframe and image when cllBoard is set', () => {
            const input =
                'https://canchallena.lanacion.com.ar/futbol/europa-league-2024-2025/az-alkmaar-galatasaray-ecmmhg21x9ueq1nrpghsvshec/';
            _helper.getMediaData.mockReturnValue({
                embedCode: `<iframe src=${input}> </iframe>`
            });

            const output =
                'https://widget-canchallena.clanacion.com.ar/futbol/europa-league-2024-2025/az-alkmaar-galatasaray-ecmmhg21x9ueq1nrpghsvshec/widget/?isHome=true';

            useContent.mockReturnValue(article());

            const props = getProps('regular');
            props.customFields.cllBoard = input;
            render(<ArticleFeature {...props} />);

            const img = document.querySelector('img');
            expect(img).toBeInTheDocument();
            const iframe = document.querySelector('iframe');
            expect(iframe).toBeInTheDocument();
            expect(iframe).toHaveAttribute('src', output);
        });
    });
});
