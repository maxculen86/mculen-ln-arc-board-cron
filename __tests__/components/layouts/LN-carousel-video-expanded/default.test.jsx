import React from 'react';
import { render } from '@testing-library/react';
import ShareVideo from '../../../../components/features/LN-common/shareVideo/default';
import trackShareView from '../../../../components/layouts/LN-carousel-video-expanded/_helper';
import CarouselVideoExpanded from '../../../../components/layouts/LN-carousel-video-expanded/default';

jest.mock('../../../../components/features/LN-common/shareVideo/default', () =>
    jest.fn(() => <div data-testid="share-video"></div>)
);
jest.mock(
    '../../../../components/layouts/LN-carousel-video-expanded/_helper',
    () => jest.fn()
);
jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('components - layouts - CarouselVideoExpanded - default', () => {
    const mockGlobalContent = {
        _id: 'TdCdBgL',
        headlines: {
            basic: '“Alá y el islam son la verdadera religión”. El grafiti en una iglesia vandalizada en el bastión rebelde en Siria y la luz de esperanza que ven los cristianos'
        }
    };

    it('renders correctly', () => {
        const { getByTestId, asFragment } = render(
            <CarouselVideoExpanded globalContent={mockGlobalContent} />
        );
        expect(getByTestId('share-video')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('calls trackShareView on mount', () => {
        render(<CarouselVideoExpanded globalContent={mockGlobalContent} />);
        expect(trackShareView).toHaveBeenCalledWith(
            'TdCdBgL',
            '“Alá y el islam son la verdadera religión”. El grafiti en una iglesia vandalizada en el bastión rebelde en Siria y la luz de esperanza que ven los cristianos'
        );
    });

    it('passes videoId to ShareVideo', () => {
        render(<CarouselVideoExpanded globalContent={mockGlobalContent} />);
        expect(ShareVideo).toHaveBeenCalledWith(
            { videoId: 'TdCdBgL' },
            undefined
        );
    });
});
