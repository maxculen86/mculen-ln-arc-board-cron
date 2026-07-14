import React from 'react';
import { render, screen } from '@testing-library/react';
import SubNavHeader from '../../../../../../components/features/LN/DS-SubNav/components/SubNavHeader';

describe('Components - features - LN - DS-SubNav - SubNavHeader', () => {
    const imageProps = { src: '/logo.png', width: 120, height: 40 };

    describe('when neither logo nor title are available', () => {
        it('should render nothing', () => {
            const { container } = render(<SubNavHeader />);
            expect(container).toBeEmptyDOMElement();
        });

        it('should render nothing when hasLogo is false and titleText is empty', () => {
            const { container } = render(
                <SubNavHeader hasLogo={false} titleText="" />
            );
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when there is a title and no logo', () => {
        it('should render the title link', () => {
            render(<SubNavHeader titleText="Economía" url="/economia/" />);
            expect(
                screen.getByRole('link', { name: 'Economía' })
            ).toBeInTheDocument();
        });

        it('should point the link to the given url', () => {
            render(<SubNavHeader titleText="Economía" url="/economia/" />);
            expect(screen.getByRole('link')).toHaveAttribute(
                'href',
                '/economia/'
            );
        });

        it('should set an accessible title attribute on the link', () => {
            render(<SubNavHeader titleText="Economía" url="/economia/" />);
            expect(screen.getByRole('link')).toHaveAttribute(
                'title',
                'Ir a Economía'
            );
        });

        it('should not render an image', () => {
            render(<SubNavHeader titleText="Economía" url="/economia/" />);
            expect(screen.queryByRole('img')).not.toBeInTheDocument();
        });
    });

    describe('when hasLogo is true', () => {
        it('should render the logo image with the title as alt text', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(screen.getByAltText('Propiedades')).toBeInTheDocument();
        });

        it('should render the logo with the provided src', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(screen.getByAltText('Propiedades')).toHaveAttribute(
                'src',
                '/logo.png'
            );
        });

        it('should not render the title link when the logo is shown', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(screen.queryByRole('link')).not.toBeInTheDocument();
        });

        it('should cap the logo height responsively (max-h-46/md:max-h-70/lg:max-h-90) so it never grows past the header nor leaves empty space', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(screen.getByAltText('Propiedades')).toHaveClass(
                'max-h-46',
                'md:max-h-70',
                'lg:max-h-90'
            );
        });

        it('should keep the logo width intrinsic (w-auto) so it is not stretched to the container', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(screen.getByAltText('Propiedades')).toHaveClass('w-auto');
        });

        it('should not force w-full/h-full on the logo, which would upscale it and cause layout shift', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            const logo = screen.getByAltText('Propiedades');
            expect(logo).not.toHaveClass('w-full');
            expect(logo).not.toHaveClass('h-full');
        });

        it('should pass the intrinsic width and height so the browser reserves space by aspect-ratio before load, avoiding layout shift', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            const logo = screen.getByAltText('Propiedades');
            expect(logo).toHaveAttribute('width', '120');
            expect(logo).toHaveAttribute('height', '40');
        });

        it('should render the header directly without wrapping it in a Fusion <Static>, whose client-side detach/reinsert made the logo flicker', () => {
            const { container } = render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            // Static (mocked as a <div> wrapper) would make the root a <div>;
            // the header must render the <h1> as its own root.
            expect(container.firstChild.tagName).toBe('H1');
        });

        it('should set a definite height so space is reserved before load, overriding the data-tw preflight img{height:auto} that would otherwise collapse the box', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(screen.getByAltText('Propiedades')).toHaveStyle({
                height: '40px'
            });
        });

        it('should load the logo eagerly since it is above the fold', () => {
            render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(screen.getByAltText('Propiedades')).toHaveAttribute(
                'loading',
                'eager'
            );
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with the title link', () => {
            const { asFragment } = render(
                <SubNavHeader titleText="Economía" url="/economia/" />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with the logo', () => {
            const { asFragment } = render(
                <SubNavHeader
                    hasLogo
                    titleText="Propiedades"
                    imageProps={imageProps}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot when it renders nothing', () => {
            const { asFragment } = render(<SubNavHeader />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
