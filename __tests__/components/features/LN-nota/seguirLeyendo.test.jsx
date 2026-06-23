import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import SeguirLeyendo from '../../../../components/features/LN-nota/seguirLeyendo';
import useNotaSegment from '../../../../components/private/LN/common/hooks/useNotaSegment';

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

jest.mock('fusion:consumer', () => Component => Component, { virtual: true });

jest.mock('fusion:context', () => ({}), { virtual: true });

jest.mock('fusion:content', () => ({ useContent: jest.fn() }), {
    virtual: true
});

jest.mock(
    'fusion:prop-types',
    () => {
        const taggable = fn => {
            fn.tag = () => fn;
            fn.isRequired = fn;
            return fn;
        };
        return {
            string: taggable(jest.fn()),
            boolean: taggable(jest.fn()),
            list: taggable(jest.fn()),
            label: taggable(jest.fn()),
            shape: jest.fn(() => taggable(jest.fn()))
        };
    },
    { virtual: true }
);

jest.mock('../../../../components/private/LN/common/hooks/useNotaSegment', () =>
    jest.fn()
);

jest.mock(
    '../../../../components/private/common/utils/noteTracker/articleBoxesTracker',
    () => ({ articleBoxesTracker: jest.fn() })
);

jest.mock(
    '../../../../components/private/LN/nota/seguirLeyendo',
    () =>
        function MockSeguirLeyendo({ relatedContent }) {
            return (
                <div data-testid="seguir-leyendo">
                    {relatedContent.map(a => (
                        <span key={a._id}>{a._id}</span>
                    ))}
                </div>
            );
        }
);

jest.mock(
    '../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage',
    () =>
        function MockPageBuilderMessage({ message }) {
            return <p data-testid="pb-message">{message}</p>;
        }
);

Context.useAppContext = jest.fn(() => ({ arcSite: 'la-nacion-ar' }));

const MOCK_ARTICLES = [{ _id: 'art-1' }, { _id: 'art-2' }, { _id: 'art-3' }];

const baseProps = ({
    noteId = 'NOTE123',
    experimentName = 'Exp01',
    segmentAndHide = false,
    testDigits = ['1', '3'],
    controlDigits = ['0', '2'],
    isAdmin = false
} = {}) => ({
    globalContent: noteId ? { _id: noteId } : null,
    outputType: 'default',
    isAdmin,
    customFields: {
        experimentName,
        segmentAndHide,
        testDigits,
        controlDigits
    }
});

const mockSegmentReady = (segment = 'test', ready = true) =>
    useNotaSegment.mockReturnValue({ segment, ready });

describe('seguirLeyendo feature', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useContent.mockReturnValue(MOCK_ARTICLES);
        mockSegmentReady('test');
    });

    // ─── Hook invocation ─────────────────────────────────────────────

    it('invokes useNotaSegment with the configured customFields and SegmentoSeguirLeyendo key', () => {
        render(<SeguirLeyendo {...baseProps()} />);

        expect(useNotaSegment).toHaveBeenCalledWith({
            experimentName: 'Exp01',
            testDigits: ['1', '3'],
            controlDigits: ['0', '2'],
            storageKey: 'SegmentoSeguirLeyendo'
        });
    });

    // ─── Happy path ──────────────────────────────────────────────────

    it('renders the seguirLeyendo section when segment is ready and articles exist', () => {
        render(<SeguirLeyendo {...baseProps()} />);

        expect(screen.getByTestId('seguir-leyendo')).toBeInTheDocument();
    });

    // ─── No render cases ─────────────────────────────────────────────

    it('renders nothing while the segment is being computed (ready=false)', () => {
        mockSegmentReady(null, false);
        const { container } = render(<SeguirLeyendo {...baseProps()} />);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when user has no segment (clientId not in either list)', () => {
        mockSegmentReady(null);
        const { container } = render(<SeguirLeyendo {...baseProps()} />);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when articles list is empty', () => {
        useContent.mockReturnValue([]);
        const { container } = render(<SeguirLeyendo {...baseProps()} />);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when noteId is missing', () => {
        const { container } = render(
            <SeguirLeyendo {...baseProps({ noteId: null })} />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('does not crash when testDigits and controlDigits are not provided in customFields', () => {
        expect(() =>
            render(
                <SeguirLeyendo
                    globalContent={{ _id: 'NOTE123' }}
                    outputType="default"
                    isAdmin={false}
                    customFields={{ experimentName: 'Exp01' }}
                />
            )
        ).not.toThrow();
    });

    // ─── segmentAndHide ──────────────────────────────────────────────

    it('renders nothing when segmentAndHide is true even with a valid segment', () => {
        const { container } = render(
            <SeguirLeyendo {...baseProps({ segmentAndHide: true })} />
        );

        expect(container).toBeEmptyDOMElement();
        expect(useNotaSegment).toHaveBeenCalled();
    });

    // ─── Admin warnings ──────────────────────────────────────────────

    it('shows config warning in admin when experimentName is empty', () => {
        render(
            <SeguirLeyendo
                {...baseProps({ experimentName: '', isAdmin: true })}
            />
        );

        expect(screen.getByTestId('pb-message')).toHaveTextContent(
            /Configurá experimento/i
        );
    });

    it('shows config warning in admin when both digit lists are empty', () => {
        render(
            <SeguirLeyendo
                {...baseProps({
                    testDigits: [],
                    controlDigits: [],
                    isAdmin: true
                })}
            />
        );

        expect(screen.getByTestId('pb-message')).toHaveTextContent(
            /Configurá experimento/i
        );
    });

    it('does not show admin warnings to non-admin users when config is invalid', () => {
        useNotaSegment.mockReturnValue({ segment: null, ready: true });
        const { container } = render(
            <SeguirLeyendo
                {...baseProps({
                    testDigits: [],
                    controlDigits: [],
                    isAdmin: false
                })}
            />
        );

        expect(screen.queryByTestId('pb-message')).toBeNull();
        expect(container).toBeEmptyDOMElement();
    });
});
