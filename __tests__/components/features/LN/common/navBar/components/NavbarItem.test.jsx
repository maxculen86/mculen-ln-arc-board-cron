import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavbarItem from '../../../../../../../components/features/LN/common/navBar/components/NavbarItem';

describe('components - features - LN - common - navBar - components - NavbarItem', () => {
    describe('NavbarItem with href', () => {
        const defaultProps = {
            iconName: 'home',
            href: 'https://www.lanacion.com.ar/',
            text: 'Inicio',
            color: 'primary'
        };

        it('renders correctly with href', () => {
            render(<NavbarItem {...defaultProps} />);

            const link = screen.getByRole('link');
            expect(link).toHaveAttribute(
                'href',
                'https://www.lanacion.com.ar/'
            );
            expect(screen.getByText('Inicio')).toBeInTheDocument();
        });

        it('renders icon and text', () => {
            render(<NavbarItem {...defaultProps} />);

            expect(screen.getByText('Inicio')).toBeInTheDocument();
        });

        it('handles onClick when href is present', () => {
            const handleClick = jest.fn();
            render(<NavbarItem {...defaultProps} onClick={handleClick} />);

            const link = screen.getByText('Inicio').closest('a');
            fireEvent.click(link);

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('passes target attribute correctly', () => {
            render(<NavbarItem {...defaultProps} target="_blank" />);

            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('target', '_blank');
        });

        it('applies custom className correctly', () => {
            const { container } = render(<NavbarItem {...defaultProps} />);

            const link = container.querySelector('a');
            expect(link).toHaveClass(
                'flex',
                'items-center',
                'justify-center',
                'flex-col',
                'gap-8'
            );
        });
    });

    describe('NavbarItem with onClick only (button)', () => {
        const buttonProps = {
            iconName: 'fuction',
            text: 'Secciones',
            onClick: jest.fn(),
            color: 'default'
        };

        it('renders as button when only onClick is provided', () => {
            render(<NavbarItem {...buttonProps} />);

            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            expect(button).toHaveAttribute('type', 'button');
        });

        it('handles button click correctly', () => {
            const handleClick = jest.fn();
            render(<NavbarItem {...buttonProps} onClick={handleClick} />);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('renders icon and text in button', () => {
            render(<NavbarItem {...buttonProps} />);

            expect(screen.getByText('Secciones')).toBeInTheDocument();
        });

        it('applies correct styling to button wrapper', () => {
            render(<NavbarItem {...buttonProps} />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass(
                'flex',
                'items-center',
                'justify-center',
                'flex-col',
                'gap-8'
            );
        });
    });

    describe('NavbarItem with different colors', () => {
        it('applies primary color', () => {
            const { container } = render(
                <NavbarItem
                    iconName="home"
                    href="/home"
                    text="Home"
                    color="primary"
                />
            );

            expect(container.querySelector('a')).toBeInTheDocument();
            expect(screen.getByText('Home')).toBeInTheDocument();
        });

        it('applies default color', () => {
            const { container } = render(
                <NavbarItem
                    iconName="user"
                    href="/profile"
                    text="Profile"
                    color="default"
                />
            );

            expect(container.querySelector('a')).toBeInTheDocument();
            expect(screen.getByText('Profile')).toBeInTheDocument();
        });
    });

    describe('NavbarItem with additional props', () => {
        it('spreads additional props to Link', () => {
            const customProps = {
                iconName: 'home',
                href: '/home',
                text: 'Home',
                color: 'primary',
                'data-testid': 'custom-navbar-item',
                'aria-label': 'Go to home'
            };

            render(<NavbarItem {...customProps} />);

            const link = screen.getByTestId('custom-navbar-item');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('aria-label', 'Go to home');
        });
    });

    describe('NavbarItem snapshots', () => {
        it('should match snapshot - link with href', () => {
            const { container } = render(
                <NavbarItem
                    iconName="home"
                    href="https://www.lanacion.com.ar/"
                    text="Inicio"
                    color="primary"
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot - button with onClick', () => {
            const { container } = render(
                <NavbarItem
                    iconName="fuction"
                    text="Secciones"
                    onClick={jest.fn()}
                    color="default"
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot - link with target blank', () => {
            const { container } = render(
                <NavbarItem
                    iconName="logo-foodit"
                    href="https://www.foodit.com.ar/"
                    target="_blank"
                    text="Foodit"
                    color="default"
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('Edge cases', () => {
        it('renders correctly when both href and onClick are provided', () => {
            const handleClick = jest.fn();
            render(
                <NavbarItem
                    iconName="home"
                    href="/home"
                    onClick={handleClick}
                    text="Home"
                    color="primary"
                />
            );

            // When href is present, it should render as Link (not button)
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('href', '/home');
            fireEvent.click(link);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('handles missing color prop gracefully', () => {
            render(<NavbarItem iconName="home" href="/home" text="Home" />);

            expect(screen.getByText('Home')).toBeInTheDocument();
            expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
        });
    });
});
