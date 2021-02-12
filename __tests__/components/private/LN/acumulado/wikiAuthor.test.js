import React from 'react';

import { render } from 'enzyme';
import WikiAuthor from '../../../../../components/private/LN/acumulado/author/wikiAuthor';

describe('private - LN - acumulado - Author - wikiAuthor', () => {
    const globalContent1 = {
        byline: 'Joaquín Morales Solá',
        bio_page: 'https://google.com',
        location: 'Argentina',
        image: {
            url: 'https://bucket2.glanacion.com/anexos/fotos/95/3037695h320.png'
        },
        longBio: `Ejerce el periodismo desde los 16 años cuando ingresó al
                diario La Gaceta de Tucumán. En 1975, Clarín lo convocó para
                ser prosecretario de la sección Política. Durante 12 años
                fue segundo jefe de Redacción y autor de la columna política
                dominical de ese diario. Fue columnista político del
                noticiero de Telefé y del programa "Tiempo Nuevo", de
                Bernardo Neustadt. Durante 1997, condujo "Dos en la noticia"
                junto con Magdalena Ruiz Guiñazú, por el ex Canal 9.
                Actualmente es columnista político del diario LA NACION. En
                1990, el gobierno de Italia lo condecoró con la Orden al
                Mérito de la República Italiana. Posteriormente, en 1992,
                España lo distinguió con la Orden de Isabel la Católica. En
                1998, recibió la Orden Nacional al Mérito que entrega la
                república de Francia. En su último libro, "Sin excusas"
                (Sudamericana), Morales Solá revela diálogos con el ex
                vicepresidente Chacho Alvarez, sobre la trama secreta de los
                sobornos en el Senado, las causas de su renuncia y los
                errores que condujeron al fracaso de la Alianza.`,
        books: [
            {
                title: 'Carlos Pagni en Odisea Argentina',
                publisher: 'Editorial',
                url: 'https://google.com'
            }
        ],
        podcasts: [
            {
                name: 'Un podcast',
                url: 'http://google.com'
            },
            {
                name: 'Dos podcast',
                url: 'http://google.com'
            }
        ],
        education: [
            {
                name: 'Periodismo, Universidad de Buenos Aires, 1989.'
            },
            {
                name: 'Periodismo, Universidad de Buenos Aires, 1995.'
            }
        ],
        awards: [
            {
                name:
                    'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.'
            },
            {
                name:
                    'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.'
            }
        ],
        personal_website: 'https://google.com',
        languages: 'Ingles, Frances',
        affiliations: 'Academia de Periodismo.',
        twitter: '@moralessola',
        facebook: '@moralessola',
        youtube: '@moralessola',
        instagram: '@moralessola',
        linkedin: '@moralessola',
        rss: '@moralessola',
        medium: '@moralessola',
        reddit: '@moralessola',
        pinterest: '@moralessola',
        soundcloud: '@moralessola',
        snapchat: '@moralessola',
        whatsapp: '@moralessola',
        tumblr: '@moralessola'
    };

    const component = render(<WikiAuthor data={globalContent1} />);
    it('Test de snapshot Bio Author', () => {
        expect(component).toMatchSnapshot();
    });

    const globalContent2 = {
        byline: 'Joaquín Morales Solá',
        bio_page: 'https://google.com',
        image: {},
        longBio: `Ejerce el periodismo desde los 16 años cuando ingresó al
                diario La Gaceta de Tucumán. En 1975, Clarín lo convocó para
                ser prosecretario de la sección Política. Durante 12 años
                fue segundo jefe de Redacción y autor de la columna política
                dominical de ese diario.`,
        books: [],
        podcasts: [
            {
                name: 'Dos podcast',
                url: 'http://google.com'
            }
        ],
        education: [],
        awards: [],
        personal_website: 'https://google.com',
        languages: 'Ingles, Frances',
        twitter: '@moralessola'
    };

    const component2 = render(<WikiAuthor data={globalContent2} />);
    it('Test de snapshot Bio Author Sin muchos datos', () => {
        expect(component2).toMatchSnapshot();
    });
});
