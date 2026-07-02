import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningAddons from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningAddons';

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        deployment: path => path,
        contextPath: '/pf'
    })
}));

jest.mock('@ln/ds-common-divider', () => ({
    Divider: ({ direction, className }) => (
        <hr
            data-testid="divider"
            data-direction={direction}
            className={className}
        />
    )
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/link/default',
    () =>
        ({ href, title, children, target, rel }) => (
            <a href={href} title={title} target={target} rel={rel}>
                {children}
            </a>
        )
);

jest.mock(
    '../../../../../../../components/private/common/utils/get',
    () => (obj, path, fallback) => {
        const keys = path.split('.');
        const value = keys.reduce((acc, key) => acc?.[key], obj);
        return value !== undefined ? value : fallback;
    }
);

jest.mock(
    '../../../../../../../components/private/common/utils/sectionUtils',
    () => ({
        dictionaryAlt: { 'nacion-negocios': 'Negocios' },
        getSectionLogo: (sections, layout, distributorName) => {
            if (!sections?.length) return null;
            return sections[0]?._mockedLogo || null;
        },
        getAFondoLogo: (tags, layout) => {
            return tags?.[0]?._mockedAFondoLogo || null;
        },
        getCustomSectionLogo: ({ sections } = {}) =>
            sections?.[0]?._mockedCustomLogo || null
    })
);

jest.mock(
    '../../../../../../../components/private/common/utils/getTargetAndRelIfExternal',
    () => isExternal =>
        isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : { target: undefined, rel: undefined }
);

jest.mock(
    '../../../../../../../components/private/LN/common/utils/pageReferrer',
    () => ({
        appendPageReferrerParam: path => `${path}?ref=page`
    })
);

const renderComponent = (props = {}) => render(<OpeningAddons {...props} />);

const makeGlobalContent = ({
    sections = [],
    tags = [],
    isSponsored = false,
    advertiser = '',
    contentCode = '',
    distributorName = 'LA NACION'
} = {}) => ({
    taxonomy: { sections, tags },
    distributor: { name: distributorName },
    owner: { sponsored: isSponsored },
    label: { marca_anunciante: { text: advertiser } },
    content_restrictions: { content_code: contentCode }
});

const withLogo = logoData => [{ _mockedLogo: logoData }];
const withAFondo = logoData => [{ _mockedAFondoLogo: logoData }];

describe('OpeningAddons', () => {
    describe('When no addons are available', () => {
        it('Render null when globalContent is empty', () => {
            const { container } = renderComponent({
                globalContent: makeGlobalContent()
            });
            expect(container.firstChild).toBeNull();
        });

        it('Render null when the logo does not exist and there is no special content', () => {
            const { container } = renderComponent({
                globalContent: makeGlobalContent({
                    sections: [{ _mockedLogo: null }]
                })
            });
            expect(container.firstChild).toBeNull();
        });
    });

    describe('Logo Sponsor', () => {
        it('Render logo without link when path is empty', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                })
            });

            renderComponent({ globalContent });

            const img = screen.getByAltText('Negocios');
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute(
                'src',
                '/pf/resources/images/nacion-negocios.svg'
            );
            expect(img.closest('a')).toBeNull();
        });

        it('Render logo with link when path is available', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '/negocios',
                    color: true
                })
            });

            renderComponent({ globalContent });

            const link = screen.getByRole('link', { name: 'Negocios' });
            expect(link).toHaveAttribute('href', '/negocios?ref=page');
            expect(
                screen.getByRole('img', { name: 'Negocios' })
            ).toBeInTheDocument();
        });

        it('Open in new tab when the logo is external', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: 'https://externo.com',
                    color: true,
                    isExternal: true
                })
            });

            renderComponent({ globalContent });

            const link = screen.getByRole('link', { name: 'Negocios' });
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('Use white version of the logo when color is false', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: false
                })
            });

            renderComponent({ globalContent });

            expect(screen.getByAltText('Negocios')).toHaveAttribute(
                'src',
                '/pf/resources/images/nacion-negocios-blanco.svg'
            );
        });

        it('Use logo with color in image-panoramic, ignoring color:false', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: false
                })
            });

            renderComponent({ globalContent, diagram: 'image-panoramic' });

            expect(screen.getByAltText('Negocios')).toHaveAttribute(
                'src',
                '/pf/resources/images/nacion-negocios.svg'
            );
        });

        it('prioritize the "A Fondo" logo over the section logo', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                }),
                tags: withAFondo({ logoName: 'afondo', path: '', color: true })
            });

            renderComponent({ globalContent });

            expect(screen.queryByAltText('Negocios')).toBeNull();
            expect(screen.getByAltText('afondo')).toBeInTheDocument();
        });
    });

    describe('Content Lab', () => {
        it('No render Content Lab if isSponsored is false, even if there is an advertiser', () => {
            const globalContent = makeGlobalContent({
                isSponsored: false,
                advertiser: 'MarcaX'
            });

            renderComponent({ globalContent });

            expect(screen.queryByText(/Content LAB/)).toBeNull();
        });

        it('No render Content Lab if isSponsored is true but there is no advertiser', () => {
            const globalContent = makeGlobalContent({
                isSponsored: true,
                advertiser: ''
            });

            renderComponent({ globalContent });

            expect(screen.queryByText(/Content LAB/)).toBeNull();
        });

        it('Render Content Lab with the advertiser name when appropriate', () => {
            const globalContent = makeGlobalContent({
                isSponsored: true,
                advertiser: 'MarcaX'
            });

            renderComponent({ globalContent });

            expect(
                screen.getByText('Content LAB para MarcaX')
            ).toBeInTheDocument();
        });

        it('Trim whitespace from advertiser', () => {
            const globalContent = makeGlobalContent({
                isSponsored: true,
                advertiser: '  MarcaX  '
            });

            renderComponent({ globalContent });

            expect(
                screen.getByText('Content LAB para MarcaX')
            ).toBeInTheDocument();
        });
    });

    describe('Badge of suscriptores', () => {
        it('No render badge if content_code is no equal to "cerrada"', () => {
            const globalContent = makeGlobalContent({ contentCode: 'abierta' });

            renderComponent({ globalContent });

            expect(screen.queryByText('Suscriptores')).toBeNull();
        });

        it('Render badge when content_code is "cerrada"', () => {
            const globalContent = makeGlobalContent({ contentCode: 'cerrada' });

            renderComponent({ globalContent });

            expect(screen.getByText('Suscriptores')).toBeInTheDocument();
        });

        it('Render badge without white background (no bg-light-50)', () => {
            const globalContent = makeGlobalContent({ contentCode: 'cerrada' });

            const { container } = renderComponent({ globalContent });

            expect(
                container.querySelector('.bg-light-50')
            ).not.toBeInTheDocument();
        });

        it('Use the light text color over the image by default', () => {
            const globalContent = makeGlobalContent({ contentCode: 'cerrada' });

            renderComponent({ globalContent });

            const badge = screen.getByTitle(
                'Este es un contenido cerrado a suscriptores'
            );
            expect(badge).toHaveClass('text-neutral-1');
            expect(badge).not.toHaveClass('text-base-default');
        });

        it('Invert to a dark text color in the panoramic diagram (white background)', () => {
            const globalContent = makeGlobalContent({ contentCode: 'cerrada' });

            renderComponent({ globalContent, diagram: 'image-panoramic' });

            const badge = screen.getByTitle(
                'Este es un contenido cerrado a suscriptores'
            );
            expect(badge).toHaveClass('text-base-default');
            expect(badge).not.toHaveClass('text-neutral-1');
        });

        it('Render badge with the accessible subscriber title', () => {
            const globalContent = makeGlobalContent({ contentCode: 'cerrada' });

            renderComponent({ globalContent });

            expect(
                screen.getByTitle('Este es un contenido cerrado a suscriptores')
            ).toBeInTheDocument();
        });
    });

    describe('dividers between addons', () => {
        it('No render divider with only addon', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                })
            });

            renderComponent({ globalContent });

            expect(screen.queryByTestId('divider')).toBeNull();
        });

        it('Render divider between sponsor and Content Lab', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                }),
                isSponsored: true,
                advertiser: 'MarcaX'
            });

            renderComponent({ globalContent });

            expect(screen.getAllByTestId('divider')).toHaveLength(1);
        });

        it('Render divider between Content Lab and subscriber badge', () => {
            const globalContent = makeGlobalContent({
                isSponsored: true,
                advertiser: 'MarcaX',
                contentCode: 'cerrada'
            });

            renderComponent({ globalContent });

            expect(screen.getAllByTestId('divider')).toHaveLength(1);
        });

        it('Render two dividers when there is a sponsor, Content Lab and badge', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                }),
                isSponsored: true,
                advertiser: 'MarcaX',
                contentCode: 'cerrada'
            });

            renderComponent({ globalContent });

            expect(screen.getAllByTestId('divider')).toHaveLength(2);
        });

        it('Keep dividers visible on mobile when there is a subscriber badge', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                }),
                contentCode: 'cerrada'
            });

            renderComponent({ globalContent });

            expect(screen.getByTestId('divider')).not.toHaveClass('hidden');
        });

        it('Hide dividers on mobile when there is no subscriber badge', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                }),
                isSponsored: true,
                advertiser: 'MarcaX'
            });

            renderComponent({ globalContent });

            expect(screen.getByTestId('divider')).toHaveClass('hidden');
            expect(screen.getByTestId('divider')).toHaveClass('md:block');
        });

        it('Render dividers vertical', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                }),
                isSponsored: true,
                advertiser: 'MarcaX'
            });

            renderComponent({ globalContent });

            screen.getAllByTestId('divider').forEach(divider => {
                expect(divider).toHaveAttribute('data-direction', 'vertical');
            });
        });
    });

    describe('classnames y layout', () => {
        it('Apply classnames.container in wrapper when prop exists', () => {
            const globalContent = makeGlobalContent({ contentCode: 'cerrada' });

            const { container } = renderComponent({
                globalContent,
                classnames: { container: 'mi-clase-custom' }
            });

            expect(container.firstChild).toHaveClass('mi-clase-custom');
        });

        it('Lay out addons in a row (no stacking) when there is a subscriber badge', () => {
            const globalContent = makeGlobalContent({ contentCode: 'cerrada' });

            const { container } = renderComponent({ globalContent });

            expect(container.firstChild).not.toHaveClass('flex-col');
        });

        it('Stack addons on mobile when there is no subscriber badge', () => {
            const globalContent = makeGlobalContent({
                sections: withLogo({
                    logoName: 'nacion-negocios',
                    path: '',
                    color: true
                }),
                isSponsored: true,
                advertiser: 'MarcaX'
            });

            const { container } = renderComponent({ globalContent });

            expect(container.firstChild).toHaveClass('flex-col');
            expect(container.firstChild).toHaveClass('md:flex-row');
        });

        it('Apply classnames.contentLab in span of Content Lab when prop exists', () => {
            const globalContent = makeGlobalContent({
                isSponsored: true,
                advertiser: 'MarcaX'
            });

            renderComponent({
                globalContent,
                classnames: { contentLab: 'clase-content-lab' }
            });

            expect(screen.getByText('Content LAB para MarcaX')).toHaveClass(
                'clase-content-lab'
            );
        });
    });

    describe('snapshots', () => {
        it('snapshot ', () => {
            const globalContent = makeGlobalContent({
                contentCode: 'cerrada'
            });
            const { container } = renderComponent({ globalContent });
            expect(container).toMatchSnapshot();
        });
    });
});
