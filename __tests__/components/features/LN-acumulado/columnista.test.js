// jest.mock('fusion:content', () => ({
//     useContent: () => ({
//         author_type: "Estándar",
//         awards:[],
//         bio_page: "/autor/joaquin-morales-sola-51/",
//         books:[],
//         byline: "Joaquín Morales Solá",
//         canonical_url: "/autor/joaquin-morales-sola-51/",
//         education:[],
//         email: "",
//         image:{
//             url:'https://resizer.glanacion.com/resizer/EtZOBsudn8441bPnB-VpXjl06S0=/280x0/filters:quality(80)/s3.amazonaws.com/arc-authors/lanacionar/d672e0d3-65df-44ef-8ea4-cdc8ef590296.png'
//         },
//         longBio:'Ejerce el periodismo desde los 16 años cuando ingresó al diario La Gaceta de Tucumán. En 1975, Clarín lo convocó para ser prosecretario de la sección Política. Durante 12 años fue segundo jefe de Redacción y autor de la columna política dominical de ese diario. Fue columnista político del noticiero de Telefé y del programa "Tiempo Nuevo", de Bernardo Neustadt. Durante 1997, condujo "Dos en la noticia" junto con Magdalena Ruiz Guiñazú, por el ex Canal 9. Actualmente es columnista político del diario LA NACION. En 1990, el gobierno de Italia lo condecoró con la Orden al Mérito de la República Italiana. Posteriormente, en 1992, España lo distinguió con la Orden de Isabel la Católica. En 1998, recibió la Orden Nacional al Mérito que entrega la república de Francia. En su último libro, "Sin excusas" (Sudamericana), Morales Solá revela diálogos con el ex vicepresidente Chacho Alvarez, sobre la trama secreta de los sobornos en el Senado, las causas de su renuncia y los errores que condujeron al fracaso de la Alianza.',
//         name: "Joaquín Morales Solá",
//         node_type: "author",
//         podcasts: [],
//         role: "LA NACION",
//         slug: "joaquin-morales-sola-51",
//         twitter: "",
//         _id: "joaquin-morales-sola-51"
//     })

// }));

jest.mock('../../../../components/features/LN-acumulado/columnista');

import React from 'react';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { render } from 'enzyme';
import COLUMNIST_DATA from '../../../../__mocks__/data/columnista/columnista';
import Columnista from '../../../../components/features/LN-acumulado/columnista';

describe('features - LaNacion - Acumulado - columnista', () => {
    useContent.mockImplementation(() => COLUMNIST_DATA);
    const props = {
        customFields: {
            id: 'joaquin-morales-sola-51'
        }
    };
    it('Test de snapshot Columnista', () => {
        const component = render(<Columnista {...props} />);
        expect(component).toMatchSnapshot();
    });
});
