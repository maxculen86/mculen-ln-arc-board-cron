import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterLinksSection } from '../../../../../../../components/features/LN/common/footer/components/FooterLinksSection';

jest.mock(
    '../../../../../../../components/features/ui/ln/link/default',
    () =>
        ({ children, ...props }) => <a {...props}>{children}</a>
);

jest.mock(
    '../../../../../../../components/features/ui/ln/icon/default',
    () =>
        ({ children, ...props }) => <div {...props}>{children}</div>
);

jest.mock(
    '../../../../../../../components/features/LN/common/footer/components/FooterLinkColumn',
    () => ({
        FooterLinkColumn: jest.fn(({ title, items }) => (
            <div data-testid="footer-link-column">
                {title && <p>{title}</p>}
                {items?.map(item => (
                    <span key={item.id}>{item.text}</span>
                ))}
            </div>
        ))
    })
);

describe('FooterLinksSection', () => {
    const mockLinksData = {
        secciones: {
            left: [{ id: 'economia', text: 'Economía', href: '/economia/' }],
            right: [{ id: 'politica', text: 'Política', href: '/politica/' }]
        },
        revistas: [{ id: 'revista1', text: 'Revista 1', href: '/revista1/' }],
        productos: [
            { id: 'producto1', text: 'Producto 1', href: '/producto1/' }
        ],
        masInformacion: [{ id: 'info1', text: 'Info 1', href: '/info1/' }]
    };

    const mockSocialNetworksData = [
        {
            title: 'Facebook',
            href: 'https://www.facebook.com/lanacion',
            name: 'facebook'
        },
        { title: 'X', href: 'https://x.com/LANACION/', name: 'x' }
    ];

    const mockFooterImages = {
        storesAndroid: 'android-icon',
        storesIos: 'ios-icon'
    };

    it('should render social networks and app download sections', () => {
        render(
            <FooterLinksSection
                linksData={mockLinksData}
                socialNetworksData={mockSocialNetworksData}
                footerImages={mockFooterImages}
            />
        );

        expect(screen.getByText('Redes sociales')).toBeInTheDocument();
        expect(screen.getByText('Descargá la app')).toBeInTheDocument();
        expect(screen.getByTitle('Seguirnos en Facebook')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <FooterLinksSection
                linksData={mockLinksData}
                socialNetworksData={mockSocialNetworksData}
                footerImages={mockFooterImages}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
