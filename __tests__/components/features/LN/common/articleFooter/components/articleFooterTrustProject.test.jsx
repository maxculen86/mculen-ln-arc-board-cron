import React from 'react';
import { render, screen } from '@testing-library/react';
import TheTrustProject from '../../../../../../../components/features/LN/common/articleFooter/components/articleFooterTrustProject';

jest.mock('@ln/contenidos-ui-link', () => ({
    Link: ({ children, href, title }) => (
        <a href={href} title={title}>
            {children}
        </a>
    )
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/image/default',
    () =>
        function MockImage({ src, alt, height }) {
            return <img src={src} alt={alt} data-height={height} />;
        }
);

jest.mock(
    '../../../../../../../components/features/ui/ln/icon/default',
    () =>
        function MockIcon({ name }) {
            return <i data-testid="icon" data-name={name} />;
        }
);

describe('TheTrustProject', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when rendered', () => {
        it('should link to the Trust Project page', () => {
            render(
                <TheTrustProject src="/trust.webp" alt="The Trust Project" />
            );

            expect(screen.getByRole('link')).toHaveAttribute(
                'href',
                'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/'
            );
        });

        it('should render the seal image', () => {
            render(
                <TheTrustProject src="/trust.webp" alt="The Trust Project" />
            );

            expect(screen.getByAltText('The Trust Project')).toHaveAttribute(
                'src',
                '/trust.webp'
            );
        });

        it('should default the image height to 20', () => {
            render(
                <TheTrustProject src="/trust.webp" alt="The Trust Project" />
            );

            expect(screen.getByAltText('The Trust Project')).toHaveAttribute(
                'data-height',
                '20'
            );
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with default props', () => {
            const { asFragment } = render(
                <TheTrustProject src="/trust.webp" alt="The Trust Project" />
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
