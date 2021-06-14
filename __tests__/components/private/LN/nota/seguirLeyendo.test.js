import React from 'react';
import { render } from 'enzyme';

import SeguirLeyendo from '../../../../../components/private/LN/nota/seguirLeyendo';

describe('SeguirLeyendo', () => {
    const relatedContent = [
        {
            _id: 'PO7PQHQILZEDVOTDKA45LTVLCE',
            headlines: {
                basic: 'Prueba Storytelling roger.',
                mobile: 'Titulo mobile'
            },
            label: {
                volanta: {
                    text: 'Texto volanta'
                }
            },
            type: 'story',
            website_url: '/arquitectura/prueba-storytelling-roger-nid15072020/'
        },
        {
            _id: 'RVR3C77WONFPLOKRN745LBQR7Q',
            headlines: {
                basic: 'Los desarrolladores ponen la mira en la zona de Canning'
            },
            type: 'story',
            website_url:
                '/propiedades/los-desarrolladores-ponen-la-mira-en-la-zona-de-canning-nid20102020/'
        }
    ];

    it('Matches snapshot con website_url', () => {
        const component = render(
            <SeguirLeyendo relatedContent={relatedContent} />
        );
        expect(component).toMatchSnapshot();
    });

    const relatedContentWithCanonical = [
        {
            _id: 'ZYLGLZWJMJCMJD2JLSHSE4HVCY',
            headlines: {
                basic:
                    'De cocaína a psicofármacos: qué efectos tiene el consumo de sustancias ilícitas'
            },
            type: 'story',
            canonical_url:
                '/comunidad/de-cocaina-psicofarmacos-que-efectos-tiene-consumo-nid2470491/'
        },
        {
            _id: '4HFO7YPZBFEYVB6K5XY6IFV3XY',
            headlines: {
                basic:
                    'Alcoholismo. Señales de alerta y los peligros para la salud'
            },
            type: 'story',
            canonical_url:
                '/comunidad/alcoholismo-senales-alerta-peligros-salud-nid2464890/'
        }
    ];

    it('Matches snapshot con canonical_url', () => {
        const component = render(
            <SeguirLeyendo relatedContent={relatedContentWithCanonical} />
        );
        expect(component).toMatchSnapshot();
    });
});
