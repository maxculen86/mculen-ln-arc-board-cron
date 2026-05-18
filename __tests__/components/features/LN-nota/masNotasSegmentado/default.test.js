import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import MasNotasSegmentado from '../../../../../components/features/LN-nota/masNotasSegmentado/default';
import useNotaSegment from '../../../../../components/private/LN/common/hooks/useNotaSegment';
import taxonomySection from '../../../../../__mocks__/data/masNotas/taxonomySection';
import mockArticles from '../../../../../__mocks__/data/masNotas/articles';

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

jest.mock(
    '../../../../../components/private/LN/common/hooks/useNotaSegment',
    () => jest.fn()
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

    it('uses homeOpeningArticlesSource when active variant filter is aperturaHome', () => {
        mockSegmentReady('test');
        useContent.mockClear();
        const props = baseProps({
            filterTest: 'aperturaHome',
            filterControl: 'byLastNews'
        });
        render(<MasNotasSegmentado {...props} />);

        const aperturaCall = useContent.mock.calls.find(
            ([opts]) => opts && opts.source === 'homeOpeningArticlesSource'
        );
        expect(aperturaCall).toBeDefined();
        expect(aperturaCall[0].filter).toBeUndefined();
    });
});
