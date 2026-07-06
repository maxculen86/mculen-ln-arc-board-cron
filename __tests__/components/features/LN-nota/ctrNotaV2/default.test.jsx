import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../../../../components/private/common/hooks/useViewportSize';
import { isSubscribed } from '../../../../../components/private/common/auth/helper/loginHelper';
import { useRankingArticles } from '../../../../../components/features/LN-10/ranking/_helper';
import useNotaSegment from '../../../../../components/private/LN/common/hooks/useNotaSegment';
import CtrNotaV2 from '../../../../../components/features/LN-nota/crtNotaV2/default';

let stickyMobileArticlesToShow;

jest.mock(
    'fusion:context',
    () => ({
        useAppContext: jest.fn()
    }),
    { virtual: true }
);
jest.mock(
    'fusion:prop-types',
    () => {
        const taggedType = { tag: jest.fn(() => ({})) };

        return {
            __esModule: true,
            default: {
                string: taggedType,
                boolean: taggedType,
                label: taggedType,
                list: taggedType,
                bool: taggedType,
                shape: jest.fn(() => taggedType)
            }
        };
    },
    { virtual: true }
);
jest.mock(
    '../../../../../components/private/common/hooks/useViewportSize',
    () => jest.fn()
);
jest.mock(
    '../../../../../components/private/LN/common/hooks/useNotaSegment',
    () => jest.fn()
);
jest.mock(
    '../../../../../components/features/LN-10-global/common/stickyMobile/default',
    () => ({
        StickyMobile: ({ articlesToShow = [] }) => {
            stickyMobileArticlesToShow = articlesToShow;

            return (
                <div data-testid="sticky-mobile">
                    items:{articlesToShow.map(a => a._id).join(',')}
                </div>
            );
        }
    })
);
jest.mock(
    '../../../../../components/private/common/utils/noteTracker/ctrTracker',
    () => ({
        crtViewTracker: () => null
    })
);
jest.mock(
    '../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        isSubscribed: jest.fn(),
        SUBSCRIBED_HELPER: { LN: 'LN' }
    })
);
jest.mock(
    '../../../../../components/features/LN-10/ranking/common/_helper-WebApi',
    () => ({
        getSectionId: jest.fn(() => 'section-123')
    })
);
jest.mock('../../../../../components/features/LN-10/ranking/_helper', () => ({
    useRankingArticles: jest.fn()
}));
jest.mock(
    '../../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage',
    () =>
        function MockPageBuilderMessage({ message }) {
            return <p data-testid="pb-message">{message}</p>;
        }
);

function scrollToY(y) {
    Object.defineProperty(window, 'scrollY', { value: y, writable: true });
    window.dispatchEvent(new Event('scroll'));
}

const mk = (id, opts = {}) => ({
    _id: id,
    website_url: `https://www.lanacion.com.ar/n/${id}`,
    canonical_url: `https://www.lanacion.com.ar/n/${id}`,
    ...opts
});

const segmentCustomFields = ({
    experimentName = 'ExpSticky',
    segmentAndHide = false,
    testDigits = ['1', '3'],
    controlDigits = ['0', '2']
} = {}) => ({
    experimentName,
    segmentAndHide,
    testDigits,
    controlDigits
});

beforeEach(() => {
    jest.clearAllMocks();
    stickyMobileArticlesToShow = undefined;
    useAppContext.mockReturnValue({
        website: 'www.lanacion.com.ar',
        arcSite: 'lanacion',
        globalContent: { _id: 'A' }
    });
    useViewportSize.mockReturnValue('mobile');
    isSubscribed.mockReturnValue(false);
    useNotaSegment.mockReturnValue({ segment: null, ready: true });
    localStorage.setItem('excludeItems', JSON.stringify([]));
});

it('should not render when is not mobile', () => {
    useViewportSize.mockReturnValue('desktop');
    useRankingArticles.mockReturnValue({
        articles: [mk('B'), mk('C'), mk('D')]
    });
    const { container } = render(<CtrNotaV2 />);
    expect(container.firstChild).toBeNull();
});

it('should not render when user is subscribed', () => {
    isSubscribed.mockReturnValue(true);
    useRankingArticles.mockReturnValue({ articles: [mk('B')] });
    const { container } = render(<CtrNotaV2 />);
    expect(container.firstChild).toBeNull();
});

it('should not render when no articles', () => {
    useRankingArticles.mockReturnValue({ articles: [] });
    const { container } = render(<CtrNotaV2 />);
    expect(container.firstChild).toBeNull();
});

it('does not render before scroll trigger; renders after trigger with 3 items', () => {
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    const { queryByTestId } = render(<CtrNotaV2 />);

    act(() => {
        scrollToY(1000);
    });
    expect(queryByTestId('sticky-mobile')).toBeNull();

    act(() => {
        scrollToY(2000);
    });
    const el = screen.getByTestId('sticky-mobile');
    expect(el.textContent).toMatch(/items:B,C,D/);
});

it('includes the 4th to complete 3 items when current is in top3', () => {
    useAppContext.mockReturnValue({
        website: 'www.lanacion.com.ar',
        arcSite: 'lanacion',
        globalContent: { _id: 'B' }
    });

    const list = [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')];
    useRankingArticles.mockReturnValue({ articles: list });

    render(<CtrNotaV2 />);

    act(() => {
        scrollToY(2000);
    });

    const el = screen.getByTestId('sticky-mobile');
    expect(el.textContent).toMatch(/items:A,C,D/);
});

it('passes productive image domains to sticky mobile when ranking image URLs come from sandbox', () => {
    useRankingArticles.mockReturnValue({
        articles: [
            mk('A'),
            mk('B', {
                promo_items: {
                    basic: {
                        url: 'https://sandbox.lanacion.com.ar/resizer/v2/b.jpg?auth=123&width=90',
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://sandbox.lanacion.com.ar/resizer/v2/b.jpg?auth=123&width=90'
                            }
                        ]
                    }
                }
            }),
            mk('C'),
            mk('D')
        ]
    });

    render(<CtrNotaV2 />);

    act(() => {
        scrollToY(2000);
    });

    const el = screen.getByTestId('sticky-mobile');
    expect(el.textContent).toMatch(/items:B,C,D/);
    expect(
        stickyMobileArticlesToShow[0].promo_items.basic.resized_urls[0]
            .resizedUrl
    ).toBe('https://www.lanacion.com.ar/resizer/v2/b.jpg?auth=123&width=90');
    expect(
        stickyMobileArticlesToShow[0].promo_items.basic.resized_urls[0]
            .resizedUrl
    ).not.toBe(
        'https://sandbox.lanacion.com.ar/resizer/v2/b.jpg?auth=123&width=90'
    );
});

it('does not calculate segment and renders normally when segmentation is not configured', () => {
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    render(<CtrNotaV2 />);

    expect(useNotaSegment).toHaveBeenCalledWith({
        experimentName: '',
        testDigits: [],
        controlDigits: [],
        syncStorage: false,
        storageKey: 'SegmentoStickyMobile'
    });

    act(() => {
        scrollToY(2000);
    });

    expect(screen.getByTestId('sticky-mobile')).toBeInTheDocument();
});

it('ignores empty digit list items and keeps the default sticky behavior', () => {
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    render(
        <CtrNotaV2
            customFields={segmentCustomFields({
                experimentName: '',
                testDigits: [''],
                controlDigits: ['   ']
            })}
        />
    );

    expect(useNotaSegment).toHaveBeenCalledWith({
        experimentName: '',
        testDigits: [],
        controlDigits: [],
        syncStorage: false,
        storageKey: 'SegmentoStickyMobile'
    });

    act(() => {
        scrollToY(2000);
    });

    expect(screen.getByTestId('sticky-mobile')).toBeInTheDocument();
});

it('invokes useNotaSegment with the configured customFields and SegmentoStickyMobile key', () => {
    useNotaSegment.mockReturnValue({ segment: 'test', ready: true });
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    render(<CtrNotaV2 customFields={segmentCustomFields()} />);

    expect(useNotaSegment).toHaveBeenCalledWith({
        experimentName: 'ExpSticky',
        testDigits: ['1', '3'],
        controlDigits: ['0', '2'],
        syncStorage: true,
        storageKey: 'SegmentoStickyMobile'
    });
});

it('renders segmented sticky when user is assigned to test', () => {
    useNotaSegment.mockReturnValue({ segment: 'test', ready: true });
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    render(<CtrNotaV2 customFields={segmentCustomFields()} />);

    act(() => {
        scrollToY(2000);
    });

    expect(screen.getByTestId('sticky-mobile')).toBeInTheDocument();
});

it('renders segmented sticky when user is assigned to control', () => {
    useNotaSegment.mockReturnValue({ segment: 'control', ready: true });
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    render(<CtrNotaV2 customFields={segmentCustomFields()} />);

    act(() => {
        scrollToY(2000);
    });

    expect(screen.getByTestId('sticky-mobile')).toBeInTheDocument();
});

it('renders nothing when segmented user has no segment', () => {
    useNotaSegment.mockReturnValue({ segment: null, ready: true });
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    const { queryByTestId } = render(
        <CtrNotaV2 customFields={segmentCustomFields()} />
    );

    act(() => {
        scrollToY(2000);
    });

    expect(queryByTestId('sticky-mobile')).toBeNull();
});

it('renders nothing while segmented user is being computed', () => {
    useNotaSegment.mockReturnValue({ segment: null, ready: false });
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    const { queryByTestId } = render(
        <CtrNotaV2 customFields={segmentCustomFields()} />
    );

    act(() => {
        scrollToY(2000);
    });

    expect(queryByTestId('sticky-mobile')).toBeNull();
});

it('calculates segmentation but hides sticky when segmentAndHide is true', () => {
    useNotaSegment.mockReturnValue({ segment: 'test', ready: true });
    useRankingArticles.mockReturnValue({
        articles: [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')]
    });

    const { queryByTestId } = render(
        <CtrNotaV2
            customFields={segmentCustomFields({ segmentAndHide: true })}
        />
    );

    expect(useNotaSegment).toHaveBeenCalledWith(
        expect.objectContaining({
            experimentName: 'ExpSticky',
            syncStorage: true,
            storageKey: 'SegmentoStickyMobile'
        })
    );

    act(() => {
        scrollToY(2000);
    });

    expect(queryByTestId('sticky-mobile')).toBeNull();
});

it('shows admin warning when segmented config is incomplete', () => {
    render(
        <CtrNotaV2
            isAdmin
            customFields={segmentCustomFields({
                experimentName: '',
                testDigits: ['1'],
                controlDigits: []
            })}
        />
    );

    expect(screen.getByTestId('pb-message')).toHaveTextContent(
        /Configurá experimento/i
    );
});
