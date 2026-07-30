import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmptyStateDS } from '../../../../../../components/features/ui/foodit/emptyState/default';
import { descriptionByVariant } from '../../../../../../components/features/foodit-global/common/emptyState/helpers';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('@ln/ds-common-emptystate', () => {
    const Emptystate = ({ children, className }) => (
        <div data-testid="emptystate" className={className}>
            {children}
        </div>
    );
    Emptystate.Body = ({ children, className }) => (
        <div data-testid="emptystate-body" className={className}>
            {children}
        </div>
    );
    Emptystate.Text = ({ children, variant, className }) => (
        <p data-testid={`emptystate-text-${variant}`} className={className}>
            {children}
        </p>
    );
    return { Emptystate };
});

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/emptyState/helpers',
    () => ({
        imagePropsByVariant: {
            'barrier-unlogged': { asset: false },
            'barrier-logged': { asset: false },
            'empty-state': {
                asset: 'empty-state-recetario.webp',
                alt: '¡Aún no hay nada por acá!',
                className: 'img-class'
            },
            'search-engine': {
                asset: 'empty-state-recetario.webp',
                alt: '¡Aún no hay nada por acá!',
                className: 'img-class'
            },
            404: {
                asset: 'logo-404.png',
                alt: 'Logo Foodit',
                className: 'logo-class'
            }
        },
        titleByVariant: {
            'barrier-unlogged': 'Exclusivo para suscriptores',
            'barrier-logged': 'Exclusivo para suscriptores',
            'empty-state': '¡Aún no hay nada por acá!',
            'search-engine': '¡Nada por acá!',
            404: '¡Uppps! Contenido en preparación'
        },
        descriptionByVariant: jest.fn(() => 'Descripción de prueba')
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/getAssetsPath',
    () => ({
        __esModule: true,
        default: () => () => asset => `/assets/${asset}`
    })
);

jest.mock(
    '../../../../../../components/features/ui/foodit/image/default',
    () => ({
        __esModule: true,
        default: ({ src, alt }) => (
            <img data-testid="empty-state-image" src={src} alt={alt} />
        )
    })
);

jest.mock(
    '../../../../../../components/features/ui/foodit/divider/default',
    () => ({
        __esModule: true,
        default: () => <hr data-testid="divider" />
    })
);

jest.mock(
    '../../../../../../components/features/ui/foodit/emptyState/card/default',
    () => ({
        __esModule: true,
        default: () => <div data-testid="card-info" />
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/SubscribeLoginButton/foodit',
    () => ({
        __esModule: true,
        default: ({ comesFrom }) => (
            <div
                data-testid="login-subscribe-buttons"
                data-comes-from={comesFrom}
            />
        )
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData',
    () => ({
        useNavigationData: jest.fn(() => ({ termicasData: {} }))
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

const { useAppContext } = require('fusion:context');
const useGetUserConfig =
    require('../../../../../../components/features/foodit-global/hooks/useGetUserConfig').default;

const LAYOUTS = {
    FooditMenuSemanal: 'Foodit-menu-semanal',
    FooditListadoCompras: 'Foodit-compras',
    FooditRecetario: 'Foodit-recetario',
    FooditChatIA: 'Foodit-chat-ia'
};

const mockAppContext = (layout = 'Foodit-home') => ({
    contextPath: '/pf',
    deployment: '123',
    layout,
    siteProperties: { layoutsName: LAYOUTS }
});

describe('EmptyStateDS', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue(mockAppContext());
        useGetUserConfig.mockReturnValue({ isSubscribed: true });
    });

    describe('null rendering', () => {
        it('returns null when variant is not provided', () => {
            const { container } = render(<EmptyStateDS />);
            expect(container.firstChild).toBeNull();
        });

        it('returns null when variant is empty string', () => {
            const { container } = render(<EmptyStateDS variant="" />);
            expect(container.firstChild).toBeNull();
        });
    });

    describe('title rendering', () => {
        it.each([
            ['barrier-unlogged', 'Exclusivo para suscriptores'],
            ['barrier-logged', 'Exclusivo para suscriptores'],
            ['empty-state', '¡Aún no hay nada por acá!'],
            ['search-engine', '¡Nada por acá!'],
            ['404', '¡Uppps! Contenido en preparación']
        ])(
            'renders correct title for variant "%s"',
            (variant, expectedTitle) => {
                render(<EmptyStateDS variant={variant} />);
                expect(
                    screen.getByTestId('emptystate-text-title')
                ).toHaveTextContent(expectedTitle);
            }
        );
    });

    describe('description rendering', () => {
        it('calls descriptionByVariant with current layout and variant', () => {
            useAppContext.mockReturnValue(
                mockAppContext('Foodit-menu-semanal')
            );
            render(<EmptyStateDS variant="empty-state" />);
            expect(descriptionByVariant).toHaveBeenCalledWith({
                layout: 'Foodit-menu-semanal',
                variant: 'empty-state'
            });
        });

        it('renders the value returned by descriptionByVariant', () => {
            render(<EmptyStateDS variant="barrier-unlogged" />);
            expect(
                screen.getByTestId('emptystate-text-subtitle')
            ).toHaveTextContent('Descripción de prueba');
        });
    });

    describe('image rendering', () => {
        it.each(['empty-state', 'search-engine', '404'])(
            'renders image for variant "%s"',
            variant => {
                render(<EmptyStateDS variant={variant} />);
                expect(
                    screen.getByTestId('empty-state-image')
                ).toBeInTheDocument();
            }
        );

        it.each(['barrier-unlogged', 'barrier-logged'])(
            'does not render image for barrier variant "%s"',
            variant => {
                render(<EmptyStateDS variant={variant} />);
                expect(
                    screen.queryByTestId('empty-state-image')
                ).not.toBeInTheDocument();
            }
        );

        it('renders image with correct src and alt', () => {
            render(<EmptyStateDS variant="404" />);
            const img = screen.getByTestId('empty-state-image');
            expect(img).toHaveAttribute('src', '/assets/logo-404.png');
            expect(img).toHaveAttribute('alt', 'Logo Foodit');
        });
    });

    describe('LoginSubscribeButtons rendering', () => {
        it.each(['barrier-unlogged', 'barrier-logged', 'empty-state'])(
            'renders LoginSubscribeButtons for variant "%s"',
            variant => {
                render(<EmptyStateDS variant={variant} />);
                expect(
                    screen.getByTestId('login-subscribe-buttons')
                ).toBeInTheDocument();
            }
        );

        it.each(['search-engine', '404'])(
            'does not render LoginSubscribeButtons for variant "%s"',
            variant => {
                render(<EmptyStateDS variant={variant} />);
                expect(
                    screen.queryByTestId('login-subscribe-buttons')
                ).not.toBeInTheDocument();
            }
        );

        it('passes comesFrom prop to LoginSubscribeButtons', () => {
            render(
                <EmptyStateDS
                    variant="barrier-unlogged"
                    comesFrom="ficha_receta"
                />
            );
            expect(
                screen.getByTestId('login-subscribe-buttons')
            ).toHaveAttribute('data-comes-from', 'ficha_receta');
        });
    });

    describe('card section', () => {
        it('renders card section for non-subscriber with barrier-unlogged', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            render(<EmptyStateDS variant="barrier-unlogged" />);
            expect(
                screen.getByText('¿Por qué suscribirme a Foodit?')
            ).toBeInTheDocument();
            expect(screen.getByTestId('card-info')).toBeInTheDocument();
            expect(screen.getByTestId('divider')).toBeInTheDocument();
        });

        it('renders card section for non-subscriber with barrier-logged', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            render(<EmptyStateDS variant="barrier-logged" />);
            expect(
                screen.getByText('¿Por qué suscribirme a Foodit?')
            ).toBeInTheDocument();
            expect(screen.getByTestId('card-info')).toBeInTheDocument();
        });

        it('does not render card section for subscribed user', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: true });
            render(<EmptyStateDS variant="barrier-unlogged" />);
            expect(
                screen.queryByText('¿Por qué suscribirme a Foodit?')
            ).not.toBeInTheDocument();
            expect(screen.queryByTestId('card-info')).not.toBeInTheDocument();
        });

        it('does not render card section when direction is horizontal', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            render(
                <EmptyStateDS
                    variant="barrier-unlogged"
                    direction="horizontal"
                />
            );
            expect(
                screen.queryByText('¿Por qué suscribirme a Foodit?')
            ).not.toBeInTheDocument();
            expect(screen.queryByTestId('card-info')).not.toBeInTheDocument();
        });

        it('does not render card section for non-barrier variants', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            render(<EmptyStateDS variant="empty-state" />);
            expect(
                screen.queryByText('¿Por qué suscribirme a Foodit?')
            ).not.toBeInTheDocument();
        });
    });

    describe('subtitle className', () => {
        it.each([
            LAYOUTS.FooditMenuSemanal,
            LAYOUTS.FooditListadoCompras,
            LAYOUTS.FooditRecetario
        ])(
            'applies text-primary-default for non-subscriber on target layout "%s"',
            layout => {
                useGetUserConfig.mockReturnValue({ isSubscribed: false });
                useAppContext.mockReturnValue(mockAppContext(layout));
                render(<EmptyStateDS variant="barrier-logged" />);
                expect(
                    screen.getByTestId('emptystate-text-subtitle')
                ).toHaveClass('text-primary-default');
            }
        );

        it('applies text-secondary-default for subscriber on target layout', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: true });
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditRecetario)
            );
            render(<EmptyStateDS variant="empty-state" />);
            expect(screen.getByTestId('emptystate-text-subtitle')).toHaveClass(
                'text-secondary-default'
            );
        });

        it('applies text-secondary-default for non-subscriber on non-target layout', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            useAppContext.mockReturnValue(mockAppContext('Foodit-home'));
            render(<EmptyStateDS variant="barrier-unlogged" />);
            expect(screen.getByTestId('emptystate-text-subtitle')).toHaveClass(
                'text-secondary-default'
            );
        });
    });

    describe('snapshots', () => {
        it('barrier-unlogged — non-subscriber vertical', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            const { container } = render(
                <EmptyStateDS
                    variant="barrier-unlogged"
                    comesFrom="ficha_receta"
                />
            );
            expect(container).toMatchSnapshot();
        });

        it('barrier-unlogged — non-subscriber horizontal (sin card section)', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            const { container } = render(
                <EmptyStateDS
                    variant="barrier-unlogged"
                    direction="horizontal"
                />
            );
            expect(container).toMatchSnapshot();
        });

        it('barrier-logged — subscriber', () => {
            const { container } = render(
                <EmptyStateDS variant="barrier-logged" />
            );
            expect(container).toMatchSnapshot();
        });

        it('empty-state — subscriber con className custom', () => {
            const { container } = render(
                <EmptyStateDS variant="empty-state" className="custom-class" />
            );
            expect(container).toMatchSnapshot();
        });

        it('search-engine', () => {
            const { container } = render(
                <EmptyStateDS variant="search-engine" />
            );
            expect(container).toMatchSnapshot();
        });

        it('404', () => {
            const { container } = render(<EmptyStateDS variant="404" />);
            expect(container).toMatchSnapshot();
        });

        it('barrier-logged — non-subscriber en layout target (color primario)', () => {
            useGetUserConfig.mockReturnValue({ isSubscribed: false });
            useAppContext.mockReturnValue(
                mockAppContext(LAYOUTS.FooditRecetario)
            );
            const { container } = render(
                <EmptyStateDS variant="barrier-logged" />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
