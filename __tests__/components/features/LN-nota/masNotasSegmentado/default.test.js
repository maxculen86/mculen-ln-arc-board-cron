import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import MasNotasSegmentado from '../../../../../components/features/LN-nota/masNotasSegmentado/default';
import useNotaSegment from '../../../../../components/private/LN/common/hooks/useNotaSegment';
import taxonomySection from '../../../../../__mocks__/data/masNotas/taxonomySection';
import mockArticles from '../../../../../__mocks__/data/masNotas/articles';

jest.mock(
    'fusion:prop-types',
    () => {
        const taggable = validator => {
            const fn = validator || (() => null);
            fn.tag = () => fn;
            fn.isRequired = fn;
            return fn;
        };
        const factory = () => taggable(() => null);
        return {
            string: taggable(() => null),
            number: taggable(() => null),
            boolean: taggable(() => null),
            list: taggable(() => null),
            label: taggable(() => null),
            shape: factory,
            oneOf: factory,
            arrayOf: factory
        };
    },
    { virtual: true }
);

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

jest.mock(
    'fusion:consumer',
    Component => {
        return function (Component) {
            return props => <Component {...props} />;
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:context',
    Component => {
        return function (Component) {
            return props => <Component {...props} />;
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:content',
    () => ({
        useContent: jest.fn()
    }),
    { virtual: true }
);

jest.mock(
    'fusion:properties',
    () => () => ({
        getProperties: () => []
    }),
    { virtual: true }
);

jest.mock(
    '../../../../../components/private/LN/common/hooks/useNotaSegment',
    () => jest.fn()
);

jest.mock(
    '../../../../../components/private/LN/common/cajaTema',
    () =>
        ({ title = '', articles = [] }) => (
            <section>
                <h2 dangerouslySetInnerHTML={{ __html: title }} />
                {articles.map(({ _id, headlines = {} }) => (
                    <article key={_id}>
                        <h3>{headlines.basic}</h3>
                    </article>
                ))}
            </section>
        )
);

useContent.mockImplementation(() => ({
    content_elements: mockArticles.content_elements
}));

Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

const observe = jest.fn();
const unobserve = jest.fn();
const takeRecords = jest.fn(() => {});

window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    takeRecords
}));

const baseProps = ({
    cantidadNotas = 30,
    filterTest = 'byLastNews',
    filterControl = 'byLastNews',
    sectionOrTagTest = '',
    sectionOrTagControl = '',
    experimentName = 'Exp01',
    testDigits = ['1', '3'],
    controlDigits = ['0', '2'],
    segmentAndHide = false,
    globalContentOverride,
    isAdmin = false
} = {}) => ({
    id: '0fqAkhiaPrV',
    customFields: {
        cantidadNotas,
        filterTest,
        filterControl,
        sectionOrTagTest,
        sectionOrTagControl,
        experimentName,
        testDigits,
        controlDigits,
        segmentAndHide
    },
    globalContent: globalContentOverride || {
        _id: 'AVYWDWDAVVESZGD7HXMW46GTYA',
        subtype: '1',
        taxonomy: taxonomySection
    },
    outputType: 'default',
    arcSite: 'la-nacion-ar',
    isAdmin
});

// Default: the hook is mocked to return "test" segment, ready.
const mockSegmentReady = (segment = 'test') =>
    useNotaSegment.mockReturnValue({ segment, ready: true });

const buildArcArticle = ({
    id = 'OLD',
    title = 'Nota vieja de Colapinto'
} = {}) => ({
    _id: id,
    headlines: { basic: title, mobile: title },
    display_date: '2026-06-20T10:00:00.000Z',
    website_url: `/nota/${id}/`,
    promo_items: {
        basic: {
            type: 'image',
            url: `https://www.lanacion.com.ar/resizer/v2/${id}.jpg`
        }
    }
});

const buildHomeJsonArticle = ({
    id = 'HOME',
    title = 'Nota fresca de apertura home',
    fecha = '2026-07-06T19:00:00.000Z'
} = {}) => ({
    id,
    titulo: title,
    volanta: 'Volanta',
    url: `/nota/${id}/`,
    fechaPublicacion: fecha,
    categoria: { slug: '/politica', valor: 'Política' },
    imagen: {
        id: `IMG_${id}`,
        absoluteUrl: `https://www.lanacion.com.ar/resizer/v2/${id}.jpg?auth=TOKEN&width=768&quality=70&smart=false`
    }
});

describe('masNotasSegmentado feature', () => {
    Object.defineProperty(window, 'performance', {
        value: {
            getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigate' }]),
            measure: jest.fn()
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
        useContent.mockImplementation(() => ({
            content_elements: mockArticles.content_elements
        }));
        mockSegmentReady('test');
    });

    it('invokes useNotaSegment with the configured customFields', () => {
        render(<MasNotasSegmentado {...baseProps()} />);
        expect(useNotaSegment).toHaveBeenCalledWith({
            experimentName: 'Exp01',
            testDigits: ['1', '3'],
            controlDigits: ['0', '2']
        });
    });

    // ─── Render según segmento ───────────────────────────────────────

    it('renders the test variant when user is in segment "test"', () => {
        mockSegmentReady('test');
        const props = baseProps({
            filterTest: 'byLastNews',
            filterControl: 'byTags'
        });
        render(<MasNotasSegmentado {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
    });

    it('renders the control variant when user is in segment "control"', () => {
        mockSegmentReady('control');
        const props = baseProps({
            filterTest: 'byLastNews',
            filterControl: 'byLastNews'
        });
        render(<MasNotasSegmentado {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
    });

    it('renders nothing when user has no segment (clientID not in either list)', () => {
        useNotaSegment.mockReturnValue({ segment: null, ready: true });
        const { container } = render(<MasNotasSegmentado {...baseProps()} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing while the segment is being computed (ready=false)', () => {
        useNotaSegment.mockReturnValue({ segment: null, ready: false });
        const { container } = render(<MasNotasSegmentado {...baseProps()} />);
        expect(container).toBeEmptyDOMElement();
    });

    // ─── Variante no configurada ─────────────────────────────────────

    it('renders nothing when user is "test" but filterTest is empty', () => {
        mockSegmentReady('test');
        const { container } = render(
            <MasNotasSegmentado
                {...baseProps({ filterTest: '', filterControl: 'byLastNews' })}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when user is "control" but filterControl is empty', () => {
        mockSegmentReady('control');
        const { container } = render(
            <MasNotasSegmentado
                {...baseProps({ filterTest: 'byLastNews', filterControl: '' })}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });

    // ─── segmentAndHide (killswitch) ─────────────────────────────────

    it('returns null when segmentAndHide is true (even with valid segment)', () => {
        mockSegmentReady('test');
        useContent.mockClear();
        const { container } = render(
            <MasNotasSegmentado {...baseProps({ segmentAndHide: true })} />
        );
        expect(container).toBeEmptyDOMElement();
        expect(useNotaSegment).toHaveBeenCalled();
        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({ source: null })
        );
    });

    // ─── Casos negativos ─────────────────────────────────────────────

    it('does not render anything when primary_section is missing', () => {
        const props = baseProps({
            globalContentOverride: {
                _id: 'X',
                subtype: '1',
                taxonomy: { ...taxonomySection, primary_section: undefined }
            }
        });
        const { container } = render(<MasNotasSegmentado {...props} />);
        expect(container).toBeEmptyDOMElement();
    });

    // ─── Admin: mensajes de configuración ────────────────────────────

    it('shows admin warning when both digit lists are empty', () => {
        const props = baseProps({
            testDigits: [],
            controlDigits: [],
            isAdmin: true
        });
        render(<MasNotasSegmentado {...props} />);
        expect(screen.getByText(/Configurá experimento/i)).toBeInTheDocument();
    });

    it('shows admin warning when experimentName is empty', () => {
        const props = baseProps({
            experimentName: '',
            isAdmin: true
        });
        render(<MasNotasSegmentado {...props} />);
        expect(screen.getByText(/Configurá experimento/i)).toBeInTheDocument();
    });

    it('shows admin warning when neither filterTest nor filterControl are configured', () => {
        const props = baseProps({
            filterTest: '',
            filterControl: '',
            isAdmin: true
        });
        render(<MasNotasSegmentado {...props} />);
        expect(screen.getByText(/Configurá experimento/i)).toBeInTheDocument();
    });

    it('renders a test preview for admin when segment is null', () => {
        useNotaSegment.mockReturnValue({ segment: null, ready: true });
        const props = baseProps({
            isAdmin: true,
            filterTest: 'byLastNews',
            filterControl: 'aperturaHome'
        });
        render(<MasNotasSegmentado {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
    });

    it('renders a control preview for admin when segment is null and test is not configured', () => {
        useNotaSegment.mockReturnValue({ segment: null, ready: true });
        const props = baseProps({
            isAdmin: true,
            filterTest: '',
            filterControl: 'byLastNews'
        });
        render(<MasNotasSegmentado {...props} />);
        expect(screen.getAllByRole('heading').shift()).toHaveTextContent(
            'Últimas Noticias'
        );
    });

    it('shows admin warning when active variant is not configured', () => {
        mockSegmentReady('control');
        const props = baseProps({
            filterTest: 'byLastNews',
            filterControl: '',
            isAdmin: true
        });
        render(<MasNotasSegmentado {...props} />);
        expect(
            screen.getByText(
                /No configuraste el origen para la variante CONTROL/i
            )
        ).toBeInTheDocument();
    });

    it('does not show admin warnings to non-admin users when config is invalid', () => {
        // Con digits vacíos, el hook real devolvería segment=null. Lo mockeamos así.
        useNotaSegment.mockReturnValue({ segment: null, ready: true });
        const props = baseProps({
            testDigits: [],
            controlDigits: [],
            isAdmin: false
        });
        const { container } = render(<MasNotasSegmentado {...props} />);
        expect(screen.queryByText(/Configurá/i)).toBeNull();
        expect(container).toBeEmptyDOMElement();
    });

    // ─── aperturaHome como activeFilter ──────────────────────────────

    it('fetches aperturaHome from home json on the client and ignores cached useContent data', async () => {
        mockSegmentReady('test');
        const staleTitle = 'Nota vieja de Colapinto';
        const freshTitle = 'Nota fresca de apertura home';
        useContent.mockReturnValue({
            content_elements: [
                buildArcArticle({ id: 'STALE', title: staleTitle })
            ]
        });
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                items: [
                    {
                        tipoSeccion: 'apertura',
                        notas: [
                            buildHomeJsonArticle({
                                id: 'FRESH',
                                title: freshTitle
                            })
                        ]
                    },
                    {
                        tipoSeccion: 'tema',
                        notas: [
                            buildHomeJsonArticle({
                                id: 'STALE_TOPIC',
                                title: staleTitle
                            })
                        ]
                    }
                ]
            })
        });
        const props = baseProps({
            cantidadNotas: 3,
            filterTest: 'aperturaHome',
            filterControl: 'byLastNews'
        });
        render(<MasNotasSegmentado {...props} />);

        await waitFor(() => {
            expect(screen.getByText(freshTitle)).toBeInTheDocument();
        });
        expect(screen.queryByText(staleTitle)).not.toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining(
                '/?_website=la-nacion-ar&outputType=opening'
            ),
            expect.objectContaining({ cache: 'no-store' })
        );
        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({ source: null })
        );

        const cachedSourceCall = useContent.mock.calls.find(
            ([opts]) => opts && opts.source === 'homeOpeningArticlesSource'
        );
        expect(cachedSourceCall).toBeUndefined();
    });
});
