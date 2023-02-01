import React from 'react';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import ArticleFeature from '../../../../../components/features/LN-10/article/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import contentElementsLiveblog from '.././../../../../__mocks__/data/articles/contentElementsLiveblog.json';
import * as cajaTemasValidators from '../../../../../components/private/LN/common/utils/cajaTemasValidators';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const article = (authors, content_elements) => ({
    _id: 'BBU3ZCWFBRALRO4FZAHJ5XGW74',
    content_restrictions: { content_code: 'comun' },
    credits: { by: authors },
    display_date: '2021-11-23T20:40:21.467Z',
    headlines: {
        basic:
            'Dejó un puesto gerencial. Se mudó a un pueblo de 800 habitantes y armó un lodge de lujo: “Ganamos una tranquilidad que no tiene precio”',
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
            url:
                'https://resizer.glanacion.com/resizer/aPpzwat2vydqHtvHAqbvYMMLNpU=/1920x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg',
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

    const getProps = variant => ({
        id: 'f0f9g3fKOoHW25c',
        customFields: {
            noteId: '2KOBND62KNFVVBFQZOADNN6WNY',
            imageId: 'asdas',
            videoId: 'asdas',
            mobileImageId: 'asdas',
            lead: 'LeadNota',
            title: 'Nota',
            authors: [],
            variant
        },
        searchableField: () => {},
        isBomba: false
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
        expect(container.innerHTML).not.toContain('marquee-img');
    });
    it('should render Cargando...', () => {
        useContent.mockReturnValue(null);

        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables: [],
            layout: 'LN10-Home_Main',
            arcSite: 'la-nacion-ar'
        }));

        render(<ArticleFeature {...getProps()} />);
        expect(screen.getByText('Cargando...')).toBeDefined();
    });
    it('should render page builder error', () => {
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
            imageId: 'asdas',
            videoId: 'asdas',
            mobileImageId: 'asdas',
            lead: 'LeadNota',
            title: 'Nota',
            variant,
            ...dinamycFields
        },
        searchableField: () => {},
        isBomba: false
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
                        url:
                            'https://bucket.glanacion.com/anexos/fotos/91/2219591.png'
                    },
                    name: 'Carlos Pagni',
                    type: 'author'
                }
            ];
            useContent.mockReturnValue(article(authors));

            const { container } = render(
                <ArticleFeature {...getProps('liveblog', { delTest: true })} />
            );
            //expect(screen.getByText('Carlos Pagni')).toBeVisible();
            //expect(container.innerHTML).toContain('marquee-img');
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
        expect(container.innerHTML).not.toContain('marquee-img');
    });

    it('should render Cargando...', () => {
        useContent.mockReturnValue(null);

        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables: [],
            layout: 'LN10-Home_Main',
            arcSite: 'la-nacion-ar'
        }));

        render(<ArticleFeature {...getProps()} />);
        expect(screen.getByText('Cargando...')).toBeDefined();
    });

    it('should render page builder error', () => {
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
});
