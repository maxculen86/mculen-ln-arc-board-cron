import React from 'react';
import { render, mount, shallow } from 'enzyme';
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
        withSubhead: false
    };

    it('Validar que las props lleguen bien en caso de Grilla a ModArticle', () => {
        const component = mount(<ArticleAcum {...props} />);

        expect(component.find('mod-article-mock').props().withMedia).toBe(true);
        expect(component.find('mod-article-mock').props().subheadText).toBe(
            false
        );
        expect(component.find('mod-article-mock').props().titleText).toEqual(
            'Titulo Movil Corto'
        );
        expect(component.find('mod-article-mock').props().authors).toEqual(
            'Por Mirta Albamonte'
        );
    });

    it('Validar que las props lleguen bien en caso de Listado a ModArticle', () => {
        const component = mount(
            <ArticleAcum {...props} typeArticle="Listado" withSubhead={true} />
        );

        expect(component.find('mod-article-mock').props().withMedia).toBe(
            false
        );
        expect(component.find('mod-article-mock').props().hour).toBeFalsy();
        expect(component.find('mod-article-mock').props().subheadText).toBe(
            'Este es el subtitulo'
        );
    });

    it('Validar que las props lleguen bien en caso de Listado a ModArticle', () => {
        const component = mount(
            <ArticleAcum {...props} typeArticle="Timeline" />
        );

        expect(component.find('mod-article-mock').props().subheadText).toBe(
            false
        );
        expect(component.find('mod-article-mock').props().dateText).toBe(false);
        expect(component.find('mod-article-mock').props().hour).toBeTruthy();
    });

    it('Validar que la hora en ComHour se muestre bien', () => {
        const hourComponent = render(
            <ComHour display_date="2020-06-02T15:28:04.694Z" />
        );
        expect(hourComponent.html()).toBe('09:28');
    });
});

describe('Private - Common - getBajadaOrFirstTextParagraph', () => {
    const subheadText1 = getBajadaOrFirstTextParagraph(article);
    it('Mostrar subtitulo (subheadlines)', () => {
        expect(subheadText1).toEqual('Este es el subtitulo');
    });

    const articleCopy = { ...article };
    articleCopy.subheadlines = {};
    const subheadText2 = getBajadaOrFirstTextParagraph(articleCopy);

    it('Mostrar primer parrafo de texto', () => {
        expect(subheadText2).toEqual(
            'Este es el primer parrafo de prueba para ver si en la vision tipo listado se muestra en caso que no este la bajada. Pero hay que tener en cuenta que se debe co...'
        );
    });

    const articleCopy2 = { ...article };
    articleCopy2.subheadlines = {};
    articleCopy2.content_elements = [];
    const subheadText3 = getBajadaOrFirstTextParagraph(articleCopy2);

    it('No mostrar nada', () => {
        expect(subheadText3).toEqual('');
    });
});

describe('Private - Common - GetTitleText', () => {
    const { headlines, label } = article;
    const titleCorto = getTitleText(headlines, label);

    it('Mostrar titulo corto', () => {
        expect(titleCorto).toEqual('Titulo Movil Corto');
    });

    const headlines2 = { ...headlines };
    headlines2.mobile = null;
    const titleLargo = getTitleText(headlines2, label);
    it('Mostrar titulo largo', () => {
        expect(titleLargo).toEqual('Test dl (titulo basico largo)');
    });
});

describe('Private - Common - GetAuthorAsString', () => {
    const authorsString = getAuthorsAsString(article);

    it('Mostrar author en string', () => {
        expect(authorsString).toEqual('Por Mirta Albamonte');
    });

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

    const authorsString2 = getAuthorsAsString(article2);
    it('Mostrar varios authores separados con , e y al final', () => {
        expect(authorsString2).toEqual(
            'Por Mirta Albamonte, Mariano Grondona y Alberto Fernandez'
        );
    });

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

    const authorsString3 = getAuthorsAsString(article3);
    it('Mostrar author que es del tipo author', () => {
        expect(authorsString3).toEqual('Por Mariano Grondona');
    });
});
