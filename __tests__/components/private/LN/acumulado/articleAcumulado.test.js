import React from 'react';
import { render } from '@testing-library/react';
import getTitleText from '../../../../../components/private/common/utils/getTitleText';
import getBajadaOrFirstTextParagraph from '../../../../../components/private/common/utils/getBajadaOrFirstTextParagraph';
import article from '../../../../../__mocks__/data/articles/articleAcum.json';
import ArticleAcum from '../../../../../components/private/LN/acumulado/articleAcum';
import ComHour from '../../../../../components/private/common/com-hour';
import getAuthorsAsString from '../../../../../components/private/common/utils/getAuthorsAsString';

jest.mock(
    '../../../../../components/private/common/mod-article.jsx',
    () => 'mod-article-mock'
);

describe('Private - LN - Acumulado - ArticleAcum', () => {
    const props = {
        dataSection: 'CuerpoAcu',
        article: article,
        typeArticle: 'Grilla',
        withSubhead: false,
        sectionName: 'test-section'
    };

    it('Props validation for Grid type to ModArticle', () => {
        const { container } = render(<ArticleAcum {...props} />);
        const modArticleMock = container.querySelector('mod-article-mock');

        expect(modArticleMock.getAttribute('withMedia')).toBe('true');
        expect(modArticleMock.getAttribute('subheadText')).toBe('false');
        expect(modArticleMock.getAttribute('titleText')).toEqual(
            'Titulo Movil Corto'
        );
        expect(modArticleMock.getAttribute('authors')).toEqual(
            'Por Mirta Albamonte'
        );
    });

    it('Props validation for List type to ModArticle', () => {
        const { container } = render(
            <ArticleAcum {...props} typeArticle="Listado" withSubhead={true} />
        );
        const modArticleMock = container.querySelector('mod-article-mock');

        expect(modArticleMock.getAttribute('withMedia')).toBe('false');
        expect(modArticleMock.getAttribute('hour')).toBe('false');
        expect(modArticleMock.getAttribute('subheadText')).toBe(
            'Este es el subtitulo'
        );
    });

    it('Props validation for Timeline type to ModArticle', () => {
        const { container } = render(
            <ArticleAcum {...props} typeArticle="Timeline" />
        );
        const modArticleMock = container.querySelector('mod-article-mock');

        expect(modArticleMock.getAttribute('subheadText')).toBe('false');
        expect(modArticleMock.getAttribute('dateText')).toBe('false');
        expect(modArticleMock.getAttribute('hour')).toBeTruthy();
    });

    it('Validar que la hora en ComHour se muestre bien', () => {
        const { container } = render(
            <ComHour display_date="2020-06-02T15:28:04.694Z" />
        );
        expect(container.firstChild.textContent).toBe('12:28');
    });

    it('Test de snapshot ArticleAcum', () => {
        const { container } = render(<ArticleAcum {...props} />);
        expect(container).toMatchSnapshot();
    });
});

describe('Private - Common - getBajadaOrFirstTextParagraph', () => {
    it('Mostrar subtitulo (subheadlines)', () => {
        expect(getBajadaOrFirstTextParagraph(article)).toEqual(
            'Este es el subtitulo'
        );
    });

    it('Mostrar primer parrafo de texto', () => {
        const articleCopy = { ...article };
        articleCopy.subheadlines = {};
        expect(getBajadaOrFirstTextParagraph(articleCopy)).toEqual(
            'Este es el primer parrafo de prueba para ver si en la vision tipo listado se muestra en caso que no este la bajada. Pero hay que tener en cuenta que se debe co...'
        );
    });

    it('No mostrar nada', () => {
        const articleCopy2 = { ...article };
        articleCopy2.subheadlines = {};
        articleCopy2.content_elements = [];
        expect(getBajadaOrFirstTextParagraph(articleCopy2)).toEqual('');
    });
});

describe('Private - Common - GetTitleText', () => {
    it('Mostrar titulo corto', () => {
        const { headlines, label } = article;
        expect(getTitleText(headlines, label)).toEqual(
            'Volanta Titulo Movil Corto'
        );
    });

    it('Mostrar titulo largo', () => {
        const headlines2 = { ...article.headlines };
        headlines2.mobile = null;
        expect(getTitleText(headlines2, article.label)).toEqual(
            'Volanta Test dl (titulo basico largo)'
        );
    });
});

// TODO: Mover este tests a un archivo nuevo especifico para el utilitario getAuthorAsString
describe('Private - Common - GetAuthorAsString', () => {
    it('Mostrar author en string', () => {
        expect(getAuthorsAsString(article)).toEqual('Por Mirta Albamonte');
    });

    it('Mostrar varios authores separados con , e y al final', () => {
        const article2 = {
            ...article,
            credits: {
                by: [
                    {
                        name: 'Mirta Albamonte',
                        type: 'author'
                    },
                    {
                        name: 'Mariano Grondona',
                        type: 'author'
                    },
                    {
                        name: 'Alberto Fernandez',
                        type: 'author'
                    }
                ]
            }
        };
        expect(getAuthorsAsString(article2)).toEqual(
            'Por Mirta Albamonte, Mariano Grondona y Alberto Fernandez'
        );
    });

    it('Mostrar author que es del tipo author', () => {
        const article3 = {
            ...article,
            credits: {
                by: [
                    {
                        name: 'Mirta Albamonte',
                        type: 'another'
                    },
                    {
                        name: 'Mariano Grondona',
                        type: 'author'
                    }
                ]
            }
        };
        expect(getAuthorsAsString(article3)).toEqual('Por Mariano Grondona');
    });

    it('should return a empty string when the author name is a blank space', () => {
        const articleData = {
            ...article,
            credits: {
                by: [
                    {
                        name: ' ',
                        type: 'author'
                    }
                ]
            }
        };

        expect(getAuthorsAsString(articleData, true)).toStrictEqual('');
        expect(getAuthorsAsString(articleData)).toStrictEqual('');
    });

    it('should return a empty string when the author name is not defined', () => {
        const articleData = {
            ...article,
            credits: {
                by: [
                    {
                        type: 'author'
                    }
                ]
            }
        };

        expect(getAuthorsAsString(articleData, true)).toStrictEqual('');
        expect(getAuthorsAsString(articleData)).toStrictEqual('');
    });
});
