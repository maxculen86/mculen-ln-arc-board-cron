import React from 'react';
import { render, mount, shallow } from 'enzyme';
import getTitleText from '../../../../../components/private/common/utils/getTitleText';
import getBajadaOrFirstTextParagraph from '../../../../../components/private/common/utils/getBajadaOrFirstTextParagraph';
import ModRowGap from '../../../../../components/private/common/mod-rowgap';

const article = {
    "_id":"H7QGKZCCJRH7LDOK2S2QSFEMYM",
    "content_elements":[
        {
            "content":"Esta es una imagen",
            "type":"image"
        },
       {
          "content":"Este es el primer parrafo de prueba para ver si en la vision tipo listado se muestra en caso que no este la bajada. Pero hay que tener en cuenta que se debe cortar a las 160 caracteres",
          "type":"text"
       },
       {
        "content":"Este es el segundo parrafo de prueba",
        "type":"text"
     }
    ],
    "credits":{
       "by":[
          {
             "name":"Mirta Albamonte",
             "type":"author"
          }
       ]
    },
    "display_date":"2020-06-02T15:28:04.694Z",
    "headlines":{
       "basic":"Test dl (titulo basico largo)",
       "mobile":"Titulo Movil Corto"
    },
    "subheadlines":{
       "basic":"Este es el subtitulo"
    },
    "subtype":"7",
    "website_url":"/recetas/test-dl-nid02062020/"
 };

 describe('Private - Common - ModRowGap', () => {
    
    it('Mostrar layout para 3 columnas', () => {
        const component = shallow(<ModRowGap column="3" classCondition='' typeArticle='Grilla' />)
        expect(component.find('.row-gap-tablet-3').length).toBe(1);
    });

    it('Mostrar layout para 2 columnas y apertura', () => {
        const component = shallow(<ModRowGap column="2" classCondition='--opening'  />)
        expect(component.find('div').hasClass('row-gap-tablet-2 row-gap-desksm-2 --opening')).toBe(true);                
    });

    it('Mostrar layout para listado', () => {
        const component = shallow(<ModRowGap column="3" classCondition='' typeArticle='Listado' />)
        expect(component.find('.row-gap-tablet-3').length).toBe(0);
        
    });
})


describe('Private - Common - getBajadaOrFirstTextParagraph', () => {
    
    const subheadText1 = getBajadaOrFirstTextParagraph(article);
    it('Mostrar subtitulo (subheadlines)', () => {
        expect(subheadText1).toEqual('Este es el subtitulo');
    });

    const articleCopy = {...article};
    articleCopy.subheadlines = {};
    const subheadText2 = getBajadaOrFirstTextParagraph(articleCopy);

    it('Mostrar primer parrafo de texto', () => {
        expect(subheadText2).toEqual('Este es el primer parrafo de prueba para ver si en la vision tipo listado se muestra en caso que no este la bajada. Pero hay que tener en cuenta que se debe co...');
    });

    const articleCopy2 = {...article};
    articleCopy2.subheadlines = {};
    articleCopy2.content_elements = [];
    const subheadText3 = getBajadaOrFirstTextParagraph(articleCopy2);

    it('No mostrar nada', () => {
        expect(subheadText3).toEqual('');
    });
})

describe('Private - Common - GetTitleText', () => {
    

    const { headlines, label } = article; 
    const titleCorto = getTitleText(headlines, label);

    it('Mostrar titulo corto', () => {
        expect(titleCorto).toEqual('Titulo Movil Corto');
    });

    headlines.mobile = null;
    const titleLargo = getTitleText(headlines, label);
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