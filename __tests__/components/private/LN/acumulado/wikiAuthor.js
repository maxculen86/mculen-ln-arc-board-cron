import React from 'react';
import { render } from 'enzyme';
import WikiAuthor from '../../../../../components/private/LN/acumulado/author/wikiAuthor';

const bioAuthor = {
    name: 'Joaquín Morales Solá',
    url: 'https://google.com',
    imgSrc: 'https://bucket2.glanacion.com/anexos/fotos/95/3037695h320.png',
    bio: `Ejerce el periodismo desde los 16 años cuando ingresó al
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
    twitter: '@moralessola'
};

describe('features - LaNacion - Home - Acum - Author', () => {
    const component = render(<WikiAuthor {...bioAuthor} />);
    it('Test de snapshot Bio Author', () => {
        expect(component).toMatchSnapshot();
    });
});
