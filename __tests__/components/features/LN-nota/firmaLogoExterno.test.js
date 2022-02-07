import React from 'react';
import { mount } from 'enzyme';
import FirmaLogoExterno from '../../../../components/features/LN-nota/firmaLogoExterno';
import ComPartner from '../../../../components/private/common/com-partner';
import ComLink from '../../../../components/private/common/com-link';
import {
    HTMLLIBRE,
    RECETA,
    NOTICIA
} from '..//../../../components/private/common/utils/subtypes/subtypeHelper';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:static', () => 'mock-static');
Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

// jest.mock('fusion:static', () => 'mock-static');

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
        const FirmaLogoExternoComponent = mount(
            <FirmaLogoExterno globalContent={props} />
        );
        expect(FirmaLogoExternoComponent).toEqual({});
    });

    it('Test return component ComPartner La Nacion Recetas', () => {
        const properties = {
            ...props,
            credits: { by: [] }
        };
        const FirmaLogoExternoComponent = mount(
            <FirmaLogoExterno globalContent={properties} />
        );
        const ComPartnerComponent = (
            <ComPartner size="--xs">Por LA NACION recetas</ComPartner>
        );
        expect(
            FirmaLogoExternoComponent.containsMatchingElement(
                ComPartnerComponent
            )
        ).toBeTruthy();
    });

    it('Test of return subtype = RECETA and by.lenth > 0', () => {
        const properties = {
            ...props,
            distributor: { name: 'lanacionar' }
        };
        const FirmaLogoExternoComponent = mount(
            <FirmaLogoExterno globalContent={properties} />
        );
        console.log(FirmaLogoExternoComponent);
        expect(FirmaLogoExternoComponent).toEqual({});
    });

    it('Test of return for HTMLLIBRE', () => {
        const properties = {
            ...props,
            distributor: { name: 'BBC Mundo' },
            subtype: HTMLLIBRE
        };
        const FirmaLogoExternoComponent = mount(
            <FirmaLogoExterno globalContent={properties} />
        );
        const ComPartnerComponent = (
            <ComPartner size="--xs">BBC Mundo</ComPartner>
        );
        expect(
            FirmaLogoExternoComponent.containsMatchingElement(
                ComPartnerComponent
            )
        ).toBeTruthy();
    });

    it('Test for withFirmaDistributor in false', () => {
        const properties = {
            ...props,
            distributor: { name: 'BBC' },
            subtype: NOTICIA
        };
        const FirmaLogoExternoComponent = mount(
            <FirmaLogoExterno globalContent={properties} />
        );
        expect(FirmaLogoExternoComponent.find(ComLink).exists()).toBeTruthy();
    });

    it('Test return default', () => {
        const properties = {
            ...props,
            distributor: { name: 'BBC' },
            subtype: NOTICIA,
            withFirmaDistributor: true
        };
        const FirmaLogoExternoComponent = mount(
            <FirmaLogoExterno globalContent={properties} />
        );
        expect(
            FirmaLogoExternoComponent.find('mock-static').exists()
        ).toBeTruthy();
    });

    it('Test return with properties undefined', () => {
        const FirmaLogoExternoComponent = mount(<FirmaLogoExterno />);
        expect(
            FirmaLogoExternoComponent.find('mock-static').exists()
        ).toBeTruthy();
    });
});
