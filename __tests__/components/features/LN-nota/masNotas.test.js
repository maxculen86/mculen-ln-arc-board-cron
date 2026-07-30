import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import MasNotas from '../../../../components/features/LN-nota/masNotas';
import taxonomySection from '../../../../__mocks__/data/masNotas/taxonomySection';
import taxonomyTags from '../../../../__mocks__/data/masNotas/taxonomyTags';
import mockArticles from '../../../../__mocks__/data/masNotas/articles';

jest.mock(
    'fusion:prop-types',
    () => {
        const taggable = validator => {
            const fn = validator || (() => null);
            fn.tag = () => fn;
            fn.isRequired = fn;
            return fn;
        };
        const factory = () => taggable(() => null);
        return {
            string: taggable(() => null),
            number: taggable(() => null),
            boolean: taggable(() => null),
            list: taggable(() => null),
            label: taggable(() => null),
            shape: factory,
            oneOf: factory,
            arrayOf: factory
        };
    },
    { virtual: true }
);

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

jest.mock(
    'fusion:consumer',
    Component => {
        return function (Component) {
            return props => <Component {...props} />;
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:context',
    Component => {
        return function (Component) {
            return props => <Component {...props} />;
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:content',
    () => ({
        useContent: jest.fn()
    }),
    { virtual: true }
);

jest.mock(
    'fusion:properties',
    () => () => ({
        getProperties: () => []
    }),
    { virtual: true }
);

jest.mock(
    '../../../../components/private/LN/common/cajaTema',
    () =>
        ({ title = '', articles = [] }) => (
            <section>
                <h2 dangerouslySetInnerHTML={{ __html: title }} />
                {articles.map(({ _id, headlines = {} }) => (
                    <article key={_id} data-id={_id}>
                        <h3>{headlines.basic}</h3>
                    </article>
                ))}
            </section>
        )
);

Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

const observe = jest.fn();
const unobserve = jest.fn();
const takeRecords = jest.fn(() => {});

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    takeRecords
}));

const buildArcArticle = ({
    id = 'OLD',
    title = 'Nota vieja de Colapinto'
} = {}) => ({
    _id: id,
    headlines: { basic: title, mobile: title },
    display_date: '2026-06-20T10:00:00.000Z',
    website_url: `/nota/${id}/`,
    promo_items: {
        basic: {
            type: 'image',
            url: `https://www.lanacion.com.ar/resizer/v2/${id}.jpg`
        }
    }
});

const buildHomeJsonArticle = ({
    id = 'HOME',
    title = 'Nota fresca de apertura home',
    fecha = '2026-07-06T19:00:00.000Z'
} = {}) => ({
    id,
    titulo: title,
    volanta: 'Volanta',
    url: `/nota/${id}/`,
    fechaPublicacion: fecha,
    categoria: { slug: '/politica', valor: 'Política' },
    imagen: {
        id: `IMG_${id}`,
        absoluteUrl: `https://www.lanacion.com.ar/resizer/v2/${id}.jpg?auth=TOKEN&width=768&quality=70&smart=false`
    }
});

describe('masNotas feature Test', () => {
    Object.defineProperty(window, 'performance', {
        value: {
            getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigate' }]),
            measure: jest.fn()
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
        useContent.mockImplementation(() => ({
            content_elements: mockArticles.content_elements
        }));
        delete global.fetch;
    });

    const getMasNotasProps = (
        cantidadNotas,
        filter,
        subtype,
        taxonomy,
        sectionOrTag
    ) => ({
        id: '0fqAkhiaPrV',
        customFields: { cantidadNotas, filter, sectionOrTag },
        globalContent: {
            _id: 'AVYWDWDAVVESZGD7HXMW46GTYA',
            subtype,
            taxonomy
        },
        outputType: 'default',
        arcSite: 'la-nacion-ar'
    });

    it('should show masNotas feature "últimas noticias"', () => {
        const props = getMasNotasProps(30, 'byLastNews', '1', taxonomySection);
        render(<MasNotas {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(7);
    });

    it('should show masNotas feature as "otras noticias de..."', () => {
        const props = getMasNotasProps(3, 'byTags', '1', taxonomyTags);
        render(<MasNotas {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Otras noticias'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(3);
    });

    it('should show masNotas feature as "Ultimas Recetas ..."', () => {
        const props = getMasNotasProps(30, 'byLastNews', '7', taxonomyTags);
        render(<MasNotas {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Recetas'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(7);
    });

    it('should show masNotas feature as "Más recetas de ..."', () => {
        const props = getMasNotasProps(6, 'byTags', '7', taxonomyTags);
        render(<MasNotas {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Más recetas'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(6);
    });

    it('should not show same article and not to show articles without media destacada', () => {
        const props = getMasNotasProps(30, 'byLastNews', '1', taxonomySection);
        render(<MasNotas {...props} />);
        const articles = screen.getAllByRole('article');
        articles.forEach(article => {
            expect(article).not.toHaveAttribute(
                'data-id',
                'AVYWDWDAVVESZGD7HXMW46GTYA'
            );
            expect(article).not.toHaveAttribute(
                'data-id',
                'no-media-article-id'
            );
        });
    });

    it('Searc by tag - Should show masNotas feature as "otras noticias de [the tag]"', () => {
        const props = getMasNotasProps(
            6,
            'bySectionOrTag',
            '1',
            taxonomySection,
            'alberto-fernandez-tid849'
        );
        render(<MasNotas {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Otras noticias'
        );
        expect(screen.getAllByRole('link').shift()).toHaveTextContent(
            'Alberto Fernández'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(6);
    });

    it('Searc by section - Should show masNotas feature as "otras noticias de [the section]"', () => {
        const props = getMasNotasProps(
            4,
            'bySectionOrTag',
            '1',
            taxonomySection,
            '/el-mundo'
        );
        render(<MasNotas {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas notas de El mundo'
        );
        expect(screen.getAllByRole('link').shift()).toHaveTextContent(
            'El mundo'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(4);
    });

    it('aperturaHome - fetches from home json on the client and ignores cached useContent data', async () => {
        const staleTitle = 'Nota vieja de Colapinto';
        const freshTitle = 'Nota fresca de apertura home';
        useContent.mockReturnValue({
            content_elements: [
                buildArcArticle({ id: 'STALE', title: staleTitle })
            ]
        });
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                items: [
                    {
                        tipoSeccion: 'apertura',
                        notas: [
                            buildHomeJsonArticle({
                                id: 'FRESH',
                                title: freshTitle
                            })
                        ]
                    },
                    {
                        tipoSeccion: 'tema',
                        notas: [
                            buildHomeJsonArticle({
                                id: 'STALE_TOPIC',
                                title: staleTitle
                            })
                        ]
                    }
                ]
            })
        });
        const props = getMasNotasProps(3, 'aperturaHome', '1', taxonomySection);
        render(<MasNotas {...props} />);

        await waitFor(() => {
            expect(screen.getByText(freshTitle)).toBeInTheDocument();
        });
        expect(screen.queryByText(staleTitle)).not.toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining(
                '/?_website=la-nacion-ar&outputType=opening'
            ),
            expect.objectContaining({ cache: 'no-store' })
        );
        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({ source: null })
        );

        const cachedSourceCall = useContent.mock.calls.find(
            ([opts]) => opts && opts.source === 'homeOpeningArticlesSource'
        );
        expect(cachedSourceCall).toBeUndefined();
    });

    describe('should not render feature: data is undefined', () => {
        const cases = [
            [
                'should not render feature because primary_section is undefined',
                {
                    ...getMasNotasProps(30, 'byLastNews', '1', {
                        ...taxonomySection,
                        primary_section: undefined
                    })
                }
            ],
            [
                'should not render feature because primary_section is empty object',
                {
                    ...getMasNotasProps(30, 'byLastNews', '1', {
                        ...taxonomySection,
                        primary_section: {}
                    })
                }
            ],
            [
                'should not render feature because globalContent is empty object',
                {
                    ...getMasNotasProps(30, 'byLastNews', '1', {
                        ...taxonomySection
                    }),
                    globalContent: {}
                }
            ],
            [
                'should not render feature because globalContent is undefined',
                {
                    ...getMasNotasProps(30, 'byLastNews', '1', {
                        ...taxonomySection
                    }),
                    globalContent: undefined
                }
            ],
            [
                'should not render feature because taxonomy is empty object',
                {
                    ...getMasNotasProps(30, 'byLastNews', '1', {})
                }
            ],
            [
                'should not render feature because taxonomy is undefined',
                {
                    ...getMasNotasProps(30, 'byLastNews', '1', undefined)
                }
            ]
        ];
        test.each(cases)('%s', (message, prop) => {
            render(<MasNotas {...prop} />);
            expect(screen.queryByRole('heading')).toBeNull();
            expect(screen.queryByRole('article')).toBeNull();
        });
    });
});
