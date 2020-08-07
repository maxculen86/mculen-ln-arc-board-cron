import replaceTagInTextListRaw from '../../../../../content/sources/utils/replaceTagInTextListRaw';

describe('Common - utils - replaceTagInTextListRaw.js', () => {
    let contentElements = [
        {
            "type":"list",
            "list_type":"unordered",
            "items":[
               {
                  "type":"text",
                  "content":"Este una lista con un <a href=\"//www.google.com\" target=_blank TERCERA=\"\">link</a>",
               },
               {
                  "type":"text",
                  "content":"Otro <a href=\"//www.google.com\" target=_blank TERCERA=\"\">enlace</a> ",
               }
            ]
         },
         {
            "type":"text",
            "content":"Este es un parrafo con un <a href=\"//www.google.com\" target=_blank TERCERA=\"\">link</a> en el medio"
         },
         {
            "type":"raw_html",
            "content":"<ul class=\"com-unordered\">\n    <li class=\"com-item\">La línea aérea de bandera es Icelandair, que vuela regularmente al resto de Escandinavia, Europa y Estados Unidos. Hay aerolíneas de bajo costo como Iceland Express <i> ( <a href=\"http://www.icelandexpress.com\" tercera=\"\">www.icelandexpress.com</a></i> ), con pasajes que rondan los 100 euros desde capitales europeas.</li>\n</ul>\n<ul class=\"com-unordered\">\n    <li class=\"com-item\">El aeropuerto principal es Leifur Eiríksson ( <i><a href=\"http://www.keflavikairport.com\" tercera=\"\">www.keflavikairport.com</a></i> ), ubicado en Keflavik, a unos 50 minutos de la capital islandesa. Después de cada vuelo hay autobuses hasta allí.</li>\n</ul>\n<ul class=\"com-unordered\">\n    <li class=\"com-item\"><i><a href=\"http://www.visitreykjavik.is \" tercera=\"\">www.visitreykjavik.is</a></i><br><br> Completa página oficial de turismo</li>\n</ul>\n<p class=\"text element-paragraph\">Si uno sólo tuviera un día disponible.</p>\n<p class=\"text element-paragraph\" tercera=\"\">Si uno sólo tuviera un día disponible para hacer una excursión por tierra islandesa</p>"
         }
      ];

    test('Deberia eliminar un tag innecesario del content', () => {
        contentElements.forEach((e, i) => {
            contentElements[i] = replaceTagInTextListRaw(e, 'TERCERA=""');
        });

        
        expect(contentElements[0].items[0].content).toStrictEqual(
            "Este una lista con un <a href=\"//www.google.com\" target=_blank >link</a>"
        );
        expect(contentElements[1].content).toStrictEqual(
            "Este es un parrafo con un <a href=\"//www.google.com\" target=_blank >link</a> en el medio"
        );
        expect(contentElements[2].content).toStrictEqual(
            "<ul class=\"com-unordered\">\n    <li class=\"com-item\">La línea aérea de bandera es Icelandair, que vuela regularmente al resto de Escandinavia, Europa y Estados Unidos. Hay aerolíneas de bajo costo como Iceland Express <i> ( <a href=\"http://www.icelandexpress.com\" >www.icelandexpress.com</a></i> ), con pasajes que rondan los 100 euros desde capitales europeas.</li>\n</ul>\n<ul class=\"com-unordered\">\n    <li class=\"com-item\">El aeropuerto principal es Leifur Eiríksson ( <i><a href=\"http://www.keflavikairport.com\" >www.keflavikairport.com</a></i> ), ubicado en Keflavik, a unos 50 minutos de la capital islandesa. Después de cada vuelo hay autobuses hasta allí.</li>\n</ul>\n<ul class=\"com-unordered\">\n    <li class=\"com-item\"><i><a href=\"http://www.visitreykjavik.is \" >www.visitreykjavik.is</a></i><br><br> Completa página oficial de turismo</li>\n</ul>\n<p class=\"text element-paragraph\">Si uno sólo tuviera un día disponible.</p>\n<p class=\"text element-paragraph\" >Si uno sólo tuviera un día disponible para hacer una excursión por tierra islandesa</p>"
        );
    });
});
