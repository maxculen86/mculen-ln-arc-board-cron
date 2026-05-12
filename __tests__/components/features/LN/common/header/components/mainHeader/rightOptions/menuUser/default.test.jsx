import React from 'react';
import { render, screen } from '@testing-library/react';
import { useHeaderContext } from '../../../../../../../../../../components/features/LN/common/header/context';
import MenuUser from '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/menuUser/default';

jest.mock('@ln/ds-common-dropdown', () => {
    function MockDropdown({ children }) {
        return <div data-testid="dropdown">{children}</div>;
    }
    function MockTrigger({ children }) {
        return <div data-testid="dropdown-trigger">{children}</div>;
    }
    // eslint-disable-next-line no-unused-vars
    function MockContent({
        children,
        className,
        autoFocus,
        customWidth,
        customWrapper,
        ...props
    }) {
        return (
            <div
                data-testid="dropdown-content"
                className={className}
                {...props}
            >
                {children}
            </div>
        );
    }
    MockDropdown.Trigger = MockTrigger;
    MockDropdown.Content = MockContent;
    return { Dropdown: MockDropdown };
});

jest.mock(
    '../../../../../../../../../../components/features/LN/common/header/context',
    () => ({
        useHeaderContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/helpers',
    () => ({
        linkOptions: [
            {
                href: '/mis-notas/',
                target: '_self',
                text: 'Mis notas',
                onClick: jest.fn()
            },
            {
                href: '/mi-cuenta/',
                target: '_self',
                text: 'Mi cuenta',
                onClick: jest.fn()
            }
        ],
        buttonLogout: {
            text: 'Cerrar sesión',
            title: 'Cerrar sesión',
            onClick: jest.fn()
        }
    })
);

jest.mock(
    '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/menuUser/Avatar',
    () =>
        function MockAvatar() {
            return <div data-testid="avatar" />;
        }
);

jest.mock(
    '../../../../../../../../../../components/features/ui/ln/icon/default',
    () =>
        function MockIcon({ name }) {
            return <span data-testid={`icon-${name}`} />;
        }
);

jest.mock(
    '../../../../../../../../../../components/features/ui/ln/link/default',
    () =>
        // eslint-disable-next-line no-unused-vars
        function MockLink({ children, asChild, color, weight, ...props }) {
            return <a {...props}>{children}</a>;
        }
);

jest.mock(
    '../../../../../../../../../../components/features/ui/ln/divider/default',
    () =>
        function MockDivider() {
            return <hr data-testid="divider" />;
        }
);

describe('MenuUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when userType is UNLOGGED', () => {
        it('should return null', () => {
            useHeaderContext.mockReturnValue({ userType: 'unlogged' });

            const { container } = render(<MenuUser />);

            expect(container.firstChild).toBeNull();
        });
    });

    describe('when userType is LOGGED', () => {
        beforeEach(() => {
            useHeaderContext.mockReturnValue({ userType: 'logged' });
        });

        it('should render the Dropdown', () => {
            render(<MenuUser />);

            expect(screen.getByTestId('dropdown')).toBeTruthy();
        });

        it('should render the Avatar component', () => {
            render(<MenuUser />);

            expect(screen.getByTestId('avatar')).toBeTruthy();
        });

        it('should render the arrow-down icon', () => {
            render(<MenuUser />);

            expect(screen.getByTestId('icon-arrow-down')).toBeTruthy();
        });

        it('should render all link options', () => {
            render(<MenuUser />);

            expect(screen.getByText('Mis notas')).toBeTruthy();
            expect(screen.getByText('Mi cuenta')).toBeTruthy();
        });

        it('should render the logout button', () => {
            render(<MenuUser />);

            expect(screen.getByText('Cerrar sesión')).toBeTruthy();
        });

        it('should render the divider between links and logout', () => {
            render(<MenuUser />);

            expect(screen.getByTestId('divider')).toBeTruthy();
        });

        it('should have outline-none class on dropdown content', () => {
            render(<MenuUser />);

            expect(screen.getByTestId('dropdown-content').className).toContain(
                'outline-none'
            );
        });
    });

    describe('when userType is SUBSCRIBED', () => {
        it('should render the Dropdown without returning null', () => {
            useHeaderContext.mockReturnValue({ userType: 'subscribed' });

            const { container } = render(<MenuUser />);

            expect(container.firstChild).not.toBeNull();
        });
    });

    describe('when userType is LOADING', () => {
        it('should render the Dropdown without returning null', () => {
            useHeaderContext.mockReturnValue({ userType: 'loading' });

            const { container } = render(<MenuUser />);

            expect(container.firstChild).not.toBeNull();
        });
    });

    describe('snapshots', () => {
        it('should match snapshot when UNLOGGED', () => {
            useHeaderContext.mockReturnValue({ userType: 'unlogged' });

            const { container } = render(<MenuUser />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot when LOGGED', () => {
            useHeaderContext.mockReturnValue({ userType: 'logged' });

            const { container } = render(<MenuUser />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot when SUBSCRIBED', () => {
            useHeaderContext.mockReturnValue({ userType: 'subscribed' });

            const { container } = render(<MenuUser />);

            expect(container).toMatchSnapshot();
        });
    });
});
