import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import CTRNota, {
    ctrRecommendNote
} from '../../../../components/features/LN-nota/ctrNotaMobile';
import useViewportSize from '../../../../components/private/common/hooks/useViewportSize';
import { isSubscribed } from '../../../../auth/helper/loginHelper';
import { useAppContext } from 'fusion:context';
import '@testing-library/jest-dom';
import StickyMobile from '../../../../components/private/LN/nota/StickyMobile';
import { getDataContent } from '../../../../components/features/LN-10/ranking/_helper';

const mockSetTrigger = jest.fn();

jest.mock('fusion:context', () => ({ useAppContext: jest.fn() }));
jest.mock('../../../../components/private/common/hooks/useViewportSize', () =>
    jest.fn()
);
jest.mock('../../../../auth/helper/loginHelper');
jest.mock('../../../../components/features/LN-10/ranking/_helper', () => ({
    ...jest.requireActual(
        '../../../../components/features/LN-10/ranking/_helper'
    ),
    getDataContent: jest.fn()
}));
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(initial => [initial, mockSetTrigger]),
    useEffect: jest.fn(f => f())
}));

describe('CTRNota', () => {
    it('handles scroll event', () => {
        useAppContext.mockReturnValue({ globalContent: { _id: '123' } });
        useViewportSize.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);

        render(<CTRNota />);
        act(() => {
            window.scrollY = 2801;
            fireEvent.scroll(window);
        });
        expect(mockSetTrigger).toHaveBeenCalledWith(true);
    });

    it('should render text in StickyMobile and check variables', () => {
        const headerText = 'Te puede interesar';
        const articleToShow = {
            title: 'Sample Article',
            url: '/sample-article'
        };

        render(
            <StickyMobile
                headerText={headerText}
                articleToShow={articleToShow}
            />
        );

        expect(screen.getByText('Te puede interesar')).toBeInTheDocument();
        expect(!!headerText).toBe(true);
        expect(!!articleToShow).toBe(true);
    });

    it('should call getDataContent with expected parameters', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                _id: '/sociedad',
                node_type: 'section'
            },
            website: 'la-nacion-ar',
            arcSite: 'la-nacion-ar'
        });
        useViewportSize.mockReturnValue('mobile');
        isSubscribed.mockReturnValue(false);

        render(<CTRNota />);

        expect(getDataContent).toHaveBeenCalledWith(
            'sociedad',
            '',
            'la-nacion-ar',
            '',
            'ctrMobile'
        );
    });

    it('ctrRecommendNote should return the correct article', () => {
        const articles = [
            { _id: '1', canonical_url: 'url1' },
            { _id: '2', canonical_url: 'url2' },
            { _id: '3', canonical_url: 'url3' }
        ];
        const articlesSeen = ['url1'];
        const actualArticleId = '3';

        const result = ctrRecommendNote(
            articles,
            articlesSeen,
            actualArticleId
        );

        expect(result._id).toBe('2');
    });
});
