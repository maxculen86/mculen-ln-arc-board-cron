import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../../../../components/private/common/hooks/useViewportSize';
import { isSubscribed } from '../../../../../components/private/common/auth/helper/loginHelper';
import { useRankingArticles } from '../../../../../components/features/LN-10/ranking/_helper';
import CtrNotaV2 from '../../../../../components/features/LN-nota/crtNotaV2/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));
jest.mock(
    '../../../../../components/private/common/hooks/useViewportSize',
    () => jest.fn()
);
jest.mock(
    '../../../../../components/features/LN-10-global/common/stickyMobile/default',
    () => ({
        StickyMobile: ({ articlesToShow = [] }) => (
            <div data-testid="sticky-mobile">
                items:{articlesToShow.map(a => a._id).join(',')}
            </div>
        )
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

beforeEach(() => {
    jest.clearAllMocks();
    useAppContext.mockReturnValue({
        website: 'www.lanacion.com.ar',
        arcSite: 'lanacion',
        globalContent: { _id: 'A' }
    });
    useViewportSize.mockReturnValue('mobile');
    isSubscribed.mockReturnValue(false);
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
