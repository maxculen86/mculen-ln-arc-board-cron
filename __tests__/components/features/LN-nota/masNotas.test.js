import React from 'react';
import MasNotas from '../../../../components/features/LN-nota/masNotas';
import { render, screen } from '@testing-library/react';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import taxonomySection from '../../../../__mocks__/data/masNotas/taxonomySection';
import taxonomyTags from '../../../../__mocks__/data/masNotas/taxonomyTags';
import mockArticles from '../../../../__mocks__/data/masNotas/articles';
import useGetArticlesFromAcumSource from '../../../../components/private/LN/common/hooks/useGetArticlesFromAcumSource';
import '@testing-library/jest-dom';

jest.mock('fusion:static', () => 'mock-static');

jest.mock(
    '../../../../components/private/LN/common/hooks/useGetArticlesFromAcumSource',
    () => jest.fn()
);

useGetArticlesFromAcumSource.mockImplementation(
    () => mockArticles.content_elements
);

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

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

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

describe('masNotas feature Test', () => {
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
        render(
            <MasNotas
                {...getMasNotasProps(30, 'byLastNews', '1', taxonomySection)}
            />
        );
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(7);
    });

    it('should show masNotas feature as "otras noticias de..."', () => {
        render(
            <MasNotas {...getMasNotasProps(3, 'byTags', '1', taxonomyTags)} />
        );
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Otras noticias'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(3);
    });

    it('should show masNotas feature as "Ultimas Recetas ..."', () => {
        render(
            <MasNotas
                {...getMasNotasProps(30, 'byLastNews', '7', taxonomyTags)}
            />
        );
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Recetas'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(7);
    });

    it('should show masNotas feature as "Más recetas de ..."', () => {
        render(
            <MasNotas {...getMasNotasProps(6, 'byTags', '7', taxonomyTags)} />
        );
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Más recetas'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(6);
    });

    it('should not show same article and not to show articles without media destacada', () => {
        render(
            <MasNotas
                {...getMasNotasProps(30, 'byLastNews', '1', taxonomySection)}
            />
        );
        const articles = screen.getAllByRole('article');
        articles.forEach(article => {
            expect(article).not.toContain('AVYWDWDAVVESZGD7HXMW46GTYA');
            expect(article).not.toContain('no-media-article-id');
        });
    });

    it('Searc by tag - Should show masNotas feature as "otras noticias de [the tag]', () => {
        render(
            <MasNotas
                {...getMasNotasProps(
                    6,
                    'bySectionOrTag',
                    '1',
                    taxonomySection,
                    'alberto-fernandez-tid849'
                )}
            />
        );

        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Otras noticias'
        );

        expect(screen.getAllByRole('link').shift()).toHaveTextContent(
            'Alberto Fernández'
        );

        expect(screen.getAllByRole('article').length).toStrictEqual(6);
    });

    it('Searc by section - Should show masNotas feature as "otras noticias de [the section]', () => {
        render(
            <MasNotas
                {...getMasNotasProps(
                    4,
                    'bySectionOrTag',
                    '1',
                    taxonomySection,
                    '/el-mundo'
                )}
            />
        );

        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas notas de El mundo'
        );

        expect(screen.getAllByRole('link').shift()).toHaveTextContent(
            'El mundo'
        );

        expect(screen.getAllByRole('article').length).toStrictEqual(4);
    });

    it('should not render feature', () => {
        useGetArticlesFromAcumSource.mockImplementation(() => [undefined]);
        render(
            <MasNotas
                {...getMasNotasProps(30, 'byLastNews', '1', taxonomySection)}
            />
        );
        expect(screen.queryByRole('heading')).toBeNull();
        expect(screen.queryByRole('article')).toBeNull();
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
