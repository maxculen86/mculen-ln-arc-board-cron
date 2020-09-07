import React from 'react';
import { render, mount, shallow } from 'enzyme';
import getTitleText from '../../../../../components/private/common/utils/getTitleText';
import getBajadaOrFirstTextParagraph from '../../../../../components/private/common/utils/getBajadaOrFirstTextParagraph';

import article from '../../../../../__mocks__/data/articles/articleAcum.json';
import ArticleAcum from '../../../../../components/private/LN/acumulado/articleAcum';

jest.mock(
    '../../../../../components/private/common/mod-article.jsx',
    () => 'mod-article-mock'
);

describe('Private - LN - Acumulado - ArticleAcum', () => {
    const props = {
        dataSection: 'CuerpoAcu',
        article: article,
        typeArticle: 'Grilla'
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
        expect(component.find('mod-article-mock').props().authors.length).toBe(
            1
        );
    });

    it('Validar que las props lleguen bien en caso de Listado a ModArticle', () => {
        const component = mount(
            <ArticleAcum {...props} typeArticle="Listado" />
        );

        expect(component.find('mod-article-mock').props().withMedia).toBe(
            false
        );
        expect(component.find('mod-article-mock').props().subheadText).toBe(
            'Este es el subtitulo'
        );
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
    /*
    it('Render OK', () => {
        const component = render(<LinkAmpHTML {...props} />);
        expect(component).toBeDefined();
    });

    it('Render NOTOK', () => {
        const component = mount(<LinkAmpHTML {...props} subtype={'0'} />);
        expect(component.html()).toBeNull();
    });

    it('Validar props enviadas', () => {
        const component = mount(<LinkAmpHTML {...props} />);
        expect(component.props()).toEqual(props);
    });

    it('Si no envio props retornar null', () => {
        const component = mount(<LinkAmpHTML />);
        expect(component.html()).toBeNull();
    });

    it('Atributos y nodo del DOM correcto', () => {
        const component = mount(<LinkAmpHTML {...props} />);
        expect(component.find('link')).toHaveLength(1);
        expect(component.find('link').props().rel).toEqual('amphtml');
        expect(component.find('link').props().href).toEqual(
            'https://www.lanacion.com.ar/ciencia/roger-prueba-imagenes-nid28052020/?outputType=amp'
        );
    });

    it('Snapshots', () => {
        const component = render(<LinkAmpHTML {...props} />);
        expect(component).toMatchSnapshot();
    });
    */
});
