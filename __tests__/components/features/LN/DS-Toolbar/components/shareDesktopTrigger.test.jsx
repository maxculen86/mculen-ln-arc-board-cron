import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShareDesktopTrigger, {
    ShareCustomGhostButton
} from '../../../../../../components/features/LN/DS-Toolbar/components/shareDesktopTrigger';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import useShareOptions from '../../../../../../components/features/LN/DS-Toolbar/hooks/useShareOptions';
import isSSR from '../../../../../../components/private/LN/common/utils/isSSR';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://lanacion.com.ar'
}));

jest.mock('../../../../../../properties/sites/la-nacion-ar', () => ({
    host: 'https://lanacion.com.ar'
}));

jest.mock(
    '../../../../../../components/features/LN/DS-Toolbar/_helpers',
    () => ({
        SHARE_OPTIONS: [
            {
                id: 'share_option_link',
                label: ({ copied }) =>
                    copied ? '¡Enlace copiado!' : 'Copiar enlace',
                icon: ({ copied }) => (copied ? 'check' : 'file-copy'),
                color: 'custom',
                className: ({ copied }) =>
                    copied ? 'text-success-default' : 'text-secondary-default'
            },
            {
                id: 'share_option_facebook',
                label: () => 'Facebook',
                icon: () => 'facebook',
                color: 'facebook',
                className: () => ''
            }
        ]
    })
);

jest.mock('@ln/ds-common-dropdown', () => {
    const Trigger = ({ children, onClick, className, title }) => (
        <div
            data-testid="dropdown-trigger"
            onClick={onClick}
            className={className}
            title={title}
        >
            {children}
        </div>
    );

    const Content = ({ children }) => (
        <div data-testid="dropdown-content">{children}</div>
    );

    const DropdownMock = ({ children, open, onOpenChange }) => (
        <div
            data-testid="dropdown"
            data-open={open}
            onClick={() => onOpenChange(!open)}
        >
            {children}
        </div>
    );

    DropdownMock.Trigger = Trigger;
    DropdownMock.Content = Content;

    return { Dropdown: DropdownMock };
});

jest.mock('@ln/ds-common-link', () => ({
    Link: ({ children, onClick, className, iconLeft, color }) => (
        <div
            data-testid="link"
            onClick={onClick}
            className={className}
            data-color={color}
        >
            {iconLeft}
            {children}
        </div>
    )
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../components/features/ui/ln/icon/default',
    () =>
        function Icon({ name, size }) {
            return <span data-testid={`icon-${name}`} data-size={size} />;
        }
);

jest.mock(
    '../../../../../../components/features/ui/ln/button/default',
    () =>
        function Button({ children, onClick, title }) {
            return (
                <button data-testid="button" onClick={onClick} title={title}>
                    {children}
                </button>
            );
        }
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({ addEventToDataLayerV2: jest.fn() })
);

jest.mock('../../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn(() => false)
);

jest.mock(
    '../../../../../../components/features/LN/DS-Toolbar/hooks/useShareOptions',
    () => jest.fn()
);

const defaultProps = {
    isShareOpen: false,
    setIsShareOpen: jest.fn(),
    requestUri: '/nota/test',
    title: 'Título de prueba',
    mobileTitle: 'Título mobile'
};

describe('Components - features - LN - DS-Toolbar - components - shareDesktopTrigger', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        isSSR.mockReturnValue(false);
        useShareOptions.mockReturnValue({
            copied: false,
            handleShareClick: jest.fn()
        });
    });

    describe('ShareCustomGhostButton', () => {
        describe('default rendering', () => {
            it('renders "Compartir" label', () => {
                render(<ShareCustomGhostButton />);

                expect(screen.getByText('Compartir')).toBeInTheDocument();
            });

            it('renders reply icon', () => {
                render(<ShareCustomGhostButton />);

                expect(screen.getByTestId('icon-reply')).toBeInTheDocument();
            });
        });

        describe('when className is provided', () => {
            it('includes the extra className in the container', () => {
                const { container } = render(
                    <ShareCustomGhostButton className="max-xl:hidden" />
                );

                expect(container.firstChild.className).toContain(
                    'max-xl:hidden'
                );
            });
        });
    });

    describe('ShareDesktopTrigger', () => {
        describe('when isSSR returns true', () => {
            it('renders ShareCustomGhostButton with max-xl:hidden class', () => {
                isSSR.mockReturnValue(true);

                const { container } = render(
                    <ShareDesktopTrigger {...defaultProps} />
                );

                expect(container.firstChild.className).toContain(
                    'max-xl:hidden'
                );
            });

            it('does not render Dropdown', () => {
                isSSR.mockReturnValue(true);

                render(<ShareDesktopTrigger {...defaultProps} />);

                expect(
                    screen.queryByTestId('dropdown')
                ).not.toBeInTheDocument();
            });
        });

        describe('when isSSR returns false', () => {
            it('renders the Dropdown component', () => {
                render(<ShareDesktopTrigger {...defaultProps} />);

                expect(screen.getByTestId('dropdown')).toBeInTheDocument();
            });

            it('passes isShareOpen as open prop to Dropdown', () => {
                render(
                    <ShareDesktopTrigger {...defaultProps} isShareOpen={true} />
                );

                expect(screen.getByTestId('dropdown')).toHaveAttribute(
                    'data-open',
                    'true'
                );
            });

            it('renders Dropdown.Trigger with Compartir title', () => {
                render(<ShareDesktopTrigger {...defaultProps} />);

                expect(screen.getByTestId('dropdown-trigger')).toHaveAttribute(
                    'title',
                    'Compartir'
                );
            });

            it('renders Dropdown.Trigger with max-xl:hidden class', () => {
                render(<ShareDesktopTrigger {...defaultProps} />);

                expect(
                    screen.getByTestId('dropdown-trigger').className
                ).toContain('max-xl:hidden');
            });
        });

        describe('datalayer event on trigger click', () => {
            it('calls addEventToDataLayerV2 with correct payload when trigger is clicked', () => {
                render(<ShareDesktopTrigger {...defaultProps} />);

                fireEvent.click(screen.getByTestId('dropdown-trigger'));

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    action: 'toolbar',
                    category: 'nota',
                    label: 'compartir'
                });
            });
        });

        describe('close button inside content', () => {
            it('calls setIsShareOpen(false) when close button is clicked', () => {
                render(<ShareDesktopTrigger {...defaultProps} />);

                fireEvent.click(screen.getByTitle('Cerrar'));

                expect(defaultProps.setIsShareOpen).toHaveBeenCalledWith(false);
            });
        });

        describe('share options list', () => {
            it('renders one list item per SHARE_OPTION', () => {
                render(<ShareDesktopTrigger {...defaultProps} />);

                expect(screen.getAllByTestId('link')).toHaveLength(2);
            });

            it('calls handleShareClick when a share option is clicked', () => {
                const handleShareClick = jest.fn();
                useShareOptions.mockReturnValue({
                    copied: false,
                    handleShareClick
                });

                render(<ShareDesktopTrigger {...defaultProps} />);

                fireEvent.click(screen.getAllByTestId('link')[0]);

                expect(handleShareClick).toHaveBeenCalledTimes(1);
            });
        });

        describe('useShareOptions hook invocation', () => {
            it('calls useShareOptions with correct shareData', () => {
                render(<ShareDesktopTrigger {...defaultProps} />);

                expect(useShareOptions).toHaveBeenCalledWith({
                    isShareOpen: defaultProps.isShareOpen,
                    setIsShareOpen: defaultProps.setIsShareOpen,
                    shareData: {
                        requestUri: defaultProps.requestUri,
                        host: 'https://lanacion.com.ar',
                        title: defaultProps.title,
                        mobileTitle: defaultProps.mobileTitle
                    }
                });
            });
        });

        describe('snapshots', () => {
            it('matches snapshot with dropdown closed', () => {
                const { asFragment } = render(
                    <ShareDesktopTrigger {...defaultProps} />
                );

                expect(asFragment()).toMatchSnapshot();
            });

            it('matches snapshot with dropdown open', () => {
                const { asFragment } = render(
                    <ShareDesktopTrigger {...defaultProps} isShareOpen={true} />
                );

                expect(asFragment()).toMatchSnapshot();
            });

            it('matches snapshot in SSR mode', () => {
                isSSR.mockReturnValue(true);

                const { asFragment } = render(
                    <ShareDesktopTrigger {...defaultProps} />
                );

                expect(asFragment()).toMatchSnapshot();
            });
        });
    });

    describe('ShareCustomGhostButton snapshots', () => {
        it('matches snapshot without className', () => {
            const { asFragment } = render(<ShareCustomGhostButton />);

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with className', () => {
            const { asFragment } = render(
                <ShareCustomGhostButton className="max-xl:hidden" />
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
