import React from 'react';
import MasNotas from '../../../../components/features/LN-nota/masNotas';
import { render, screen } from '@testing-library/react';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import taxonomySection from '../../../../__mocks__/data/masNotas/taxonomySection';
import taxonomyTags from '../../../../__mocks__/data/masNotas/taxonomyTags';
import mockArticles from '../../../../__mocks__/data/masNotas/articles';
import '@testing-library/jest-dom';

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

useContent.mockImplementation(() => {
    return { content_elements: mockArticles.content_elements };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

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

describe('masNotas feature Test', () => {
    Object.defineProperty(window, 'performance', {
        value: {
            getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigate' }]),
            measure: jest.fn()
        }
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

    it('aperturaHome - fetches from homeOpeningArticlesSource and renders "Últimas Noticias"', () => {
        useContent.mockClear();
        const props = getMasNotasProps(6, 'aperturaHome', '1', taxonomySection);
        render(<MasNotas {...props} />);

        const calls = useContent.mock.calls;
        const aperturaCall = calls.find(
            ([opts]) => opts && opts.source === 'homeOpeningArticlesSource'
        );
        expect(aperturaCall).toBeDefined();
        expect(aperturaCall[0]).toMatchObject({
            source: 'homeOpeningArticlesSource',
            query: {},
            staticMode: false
        });
        expect(aperturaCall[0].filter).toBeUndefined();

        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(6);
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
