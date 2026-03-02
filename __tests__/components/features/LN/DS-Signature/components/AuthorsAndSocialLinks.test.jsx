import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthorsAndSocialLinks from '../../../../../../components/features/LN/DS-Signature/components/AuthorsAndSocialLinks';

jest.mock('../../../../../../components/features/ui/ln/avatar/default', () =>
    jest.fn(({ imageProps }) => (
        <img src={imageProps?.src} alt={imageProps?.alt} data-testid="avatar" />
    ))
);

jest.mock('../../../../../../components/features/ui/ln/link/default', () =>
    jest.fn(({ href, children, title }) => (
        <a href={href} title={title} data-testid="social-link">
            {children}
        </a>
    ))
);

jest.mock('../../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(({ name }) => <span data-testid={`icon-${name}`} />)
);

describe('components - features - LN - DS-Signature - AuthorsAndSocialLinks', () => {
    const baseProps = {
        photo: 'https://example.com/photo.jpg',
        author: { name: 'Juan Pérez' },
        authorsText: 'Juan Pérez',
        role: 'Periodista',
        socialItems: [],
        shouldShowAuthors: true
    };

    it('returns null when shouldShowAuthors is false', () => {
        const { container } = render(
            <AuthorsAndSocialLinks {...baseProps} shouldShowAuthors={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders author name with Por prefix', () => {
        render(<AuthorsAndSocialLinks {...baseProps} />);
        expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    });

    it('renders role when present', () => {
        render(<AuthorsAndSocialLinks {...baseProps} />);
        expect(screen.getByText('Periodista')).toBeInTheDocument();
    });

    it('does not render role when absent', () => {
        render(<AuthorsAndSocialLinks {...baseProps} role={null} />);
        expect(screen.queryByText('Periodista')).not.toBeInTheDocument();
    });

    it('renders avatar when photo is provided', () => {
        render(<AuthorsAndSocialLinks {...baseProps} />);
        const avatar = screen.getByTestId('avatar');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', 'https://example.com/photo.jpg');
        expect(avatar).toHaveAttribute('alt', 'Juan Pérez');
    });

    it('does not render avatar when photo is absent', () => {
        render(<AuthorsAndSocialLinks {...baseProps} photo={null} />);
        expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
    });

    it('does not render authorsText when absent', () => {
        render(<AuthorsAndSocialLinks {...baseProps} authorsText={null} />);
        expect(screen.queryByText(/Juan Pérez/)).not.toBeInTheDocument();
    });

    it('renders social links when provided', () => {
        const socialItems = [
            {
                icon: 'twitter',
                url: 'https://twitter.com/user',
                label: 'Twitter'
            },
            {
                icon: 'instagram',
                url: 'https://instagram.com/user',
                label: 'Instagram'
            }
        ];
        render(
            <AuthorsAndSocialLinks {...baseProps} socialItems={socialItems} />
        );
        const links = screen.getAllByTestId('social-link');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', 'https://twitter.com/user');
        expect(links[1]).toHaveAttribute('href', 'https://instagram.com/user');
    });

    it('does not render social links container when socialItems is empty', () => {
        render(<AuthorsAndSocialLinks {...baseProps} socialItems={[]} />);
        expect(screen.queryByTestId('social-link')).not.toBeInTheDocument();
    });

    it('renders correct icon for each social link', () => {
        const socialItems = [
            {
                icon: 'twitter',
                url: 'https://twitter.com/user',
                label: 'Twitter'
            }
        ];
        render(
            <AuthorsAndSocialLinks {...baseProps} socialItems={socialItems} />
        );
        expect(screen.getByTestId('icon-twitter')).toBeInTheDocument();
    });
});
