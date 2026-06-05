import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    act
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../../../../components/layouts/LN-Buscador/_children/default';

jest.mock('fusion:environment', () => ({
    API_QUERYLY: 'https://api.queryly.com',
    API_KEY_QUERYLY_LN: 'test-key',
    SITE_LANACION: 'https://www.lanacion.com.ar',
    RESIZER_URL: 'https://resizer.lanacion.com.ar',
    RESIZER_KEY: 'test-resizer-key'
}));

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        requestUri: '/buscador/?query=dolar',
        contextPath: 'pf/',
        deployment: path => `dist/${path}`,
        arcSite: 'la-nacion-ar',
        siteProperties: {}
    }),
    useComponentContext: jest.fn(() => ({})),
    useFusionContext: jest.fn(() => ({ isAdmin: false, siteProperties: {} }))
}));

jest.mock('@ln/hooks', () => ({
    useWindowSize: () => ({ width: 1440 })
}));

jest.mock('@ln/common-ui-drawer', () => ({
    useDrawer: () => ({ toggleDrawer: jest.fn() })
}));

jest.mock('@ln/ds-common-drawer', () => {
    const DrawerRoot = ({ children }) => (
        <div data-testid="drawer">{children}</div>
    );
    DrawerRoot.Portal = ({ children }) => (
        <div data-testid="drawer-portal">{children}</div>
    );
    DrawerRoot.Overlay = () => <div data-testid="drawer-overlay" />;
    DrawerRoot.Content = ({ children }) => (
        <div data-testid="drawer-content">{children}</div>
    );
    DrawerRoot.Header = ({ children }) => (
        <div data-testid="drawer-header">{children}</div>
    );
    DrawerRoot.Body = ({ children }) => (
        <div data-testid="drawer-body">{children}</div>
    );
    DrawerRoot.Footer = ({ children }) => (
        <div data-testid="drawer-footer">{children}</div>
    );
    DrawerRoot.CloseButton = ({ children, ...props }) => (
        <button data-testid="drawer-close-button" {...props}>
            {children}
        </button>
    );

    return {
        Drawer: DrawerRoot,
        drawerManager: { show: jest.fn(), hide: jest.fn() }
    };
});

jest.mock('@ln/ds-common-dropdown', () => {
    const DropdownRoot = ({ children }) => (
        <div data-testid="dropdown">{children}</div>
    );
    DropdownRoot.Trigger = ({ children, ...props }) => (
        <button data-testid="dropdown-trigger" {...props}>
            {children}
        </button>
    );
    DropdownRoot.Content = ({ children }) => (
        <div data-testid="dropdown-content">{children}</div>
    );
    DropdownRoot.Item = ({ children, onSelect, active, ...props }) => (
        <button
            data-testid="dropdown-item"
            data-active={active}
            onClick={onSelect}
            {...props}
        >
            {children}
        </button>
    );

    return { Dropdown: DropdownRoot };
});

jest.mock('@ln/ds-common-accordion', () => {
    const AccordionRoot = ({ children, defaultOpenItems }) => (
        <div
            data-testid="accordion"
            data-default-open={JSON.stringify(defaultOpenItems)}
        >
            {children}
        </div>
    );
    AccordionRoot.Item = ({ children, value }) => (
        <div data-testid="accordion-item" data-value={value}>
            {children}
        </div>
    );
    AccordionRoot.Header = ({ children }) => (
        <div data-testid="accordion-header">{children}</div>
    );
    AccordionRoot.Content = ({ children }) => (
        <div data-testid="accordion-content">{children}</div>
    );
    AccordionRoot.Icon = ({ path, ...props }) => (
        <span data-testid="accordion-icon" {...props} />
    );

    return { Accordion: AccordionRoot };
});

jest.mock('@ln/ds-common-button', () => ({
    Button: ({ children, onClick, ...props }) => (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    )
}));

jest.mock('@ln/ds-common-chip', () => ({
    Chip: ({ children, onClick, asChild, ...props }) => (
        <button data-testid="chip" onClick={onClick} {...props}>
            {children}
        </button>
    )
}));

jest.mock('@ln/ds-common-divider', () => ({
    Divider: ({ direction, color, ...props }) => (
        <hr
            data-testid="divider"
            data-direction={direction}
            data-color={color}
            {...props}
        />
    )
}));

jest.mock('@ln/ds-common-link', () => ({
    Link: ({ children, href, ...props }) => (
        <a href={href} {...props}>
            {children}
        </a>
    )
}));

jest.mock('@ln/ds-common-formcontrol', () => {
    const mockReact = require('react');
    const mockFormcontrolRoot = mockReact.forwardRef(
        ({ children, className, ...props }, ref) => (
            <div
                ref={ref}
                className={className}
                data-testid="formcontrol"
                {...props}
            >
                {children}
            </div>
        )
    );
    mockFormcontrolRoot.Input = ({ children, ...props }) => (
        <input data-testid="formcontrol-input" {...props} />
    );
    mockFormcontrolRoot.Adornment = ({ children, position }) => (
        <div data-testid="formcontrol-adornment" data-position={position}>
            {children}
        </div>
    );
    mockFormcontrolRoot.Label = ({ children, ...props }) => (
        <label data-testid="formcontrol-label" {...props}>
            {children}
        </label>
    );

    return { Formcontrol: mockFormcontrolRoot };
});

jest.mock('@ln/ds-common-option', () => {
    const mockReact = require('react');
    // Module-level map: DOM label element → onChange handler
    const handlerMap = new WeakMap();

    const OptionRoot = mockReact.forwardRef(
        ({ children, onChange, size, className, ...props }, _ref) => {
            const labelRef = mockReact.useRef(null);

            mockReact.useLayoutEffect(() => {
                if (labelRef.current && onChange) {
                    handlerMap.set(labelRef.current, onChange);
                }
            });

            return (
                <label
                    ref={labelRef}
                    data-testid="option"
                    className={className}
                    {...props}
                >
                    {children}
                </label>
            );
        }
    );
    OptionRoot.displayName = 'Option';

    OptionRoot.Checkbox = mockReact.forwardRef(({ ...props }, _ref) => {
        const inputRef = mockReact.useRef(null);

        const handleChange = e => {
            // Walk up DOM to find the parent label with the stored handler
            let el = inputRef.current?.parentElement;
            while (el) {
                if (handlerMap.has(el)) {
                    handlerMap.get(el)(e);
                    return;
                }
                el = el.parentElement;
            }
        };

        return (
            <input
                ref={inputRef}
                type="checkbox"
                data-testid="option-checkbox"
                onChange={handleChange}
                {...props}
            />
        );
    });
    OptionRoot.Checkbox.displayName = 'OptionCheckbox';

    OptionRoot.Label = ({ children }) => (
        <span data-testid="option-label">{children}</span>
    );

    return { Option: OptionRoot };
});

jest.mock('@ln/ds-common-skeleton', () => ({
    Skeleton: ({ className }) => (
        <div data-testid="skeleton" className={className} />
    )
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' '),
    cva:
        (base, config) =>
        (props = {}) => {
            const classes = [base];
            if (config?.variants) {
                Object.keys(config.variants).forEach(key => {
                    const value = props[key];
                    if (value && config.variants[key]?.[value]) {
                        classes.push(config.variants[key][value]);
                    }
                });
            }
            return classes.filter(Boolean).join(' ');
        }
}));

const mockQuerylyResponse = {
    metadata: { total: 2 },
    items: [
        {
            guid: 'abc123',
            title: 'Dólar hoy',
            link: '/economia/dolar-hoy',
            creator: 'Redacción',
            pubdate: 'Mon, 20 Apr 2026 10:00:00 GMT',
            description: 'El dólar subió hoy.',
            imageresizer: 'https://resizer.lanacion.com.ar/img.jpg'
        },
        {
            guid: 'def456',
            title: 'Reservas del Banco Central',
            link: '/economia/reservas',
            creator: 'Redacción LN',
            pubdate: 'Sun, 19 Apr 2026 08:00:00 GMT',
            description: 'Las reservas aumentaron.',
            imageresizer: 'https://resizer.lanacion.com.ar/img2.jpg'
        }
    ],
    faceted: {
        section: [{ key: 'Economía', value: 12 }],
        creator: [{ key: 'Redacción', value: 5 }],
        pubDate: [{ key: 24, value: 2 }]
    },
    topics: [],
    related: []
};

const mockEmptyResponse = {
    metadata: { total: 0 },
    items: [],
    faceted: {},
    topics: [],
    related: []
};

function buildMockFetch(responseBody) {
    return jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(responseBody)
        })
    );
}

function renderSearch() {
    return render(<Search />);
}

describe('Search — integration', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('loading state', () => {
        it('shows skeletons and hides results before fetch resolves', () => {
            global.fetch = jest.fn(() => new Promise(() => {}));

            renderSearch();

            expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0);
            expect(
                screen.queryByText(/resultados encontrados/i)
            ).not.toBeInTheDocument();
            expect(screen.queryByRole('article')).not.toBeInTheDocument();
        });
    });

    describe('results rendering', () => {
        it('renders article titles after fetch resolves', async () => {
            global.fetch = buildMockFetch(mockQuerylyResponse);

            renderSearch();

            await waitFor(() =>
                expect(screen.getByText('Dólar hoy')).toBeInTheDocument()
            );
            expect(
                screen.getByText('Reservas del Banco Central')
            ).toBeInTheDocument();
        });

        it('shows result count in SearchHeader', async () => {
            global.fetch = buildMockFetch(mockQuerylyResponse);

            renderSearch();

            await waitFor(() =>
                expect(
                    screen.getByText(/2 resultados encontrados de: dolar/i)
                ).toBeInTheDocument()
            );
        });
    });

    describe('filters', () => {
        it('shows section and creator filter options from faceted data', async () => {
            global.fetch = buildMockFetch(mockQuerylyResponse);

            renderSearch();
            await waitFor(() =>
                expect(screen.getAllByText('Secciones').length).toBeGreaterThan(
                    0
                )
            );
            expect(screen.getAllByText('Autor').length).toBeGreaterThan(0);
            expect(screen.getAllByText(/Economía/i).length).toBeGreaterThan(0);
            expect(screen.getAllByText(/Redacción/i).length).toBeGreaterThan(0);
        });

        it('triggers a new fetch when a filter checkbox is clicked', async () => {
            global.fetch = buildMockFetch(mockQuerylyResponse);

            renderSearch();

            await waitFor(() =>
                expect(screen.getByText('Dólar hoy')).toBeInTheDocument()
            );

            const initialCallCount = global.fetch.mock.calls.length;
            const checkboxes = screen.getAllByTestId('option-checkbox');
            expect(checkboxes.length).toBeGreaterThan(0);

            await act(async () => {
                fireEvent.click(checkboxes[0]);
            });

            await waitFor(() =>
                expect(global.fetch.mock.calls.length).toBeGreaterThan(
                    initialCallCount
                )
            );
        });

        it('removes all applied filters when "eliminar todo" is clicked', async () => {
            global.fetch = buildMockFetch(mockQuerylyResponse);

            renderSearch();

            await waitFor(() =>
                expect(screen.getByText('Dólar hoy')).toBeInTheDocument()
            );

            const checkboxes = screen.getAllByTestId('option-checkbox');
            await act(async () => {
                fireEvent.click(checkboxes[0]);
            });

            await waitFor(() =>
                expect(
                    screen.getAllByText('Filtros aplicados').length
                ).toBeGreaterThan(0)
            );

            const fetchCallsBefore = global.fetch.mock.calls.length;

            const removeAllBtn = screen.getAllByRole('button', {
                name: /eliminar todos los filtros/i
            })[0];
            await act(async () => {
                fireEvent.click(removeAllBtn);
            });

            await waitFor(() =>
                expect(
                    screen.queryByText('Filtros aplicados')
                ).not.toBeInTheDocument()
            );

            expect(global.fetch.mock.calls.length).toBeGreaterThan(
                fetchCallsBefore
            );
        });
    });

    describe('sort', () => {
        it('triggers a new fetch with sort=date when sort option changes', async () => {
            global.fetch = buildMockFetch(mockQuerylyResponse);

            renderSearch();

            await waitFor(() =>
                expect(screen.getByText('Dólar hoy')).toBeInTheDocument()
            );

            const initialCallCount = global.fetch.mock.calls.length;
            const sortItems = screen.getAllByTestId('dropdown-item');
            const actualesItem = sortItems.find(el =>
                el.textContent.includes('ACTUALES')
            );
            expect(actualesItem).toBeDefined();

            await act(async () => {
                fireEvent.click(actualesItem);
            });

            await waitFor(() =>
                expect(global.fetch.mock.calls.length).toBeGreaterThan(
                    initialCallCount
                )
            );

            const lastUrl =
                global.fetch.mock.calls[global.fetch.mock.calls.length - 1][0];
            expect(lastUrl).toContain('sort=date');
        });
    });

    describe('pagination', () => {
        it('shows "VER MÁS RESULTADOS" and triggers next-page fetch', async () => {
            const manyItems = Array.from({ length: 24 }, (_, i) => ({
                guid: `guid-${i}`,
                title: `Artículo ${i}`,
                link: `/articulo-${i}`,
                creator: 'Redacción',
                pubdate: 'Mon, 20 Apr 2026 10:00:00 GMT',
                description: `Descripción ${i}`,
                imageresizer: ''
            }));

            global.fetch = buildMockFetch({
                metadata: { total: 50 },
                items: manyItems,
                faceted: {},
                topics: [],
                related: []
            });

            renderSearch();

            await waitFor(() =>
                expect(screen.getByText('Artículo 0')).toBeInTheDocument()
            );

            const loadMoreBtn = screen.getByRole('button', {
                name: /ver más resultados/i
            });
            expect(loadMoreBtn).toBeInTheDocument();

            const callsBefore = global.fetch.mock.calls.length;

            await act(async () => {
                fireEvent.click(loadMoreBtn);
            });

            await waitFor(() =>
                expect(global.fetch.mock.calls.length).toBeGreaterThan(
                    callsBefore
                )
            );

            const lastUrl =
                global.fetch.mock.calls[global.fetch.mock.calls.length - 1][0];
            expect(lastUrl).toContain('endindex=24');
        });
    });

    describe('empty and error states', () => {
        it('shows no-results message when items is empty', async () => {
            global.fetch = buildMockFetch(mockEmptyResponse);

            renderSearch();

            await waitFor(() =>
                expect(
                    screen.getByText('No se encontraron resultados')
                ).toBeInTheDocument()
            );
        });

        it('shows no-results message when fetch rejects', async () => {
            jest.spyOn(console, 'error').mockImplementation(() => {});

            global.fetch = jest.fn(() =>
                Promise.reject(new Error('Network error'))
            );

            renderSearch();

            await screen.findByText('No se encontraron resultados');
        });
    });

    describe('highlights card', () => {
        it('renders image when topics[0] has an image field', async () => {
            const topicTitle = 'Dólar oficial y dólar blue hoy';
            const topicImage =
                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/TESTIMG.jpg';

            global.fetch = buildMockFetch({
                ...mockQuerylyResponse,
                topics: [
                    {
                        _id: 471,
                        title: topicTitle,
                        description:
                            'Cotización del dólar oficial y del dólar blue',
                        link: 'https://www.lanacion.com.ar/dolar-hoy/',
                        image: topicImage
                    }
                ]
            });

            renderSearch();

            await waitFor(() =>
                expect(screen.getByText(topicTitle)).toBeInTheDocument()
            );

            const highlightImg = screen.getByAltText(topicTitle);
            expect(highlightImg).toBeInTheDocument();
            expect(highlightImg).toHaveAttribute('src', topicImage);
        });
    });
});
