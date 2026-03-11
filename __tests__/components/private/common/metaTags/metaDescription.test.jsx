import React from 'react';
import { render } from '@testing-library/react';
import MetaDescription from '../../../../../components/private/common/metaDescription';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('LN - Common - MetaDescription', () => {
    it('MetaDescription nota snapshot', () => {
        render(
            <MetaDescription
                arcSite="la-nacion-ar"
                subtype="1"
                metaTitleBasic="El Gobierno evalúa postular a una diplomática de carrera para la embajada en el Vaticano"
                firstParagraphContentElements="La postulación de la diplomática, elogiada en varias ocasiones públicamente por Felipe Solá, tomó fuerza en las últimas horas y, por ahora, no genera resistencias en el Palacio San Martín."
                description="Descripción Pruebaaaaa !!!"
            />
        );

        const metaElement = document.head.querySelector(
            'meta[name="description"]'
        );
        expect(metaElement).toMatchSnapshot();
    });

    it('MetaDescriptionAcumulado', () => {
        const props = {
            subtype: undefined,
            description: undefined,
            metaTitleBasic: undefined,
            arcSite: 'la-nacion-ar',
            nodeType: 'section',
            name: 'Economía',
            subheadlines: undefined,
            _id: '/economia',
            payload: undefined,
            section: 'acumulado',
            defaultDescription:
                'Todas las noticias de Argentina y el mundo: últimas noticias en actualidad, deportes, coronavirus, economía, política, y tecnología. Mantenete informado sobre las novedades de Argentina en LA NACION.',
            metaDescription:
                'Últimas Noticias de Economía: Guyana: El pequeño país que creció un 54% durante 2020, Nueva suba de la inflación esperada: Queda lejos el 29% pronosticado por el gobierno'
        };

        render(<MetaDescription {...props} />);
        const metaElement = document.querySelector('meta[name="description"]');

        expect(metaElement).toBeInTheDocument();
        expect(metaElement).toHaveAttribute(
            'content',
            'Últimas Noticias de Economía: Guyana: El pequeño país que creció un 54% durante 2020, Nueva suba de la inflación esperada: Queda lejos el 29% pronosticado por el gobierno - LA NACION'
        );
    });

    it('MetaDescriptionAcumulado para receta', () => {
        const props = {
            subtype: undefined,
            description: undefined,
            metaTitleBasic: undefined,
            arcSite: 'la-nacion-ar',
            nodeType: 'section',
            name: 'Recetas',
            subheadlines: undefined,
            _id: '/recetas',
            payload: undefined,
            section: 'acumulado',
            defaultDescription:
                'Todas las noticias de Argentina y el mundo: últimas noticias en actualidad, deportes, coronavirus, economía, política, y tecnología. Mantenete informado sobre las novedades de Argentina en LA NACION.',
            metaDescription:
                'Las mejores Recetas para cocinar, inspirate con estas ideas'
        };

        render(<MetaDescription {...props} />);
        const metaElement = document.querySelector('meta[name="description"]');

        expect(metaElement).toBeInTheDocument();
        expect(metaElement).toHaveAttribute(
            'content',
            'Las mejores Recetas para cocinar, inspirate con estas ideas'
        );
    });
});
