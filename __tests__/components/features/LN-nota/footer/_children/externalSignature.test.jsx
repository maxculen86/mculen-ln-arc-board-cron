import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    HTMLLIBRE,
    RECETA,
    NOTICIA
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';
import ExternalSignature from '../../../../../../components/features/LN-nota/footer/_children/externalSiganture';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('components - feature - LN-nota - footer - _children - externalSignature', () => {
    const props = {
        distributor: undefined,
        subtype: RECETA,
        credits: {
            by: [
                {
                    type: 'author',
                    name: 'Mariano Grondona',
                    image: {
                        url: 'https://bucket.glanacion.com/anexos/fotos/85/2089285.png',
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
                        url: 'https://s3.amazonaws.com/arc-authors/lanacionar/c780bba1-6787-49f6-86ff-50afad490094.webp',
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

    it('Test of return distributor = undefined and by.length > 0', () => {
        const { container } = render(
            <ExternalSignature globalContent={props} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('Test return component ComPartner La Nacion Recetas', () => {
        const properties = {
            ...props,
            credits: { by: [] },
            distributor: { name: 'Reuters' }
        };
        render(<ExternalSignature globalContent={properties} />);

        const comPartnerText = screen.getByText('Por LA NACION recetas');
        expect(comPartnerText).toBeInTheDocument();
    });

    it('Test of return subtype = RECETA and by.length > 0', () => {
        const properties = {
            ...props,
            distributor: { name: 'lanacionar' }
        };
        const { container } = render(
            <ExternalSignature globalContent={properties} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('Test of return name "LA NACION" and by.length > 0', () => {
        const properties = {
            ...props,
            distributor: { name: 'LA NACION' },
            subtype: NOTICIA
        };

        const { container } = render(
            <ExternalSignature globalContent={properties} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('Test of return for HTMLLIBRE', () => {
        const properties = {
            ...props,
            distributor: { name: 'BBC Mundo' },
            subtype: HTMLLIBRE
        };
        render(<ExternalSignature globalContent={properties} />);

        const comPartnerText = screen.getByText('BBC Mundo');
        expect(comPartnerText).toBeInTheDocument();
    });

    it('Test for withFirmaDistributor in false', () => {
        const properties = {
            ...props,
            distributor: { name: 'BBC' },
            subtype: NOTICIA
        };
        render(<ExternalSignature globalContent={properties} />);
        const comLinkElement = screen.getByRole('link');
        expect(comLinkElement).toBeInTheDocument();
    });

    it('Test for withFirmaDistributor in false and name is LA NACION', () => {
        const properties = {
            ...props,
            distributor: { name: 'LA NACION' },
            credits: { by: [] },
            subtype: NOTICIA
        };

        render(<ExternalSignature globalContent={properties} />);
        const comLinkElement = screen.queryByRole('link');
        expect(comLinkElement).toBeNull();
        expect(screen.getByText('LA NACION')).toBeInTheDocument();
    });

    it('Test for withFirmaDistributor in false and Distributor is Custom', () => {
        const properties = {
            ...props,
            distributor: { name: 'Custom Distributor', mode: 'custom' },
            credits: { by: [] },
            subtype: NOTICIA
        };

        render(<ExternalSignature globalContent={properties} />);
        const comLinkElement = screen.queryByRole('link');
        expect(comLinkElement).toBeNull();
        expect(screen.getByText('Custom Distributor')).toBeInTheDocument();
    });

    it('Does not render for the distributor "lanacionar"', () => {
        const properties = {
            ...props,
            globalContent: {
                distributor: { name: 'lanacionar' }
            }
        };

        const { container } = render(<ExternalSignature {...properties} />);
        expect(container.firstChild).toBeNull();
    });
});
