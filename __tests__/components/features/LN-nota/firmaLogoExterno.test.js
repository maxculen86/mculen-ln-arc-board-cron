import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FirmaLogoExterno from '../../../../components/features/LN-nota/firmaLogoExterno';
import ComPartner from '../../../../components/private/common/com-partner';
import ComLink from '../../../../components/private/common/com-link';
import {
    HTMLLIBRE,
    RECETA,
    NOTICIA
} from '..//../../../components/private/common/utils/subtypes/subtypeHelper';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Test of return FirmaLogoExterno', () => {
    const props = {
        distributor: undefined,
        subtype: RECETA,
        credits: {
            by: [
                {
                    type: 'author',
                    name: 'Mariano Grondona',
                    image: {
                        url:
                            'https://bucket.glanacion.com/anexos/fotos/85/2089285.png',
                        version: '0.5.8'
                    },
                    slug: 'mariano-grondona',
                    additional_properties: {
                        original: {
                            author_type: 'Estándar',
                            byline: 'Mariano Grondona',
                            role: 'LA NACION'
                        }
                    }
                },
                {
                    type: 'author',
                    name: 'Cristóbal Bellolio Badiola',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/lanacionar/c780bba1-6787-49f6-86ff-50afad490094.webp',
                        version: '0.5.8'
                    },
                    url: '/autor/cristobal-bellolio-badiola-13185/',
                    slug: 'cristobal-bellolio-badiola-13185',
                    additional_properties: {
                        author_type: ''
                    }
                }
            ]
        },
        withFirmaDistributor: false
    };

    it('Test of return distributor = undefined and by.lenth > 0', () => {
        const { container } = render(
            <FirmaLogoExterno globalContent={props} />
        );
        // Verifica si el contenedor está vacío
        expect(container).toBeEmptyDOMElement();
    });

    it('Test return component ComPartner La Nacion Recetas', () => {
        const properties = {
            ...props,
            credits: { by: [] }
        };
        render(<FirmaLogoExterno globalContent={properties} />);

        // Buscar por texto específico
        const comPartnerText = screen.getByText('Por LA NACION recetas');
        expect(comPartnerText).toBeInTheDocument();
    });

    it('Test of return subtype = RECETA and by.lenth > 0', () => {
        const properties = {
            ...props,
            distributor: { name: 'lanacionar' }
        };
        const { container } = render(
            <FirmaLogoExterno globalContent={properties} />
        );

        // Verifica si el contenedor está vacío
        expect(container).toBeEmptyDOMElement();
    });

    it('Test of return for HTMLLIBRE', () => {
        const properties = {
            ...props,
            distributor: { name: 'BBC Mundo' },
            subtype: HTMLLIBRE
        };
        render(<FirmaLogoExterno globalContent={properties} />);

        // Buscar por texto específico
        const comPartnerText = screen.getByText('BBC Mundo');
        expect(comPartnerText).toBeInTheDocument();
    });

    it('Test for withFirmaDistributor in false', () => {
        const properties = {
            ...props,
            distributor: { name: 'BBC' },
            subtype: NOTICIA
        };
        render(<FirmaLogoExterno globalContent={properties} />);

        // Busca el enlace por su clase CSS o texto visible
        const comLinkElement = screen.getByText('BBC'); // Asegúrate de usar el texto que corresponde
        // O si quieres buscar por clase CSS:
        // const comLinkElement = screen.getByRole('link', { class: 'com-link' });

        expect(comLinkElement).toBeInTheDocument();
    });
});
