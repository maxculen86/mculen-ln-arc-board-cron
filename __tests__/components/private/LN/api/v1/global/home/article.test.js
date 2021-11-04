import { articleItem as Article } from '../../../../../../../../components/private/LN/api/v1/common/article/article';
import colecction from '../../../../../../../__mocks__/data/collection/OCTOV4V54FCFLJHOVB5IAJKHHM.json';
import article1 from '../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import article2 from '../../../../../../../__mocks__/data/articles/3SHTRO3NKBCN7L3JITCDQYSJLM.json';
import article3 from '../../../../../../../__mocks__/data/articles/3THDAILWTVHARHBYA5AEVL7OAU.json';
import article4 from '../../../../../../../__mocks__/data/articles/CTTZRKCCPBE6LNUCEK4TT46DFU.json';

import get from '../../../../../../../components/private/common/utils/get';
describe('components - private - LN - api - v1 - home - article.js', () => {
    let articlesfromCajaManual = [];
    let articlesfromCajaCollections = [];
    const configurations = {
        arcSite: 'la-nacion-ar'
    };
    const articlesMap = articles => {
        return articles
            .filter(e => e)
            .map(article => {
                return Article(article);
            });
    };

    it('Testeo articulo Caja Manual OK', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        articlesfromCajaManual.push(article2);
        articlesfromCajaManual.push(article3);

        const notas = articlesMap(articlesfromCajaManual);
        expect(notas[0].id).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
        expect(notas[0].templateId).toBe('1');
        expect(notas[0].sitioId).toBe(null);
        expect(notas[0].url).toBe(
            '/deportes/prueba-ios-y-android-cuerpo-nid12052020/'
        );
        expect(notas[0].titulo).toBe('Prueba Mobile');
        expect(notas[0].volanta).toBe('Esto es una volanta.');
        expect(notas[0].bajada).toBe(
            'Esto es una bajada. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod...'
        );
        expect(notas[0].chapita).toBe(null);
        expect(notas[0].autor.id).toBe(4189);
        expect(notas[0].autor.slug).toBe('max-fisher-4189');
        expect(notas[0].autor.valor).toBe('Max Fisher');
        expect(notas[0].autor.tipo).toBe(1);
        expect(notas[0].autor.imagen).toBe(null);
        expect(notas[0].autor.mail).toBe(undefined);
        expect(notas[0].autor.twitter).toBe(undefined);
        expect(notas[0].marquesina).toBe(
            'Por Max Fisher, Matias Velasquez, Soledad Velasquez e Ignacio Fernandez'
        );
        expect(notas[0].seccionPadre).toBe(null);
    });
    it('Testeo articulo Caja Manual con un articulo null', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        articlesfromCajaManual.push(null);
        articlesfromCajaManual.push(article3);

        const notas = articlesMap(articlesfromCajaManual);
        expect(notas.length).toBe(2);
        expect(notas[0].id).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
        expect(notas[1].id).toBe('3THDAILWTVHARHBYA5AEVL7OAU');
    });

    it('Testeo articulo Caja Manual con todos los articulo null', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(null);
        articlesfromCajaManual.push(null);
        articlesfromCajaManual.push(null);

        const notas = articlesMap(articlesfromCajaManual);
        expect(notas.length).toBe(0);
    });

    it('Testeo articulo sin Autor', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article4);
        const notas = articlesMap(articlesfromCajaManual);
        expect(notas[0].autor).toBeNull();
    });

    it('Testeo articulo Caja Collection Ok', () => {
        const elements = get(colecction, 'content_elements', []);
        try {
            const notas = articlesMap(elements);
            expect(notas[1].id).toBe('5OUY7OCFZNFLLBM6XM4CTSIUWQ');
        } catch (err) {
            expect(err.message).toBe(
                "Cannot read property 'match' of undefined"
            );
        }
    });

    it('Testeo articulo Caja Collection con un articulo null', () => {
        let elements = get(colecction, 'content_elements', []);
        elements[0] = null;
        const notas = articlesMap(elements);
        expect(notas[0].id).toBe('5OUY7OCFZNFLLBM6XM4CTSIUWQ');
    });

    it('Testeo articulo sin campo id', () => {
        const articlesinId = {
            canonical_url: '/deportes/por-el-mercado-nid570000/',
            content_elements: [
                {
                    _id: 'UGOTNNA5NNH3NK2KSBIANFMLM4',
                    additional_properties: {},
                    content:
                        'AGADIR.- Como en cualquier lugar del mundo islámico, la recorrida de las calles es un paseo obligado. Otras costumbres, otra manera de vivir. Ni mejor ni peor. Diferente. Poco queda en Agadir de esa ciudad magrebí que los portugueses convirtieron en factoría, en 1505, para obtener jugosos beneficios de la caña de azúcar, dátiles, cera, pieles, aceites, especias y esclavos. Cuarenta años después, los empresarios que compartían ganancias con la corona lusitana abandonaron este puerto. Mucho tiempo después, en 1960, un terremoto sepultó el pasado. Agadir es un sitio de construcciones nuevas, con casas de uno o dos pisos. Poca gente se mueve por sus calles. Son días de fiesta religiosa, la celebración del cordero, en la que los jefes de las familias con dinero compran el animal, lo sacrifican -como lo hizo Abraham en el Antiguo Testamento- y lo comparten con los que menos tienen, como un símbolo de unidad. Por eso, encontrar algún mercado funcionando a pleno es una misión complicada.',
                    type: 'text'
                },
                {
                    _id: 'MFRUCA2MOVGHVGG2CA65DGMTQY',
                    additional_properties: {},
                    content:
                        'El souk -traducción del vocablo mercado- de Agadir está cerrado. Hay que tomar un taxi y viajar unos 15 kilómetros hasta Anza, para encontrar uno a medio abrir. Apenas se estaciona, aparece Abdul, que al encontrarse con un visitante dice en inglés: Eres bienvenido a Marruecos. Abdul se convierte en el guía por ese laberinto de tiendas en el que proliferan las fotos de Mohammed VI, descendiente del profeta Mahoma, rey y jefe religioso de Marruecos.',
                    type: 'text'
                },
                {
                    _id: 'Y6W6A5PU2VBULNONTYAXFWL7TE',
                    additional_properties: {},
                    content:
                        'Abdul se siente como pez en el agua. Por unas monedas, es el reaseguro para recorrer sin problemas local por local. Y pide, en un sector, al escuchar los gritos, que nadie saque fotos. Levanta la cabeza y señala contra una esquina: "Está loco, no lo miren. Es capaz de cualquier cosa". Sigue su camino. Un par de contraseñas son útiles para entrar en un negocio y ser testigo de innumerables ofertas y regateos. En francés, en inglés o en español. Todas en euros y no en dirham, la moneda local. Desde las Adidas de Marruecos (un calzado típico), túnicas y el también clásico gorro bordó (babouche) con pompón negro. Y si todo eso no satisface la demanda, el souk se encargará de demostrar que detrás de sus lúgubres callecitas, entre una decena de remeras con leyendas árabes, se ve una camiseta negra. Dice David Beckham, tiene una imagen del futbolista inglés y la palabra Real Madrid. Suficiente para convencerse de que la enjundia marketinera de Florentino Pérez tiene acceso a todas partes. Aun en el souk de este remoto y escondido pueblo.',
                    type: 'text'
                }
            ],
            configurations: {
                arcSite: 'la-nacion-ar'
            },
            credits: {},
            distributor: {
                category: 'staff',
                name: 'lanacionar'
            },
            headlines: {
                basic: 'Por el mercado',
                mobile: 'Por el mercado'
            },
            label: {
                edicion: {
                    display: true,
                    text: 'Impresa'
                },
                volanta: {
                    display: true,
                    text: 'De viaje.'
                }
            },
            owner: {},
            related_content: {
                basic: []
            },
            subheadlines: {
                basic: 'Por Alfredo Bernardi'
            },
            subtype: '1',
            taxonomy: {
                primary_section: {
                    _id: '/deportes',
                    _website: 'la-nacion-ar',
                    additional_properties: {
                        original: {
                            ancestors: {},
                            site: {}
                        }
                    },
                    name: 'Deportes',
                    parent_id: '/',
                    path: '/deportes'
                },
                sections: [
                    {
                        _id: '/deportes',
                        _website: 'la-nacion-ar',
                        additional_properties: {
                            original: {
                                ancestors: {},
                                site: {}
                            }
                        },
                        name: 'Deportes',
                        parent_id: '/',
                        path: '/deportes'
                    }
                ],
                tags: []
            },
            type: 'story',
            website_url: '/deportes/por-el-mercado-nid570000/'
        };
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        articlesfromCajaManual.push(articlesinId);
        articlesfromCajaManual.push(article3);
        try {
            const notas = articlesMap(articlesfromCajaManual);
            expect(notas[0].id).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
        } catch (err) {
            expect(err.message).toBe(
                'Revisar Parametros de Articulo en null o undefined'
            );
        }
    });

    it('Testeo articulo sin campo titulo', () => {
        const articlesinId = {
            _id: '3SHTRO3NKBCN7L3JITCDQYSJLM',
            canonical_url: '/deportes/por-el-mercado-nid570000/',
            content_elements: [
                {
                    _id: 'UGOTNNA5NNH3NK2KSBIANFMLM4',
                    additional_properties: {},
                    content:
                        'AGADIR.- Como en cualquier lugar del mundo islámico, la recorrida de las calles es un paseo obligado. Otras costumbres, otra manera de vivir. Ni mejor ni peor. Diferente. Poco queda en Agadir de esa ciudad magrebí que los portugueses convirtieron en factoría, en 1505, para obtener jugosos beneficios de la caña de azúcar, dátiles, cera, pieles, aceites, especias y esclavos. Cuarenta años después, los empresarios que compartían ganancias con la corona lusitana abandonaron este puerto. Mucho tiempo después, en 1960, un terremoto sepultó el pasado. Agadir es un sitio de construcciones nuevas, con casas de uno o dos pisos. Poca gente se mueve por sus calles. Son días de fiesta religiosa, la celebración del cordero, en la que los jefes de las familias con dinero compran el animal, lo sacrifican -como lo hizo Abraham en el Antiguo Testamento- y lo comparten con los que menos tienen, como un símbolo de unidad. Por eso, encontrar algún mercado funcionando a pleno es una misión complicada.',
                    type: 'text'
                },
                {
                    _id: 'MFRUCA2MOVGHVGG2CA65DGMTQY',
                    additional_properties: {},
                    content:
                        'El souk -traducción del vocablo mercado- de Agadir está cerrado. Hay que tomar un taxi y viajar unos 15 kilómetros hasta Anza, para encontrar uno a medio abrir. Apenas se estaciona, aparece Abdul, que al encontrarse con un visitante dice en inglés: Eres bienvenido a Marruecos. Abdul se convierte en el guía por ese laberinto de tiendas en el que proliferan las fotos de Mohammed VI, descendiente del profeta Mahoma, rey y jefe religioso de Marruecos.',
                    type: 'text'
                },
                {
                    _id: 'Y6W6A5PU2VBULNONTYAXFWL7TE',
                    additional_properties: {},
                    content:
                        'Abdul se siente como pez en el agua. Por unas monedas, es el reaseguro para recorrer sin problemas local por local. Y pide, en un sector, al escuchar los gritos, que nadie saque fotos. Levanta la cabeza y señala contra una esquina: "Está loco, no lo miren. Es capaz de cualquier cosa". Sigue su camino. Un par de contraseñas son útiles para entrar en un negocio y ser testigo de innumerables ofertas y regateos. En francés, en inglés o en español. Todas en euros y no en dirham, la moneda local. Desde las Adidas de Marruecos (un calzado típico), túnicas y el también clásico gorro bordó (babouche) con pompón negro. Y si todo eso no satisface la demanda, el souk se encargará de demostrar que detrás de sus lúgubres callecitas, entre una decena de remeras con leyendas árabes, se ve una camiseta negra. Dice David Beckham, tiene una imagen del futbolista inglés y la palabra Real Madrid. Suficiente para convencerse de que la enjundia marketinera de Florentino Pérez tiene acceso a todas partes. Aun en el souk de este remoto y escondido pueblo.',
                    type: 'text'
                }
            ],
            configurations: {
                arcSite: 'la-nacion-ar'
            },
            credits: {},
            distributor: {
                category: 'staff',
                name: 'lanacionar'
            },
            label: {
                edicion: {
                    display: true,
                    text: 'Impresa'
                },
                volanta: {
                    display: true,
                    text: 'De viaje.'
                }
            },
            owner: {},
            related_content: {
                basic: []
            },
            subheadlines: {
                basic: 'Por Alfredo Bernardi'
            },
            subtype: '1',
            taxonomy: {
                primary_section: {
                    _id: '/deportes',
                    _website: 'la-nacion-ar',
                    additional_properties: {
                        original: {
                            ancestors: {},
                            site: {}
                        }
                    },
                    name: 'Deportes',
                    parent_id: '/',
                    path: '/deportes'
                },
                sections: [
                    {
                        _id: '/deportes',
                        _website: 'la-nacion-ar',
                        additional_properties: {
                            original: {
                                ancestors: {},
                                site: {}
                            }
                        },
                        name: 'Deportes',
                        parent_id: '/',
                        path: '/deportes'
                    }
                ],
                tags: []
            },
            type: 'story',
            website_url: '/deportes/por-el-mercado-nid570000/'
        };
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        articlesfromCajaManual.push(articlesinId);
        articlesfromCajaManual.push(article3);
        try {
            const notas = articlesMap(articlesfromCajaManual);
            expect(notas[0].id).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
        } catch (err) {
            expect(err.message).toBe('Titulo de la nota es null o undefined');
        }
    });
    it('Testeo getArticleSignature, autores en marquesina', () => {
        const authors = [
            {
                _id: 'matias-velasquez-4189',
                additional_properties: { original: [Object] },
                image: { url: '' },
                name: 'Matias Velasquez',
                slug: 'matias-velasquez-4189',
                type: 'author',
                url: '/autor/matias-velasquez-4189/'
            },
            {
                _id: 'isaias-anzola-4189',
                additional_properties: { original: [Object] },
                image: { url: '' },
                name: 'Isaías Anzola',
                slug: 'isaias-anzola-4189',
                type: 'author',
                url: '/autor/isaias-anzola-4189/'
            },
            {
                _id: 'sally-flores-4189',
                additional_properties: { original: [Object] },
                image: { url: '' },
                name: 'Sally Flores',
                slug: 'sally-flores-4189',
                type: 'author',
                url: '/autor/sally-flores-4189/'
            },
            {
                _id: 'leonardo-lemkin-4189',
                additional_properties: { original: [Object] },
                image: { url: '' },
                name: 'Leonardo Lemkin',
                slug: 'leonardo-lemkin-4189',
                type: 'author',
                url: '/autor/leonardo-lemkin-4189/'
            }
        ];
        const articleauthor = {
            _id: '2KOBND62KNFVVBFQZOADNN6WNY',
            canonical_url: '/deportes/por-el-mercado-nid570000/',
            content_elements: [
                {
                    _id: 'UGOTNNA5NNH3NK2KSBIANFMLM4',
                    additional_properties: {},
                    content:
                        'AGADIR.- Como en cualquier lugar del mundo islámico, la recorrida de las calles es un paseo obligado. Otras costumbres, otra manera de vivir. Ni mejor ni peor. Diferente. Poco queda en Agadir de esa ciudad magrebí que los portugueses convirtieron en factoría, en 1505, para obtener jugosos beneficios de la caña de azúcar, dátiles, cera, pieles, aceites, especias y esclavos. Cuarenta años después, los empresarios que compartían ganancias con la corona lusitana abandonaron este puerto. Mucho tiempo después, en 1960, un terremoto sepultó el pasado. Agadir es un sitio de construcciones nuevas, con casas de uno o dos pisos. Poca gente se mueve por sus calles. Son días de fiesta religiosa, la celebración del cordero, en la que los jefes de las familias con dinero compran el animal, lo sacrifican -como lo hizo Abraham en el Antiguo Testamento- y lo comparten con los que menos tienen, como un símbolo de unidad. Por eso, encontrar algún mercado funcionando a pleno es una misión complicada.',
                    type: 'text'
                }
            ],
            configurations: {
                arcSite: 'la-nacion-ar'
            },
            credits: {
                by: []
            },
            distributor: {
                category: 'staff',
                name: 'lanacionar'
            },
            headlines: {
                basic: 'Por el mercado',
                mobile: 'Por el mercado'
            },
            label: {
                edicion: {
                    display: true,
                    text: 'Impresa'
                },
                volanta: {
                    display: true,
                    text: 'De viaje.'
                }
            },
            owner: {},
            related_content: {
                basic: []
            },
            subheadlines: {
                basic: 'Por La Nacion'
            },
            subtype: '1',
            taxonomy: {
                primary_section: {
                    _id: '/deportes',
                    _website: 'la-nacion-ar',
                    additional_properties: {
                        original: {
                            ancestors: {},
                            site: {}
                        }
                    },
                    name: 'Deportes',
                    parent_id: '/',
                    path: '/deportes'
                },

                tags: []
            },
            type: 'story',
            website_url: '/deportes/por-el-mercado-nid570000/'
        };
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(articleauthor);
        articleauthor.credits.by.push(authors[0]);
        const articles = articlesMap(articlesfromCajaManual);
        // expect(articles[0].autores.length).toBe(1);
        expect(articles[0].marquesina).toBe('Por Matias Velasquez');

        articleauthor.credits.by.splice(0, articleauthor.credits.by.length);
        articleauthor.credits.by.push(authors[0]);
        articleauthor.credits.by.push(authors[1]);
        const articlesWithTwoAuthors = articlesMap(articlesfromCajaManual);
        // expect(articlesWithTwoAuthors[0].autores.length).toBe(2);
        expect(articlesWithTwoAuthors[0].marquesina).toBe(
            'Por Matias Velasquez e Isaías Anzola'
        );

        articleauthor.credits.by.splice(0, articleauthor.credits.by.length);
        articleauthor.credits.by.push(authors[0]);
        articleauthor.credits.by.push(authors[1]);
        articleauthor.credits.by.push(authors[2]);
        articleauthor.credits.by.push(authors[3]);
        const articlesWithFourAuthors = articlesMap(articlesfromCajaManual);
        // expect(articlesWithFourAuthors[0].autores.length).toBe(4);
        expect(articlesWithFourAuthors[0].marquesina).toBe(
            'Por Matias Velasquez, Isaías Anzola, Sally Flores y Leonardo Lemkin'
        );

        articleauthor.credits.by.splice(0, articleauthor.credits.by.length);
        articleauthor.credits.by.push(authors[0]);
        articleauthor.credits.by.push(authors[2]);
        articleauthor.credits.by.push(authors[1]);
        const articlesWithThreeAuthors = articlesMap(articlesfromCajaManual);
        // expect(articlesWithThreeAuthors[0].autores.length).toBe(3);
        expect(articlesWithThreeAuthors[0].marquesina).toBe(
            'Por Matias Velasquez, Sally Flores e Isaías Anzola'
        );

        articleauthor.credits.by.splice(0, articleauthor.credits.by.length);
        articleauthor.credits.by.push(authors[0]);
        articleauthor.credits.by.push(authors[2]);
        const articlesWithTwoAuthorsY = articlesMap(articlesfromCajaManual);
        // expect(articlesWithTwoAuthorsY[0].autores.length).toBe(2);
        expect(articlesWithTwoAuthorsY[0].marquesina).toBe(
            'Por Matias Velasquez y Sally Flores'
        );
    });
    it('Testeo enviar todos los autores de una nota', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        const notas = articlesMap(articlesfromCajaManual);
        // expect(notas[0].autores.length).toBe(4);
        expect(notas[0].marquesina).toBe(
            'Por Max Fisher, Matias Velasquez, Soledad Velasquez e Ignacio Fernandez'
        );
    });
    it('Testeo campo autores en nota', () => {
        articlesfromCajaManual = [];
        articlesfromCajaManual.push(article1);
        const notas = articlesMap(articlesfromCajaManual);
        expect(notas[0].autor.valor).toBe('Max Fisher');
        // expect(notas[0].autores.length).toBe(4);
        expect(notas[0].marquesina).toBe(
            'Por Max Fisher, Matias Velasquez, Soledad Velasquez e Ignacio Fernandez'
        );
    });
});
