import React from 'react';
import { render, screen } from '@testing-library/react';
import LogoImage from '../../../../../../components/features/ui/ln/logoImage/default';

describe('components - feature - ui - ln - logoBase - default', () => {
    describe('when src is empty or not provided', () => {
        it('should return null when src is an empty string', () => {
            const { container } = render(
                <LogoImage src="" logoName="la-nacion" />
            );
            expect(container.firstChild).toBeNull();
        });

        it('should return null when src is undefined', () => {
            const { container } = render(<LogoImage logoName="la-nacion" />);
            expect(container.firstChild).toBeNull();
        });
    });

    describe('without href — renders img directly', () => {
        it('should render an img with the correct src', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                />
            );
            expect(
                screen.getByRole('img', { name: 'La Nacion' })
            ).toHaveAttribute('src', '/resources/images/la-nacion.svg');
        });

        it('should render img with empty alt by default', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                />
            );
            // alt="" → ARIA role is "presentation", not "img" → use getByAltText
            expect(screen.getByAltText('')).toBeInTheDocument();
        });

        it('should not wrap in an anchor when href is not provided', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                />
            );
            expect(
                screen.getByRole('img', { name: 'La Nacion' }).closest('a')
            ).toBeNull();
        });

        it('should apply width and height for size sm (default)', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                />
            );
            expect(screen.getByRole('img', { name: 'La Nacion' })).toHaveStyle({
                width: '215px',
                height: '21px'
            });
        });

        it('should apply width and height for size xs when size="xs" is passed', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    size="xs"
                />
            );
            expect(screen.getByRole('img', { name: 'La Nacion' })).toHaveStyle({
                width: '164px',
                height: '16px'
            });
        });

        it('should use width "auto" when the logo does not define w for that size', () => {
            render(
                <LogoImage
                    src="/resources/images/futuria.svg"
                    logoName="futuria"
                    alt="Futuria"
                    size="sm"
                />
            );
            expect(screen.getByRole('img', { name: 'Futuria' })).toHaveStyle({
                width: 'auto',
                height: '48px'
            });
        });

        it('should not include height in style when the logo does not define h', () => {
            render(
                <LogoImage
                    src="/resources/images/unknown.svg"
                    logoName="unknown-logo"
                    alt="Unknown"
                />
            );
            const img = screen.getByRole('img', { name: 'Unknown' });
            expect(img).toHaveStyle({ width: 'auto' });
            expect(img.style.height).toBe('');
        });
    });

    describe('with href — wraps in anchor', () => {
        it('should render an anchor with the correct href', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    href="/seccion/negocios"
                />
            );
            expect(
                screen.getByRole('link', { name: 'La Nacion' })
            ).toHaveAttribute('href', '/seccion/negocios');
        });

        it('should pass target to the anchor', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    href="https://ext.com"
                    target="_blank"
                />
            );
            expect(
                screen.getByRole('link', { name: 'La Nacion' })
            ).toHaveAttribute('target', '_blank');
        });

        it('should pass rel to the anchor', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    href="https://ext.com"
                    rel="noopener noreferrer"
                />
            );
            expect(
                screen.getByRole('link', { name: 'La Nacion' })
            ).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('should still apply the correct style to img when inside an anchor', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    href="/negocios"
                />
            );
            expect(screen.getByRole('img', { name: 'La Nacion' })).toHaveStyle({
                width: '215px',
                height: '21px'
            });
        });
    });

    describe('logoName resolution', () => {
        it('should apply the same dimensions for -blanco variant as the base logo', () => {
            const { rerender } = render(
                <LogoImage
                    src="/resources/images/hola.svg"
                    logoName="hola"
                    alt="Hola"
                />
            );
            const baseStyle = screen
                .getByRole('img', { name: 'Hola' })
                .getAttribute('style');

            rerender(
                <LogoImage
                    src="/resources/images/hola-blanco.svg"
                    logoName="hola-blanco"
                    alt="Hola"
                />
            );
            expect(
                screen.getByRole('img', { name: 'Hola' }).getAttribute('style')
            ).toBe(baseStyle);
        });

        it('should resolve alias "lnmas-blanco" to "ln-mas" dimensions', () => {
            render(
                <LogoImage
                    src="/resources/images/lnmas-blanco.svg"
                    logoName="lnmas-blanco"
                    alt="LN+"
                />
            );
            expect(screen.getByRole('img', { name: 'LN+' })).toHaveStyle({
                width: '44px',
                height: '26px'
            });
        });

        it('should use width auto and no height for an unknown logoName', () => {
            render(
                <LogoImage
                    src="/resources/images/unknown.svg"
                    logoName="unknown"
                    alt="Unknown"
                />
            );
            const img = screen.getByRole('img', { name: 'Unknown' });
            expect(img).toHaveStyle({ width: 'auto' });
            expect(img.style.height).toBe('');
        });
    });

    describe('default img attributes', () => {
        // React 19 preloads images without fetchpriority="low" + loading="lazy"; these defaults prevent unnecessary preloads
        it('should have loading="lazy" by default', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                />
            );
            expect(
                screen.getByRole('img', { name: 'La Nacion' })
            ).toHaveAttribute('loading', 'lazy');
        });

        it('should have fetchpriority="low" by default', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                />
            );
            expect(
                screen.getByRole('img', { name: 'La Nacion' })
            ).toHaveAttribute('fetchpriority', 'low');
        });
    });

    describe('additional props forwarding', () => {
        it('should forward imgProps to the img element', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    imgProps={{ 'data-testid': 'logo-img', loading: 'lazy' }}
                />
            );
            expect(screen.getByTestId('logo-img')).toHaveAttribute(
                'loading',
                'lazy'
            );
        });

        it('should forward anchorProps to the anchor element', () => {
            render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    href="/negocios"
                    anchorProps={{ 'data-testid': 'logo-link', tabIndex: -1 }}
                />
            );
            expect(screen.getByTestId('logo-link')).toHaveAttribute(
                'tabindex',
                '-1'
            );
        });
    });

    describe('snapshots', () => {
        it('should match snapshot for img with known dimensions', () => {
            const { asFragment } = render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot for img wrapped in anchor with target and rel', () => {
            const { asFragment } = render(
                <LogoImage
                    src="/resources/images/la-nacion.svg"
                    logoName="la-nacion"
                    alt="La Nacion"
                    href="https://ext.com"
                    target="_blank"
                    rel="noopener noreferrer"
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot when src is empty (returns null)', () => {
            const { asFragment } = render(
                <LogoImage src="" logoName="la-nacion" alt="La Nacion" />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot for img with unknown logoName', () => {
            const { asFragment } = render(
                <LogoImage
                    src="/resources/images/unknown.svg"
                    logoName="unknown"
                    alt="Unknown"
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
