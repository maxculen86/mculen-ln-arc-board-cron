import React from 'react';
import MasNotas from '../../../../components/features/LN-nota/masNotas';
import { render, screen } from '@testing-library/react';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import taxonomySection from '../../../../__mocks__/data/masNotas/taxonomySection';
import taxonomyTags from '../../../../__mocks__/data/masNotas/taxonomyTags';
import mockArticles from '../../../../__mocks__/data/masNotas/articles';
import '@testing-library/jest-dom';

const mockArticlesFunc = jest.fn();

jest.mock('fusion:static', () => 'mock-static');

jest.mock(
    '../../../../components/private/LN/common/hooks/useGetArticlesFromAcumSource',
    () => () => mockArticlesFunc()
);

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
    const getMasNotasProps = (cantidadNotas, filter, subtype, taxonomy) => ({
        id: '0fqAkhiaPrV',
        customFields: { cantidadNotas, filter },
        globalContent: {
            _id: 'AVYWDWDAVVESZGD7HXMW46GTYA',
            subtype,
            taxonomy
        },
        outputType: 'default',
        arcSite: 'la-nacion-ar'
    });
    it('should show masNotas feature "últimas noticias"', () => {
        mockArticlesFunc.mockReturnValueOnce(mockArticles.content_elements);
        render(
            <MasNotas {...getMasNotasProps(30, '0', '1', taxonomySection)} />
        );
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(7);
    });

    it('should show masNotas feature as "otras noticias de..."', () => {
        mockArticlesFunc.mockReturnValueOnce(mockArticles.content_elements);
        render(<MasNotas {...getMasNotasProps(3, '1', '1', taxonomyTags)} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Otras noticias'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(3);
    });

    it('should show masNotas feature as "Ultimas Recetas ..."', () => {
        mockArticlesFunc.mockReturnValueOnce(mockArticles.content_elements);
        render(<MasNotas {...getMasNotasProps(30, '0', '7', taxonomyTags)} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Recetas'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(7);
    });

    it('should show masNotas feature as "Más recetas de ..."', () => {
        mockArticlesFunc.mockReturnValueOnce(mockArticles.content_elements);
        render(<MasNotas {...getMasNotasProps(6, '1', '7', taxonomyTags)} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Más recetas'
        );
        expect(screen.getAllByRole('article').length).toStrictEqual(6);
    });
    it('should not show same article and not to show articles without media destacada', () => {
        mockArticlesFunc.mockReturnValueOnce(mockArticles.content_elements);
        render(
            <MasNotas {...getMasNotasProps(30, '0', '1', taxonomySection)} />
        );
        const articles = screen.getAllByRole('article');
        articles.forEach(article => {
            expect(article).not.toContain('AVYWDWDAVVESZGD7HXMW46GTYA');
            expect(article).not.toContain('no-media-article-id');
        });
    });
    it('should not render feature', () => {
        mockArticlesFunc.mockReturnValueOnce([]);
        render(
            <MasNotas {...getMasNotasProps(30, '0', '1', taxonomySection)} />
        );
        expect(screen.queryByRole('heading')).toBeNull();
        expect(screen.queryByRole('article')).toBeNull();
    });
});
