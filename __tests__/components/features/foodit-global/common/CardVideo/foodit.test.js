import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardCarouselVideo from '../../../../../../components/features/foodit-global/common/CarrouselVideoFoodit/components/CardVideoCarousel';

jest.mock('@ln/common-ui-image', () => ({
    Image: props => <img {...props} />
}));

jest.mock('@ln/common-ui-text', () => ({
    Text: props => <span {...props} />
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: props => <span {...props} />
}));

jest.mock('@ln/foodit-ui-badge', () => ({
    Badge: props => <span {...props} />
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => {
        return function IconSpriteMock(props) {
            return <i data-testid="icon-sprite" {...props} />;
        };
    }
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/CarrouselVideoFoodit/hooks/hook',
    () => ({
        useHandlePlayVideoCarrusel: jest.fn(),
        useObserverMobAndTab: jest.fn()
    })
);

jest.mock('../../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn()
);

jest.mock(
    '../../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/CarrouselVideoFoodit/hooks/helpers',
    () => ({
        getClassNamesMedia: jest.fn(),
        secondsToMinutes: jest.fn()
    })
);

const isSSR = require('../../../../../../components/private/LN/common/utils/isSSR');

const {
    useCajaCarruselContext
} = require('../../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext');

const {
    getClassNamesMedia,
    secondsToMinutes
} = require('../../../../../../components/features/foodit-global/common/CarrouselVideoFoodit/hooks/helpers');

describe('CardCarouselVideo', () => {
    const baseProps = {
        textTitle: 'Título',
        textAuthor: 'Autor',
        duration: 120,
        badge: 'Fácil',
        cardData: {
            image: { src: 'https://example.com/a.jpg', alt: 'Poster' },
            video: { src: 'https://example.com/a.mp4' }
        }
    };

    let onOpenMediaScrollerExpanded;
    let setCurrentIndex;

    beforeEach(() => {
        jest.clearAllMocks();

        onOpenMediaScrollerExpanded = jest.fn();
        setCurrentIndex = jest.fn();

        useCajaCarruselContext.mockReturnValue({
            onOpenMediaScrollerExpanded,
            setCurrentIndex: jest.fn()
        });

        isSSR.mockReturnValue(false);

        getClassNamesMedia.mockImplementation(playing => ({
            classNamePoster: playing ? 'poster-hidden' : 'poster-visible',
            classNameVideo: playing ? 'video-visible' : 'video-hidden'
        }));

        secondsToMinutes.mockReturnValue('2:00');

        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1440
        });
    });

    it('should render badge, title, author and duration', () => {
        render(<CardCarouselVideo {...baseProps} />);

        expect(screen.getByText('Fácil')).toBeInTheDocument();
        expect(screen.getByText('Título')).toBeInTheDocument();
        expect(screen.getByText('Por Autor')).toBeInTheDocument();

        expect(secondsToMinutes).toHaveBeenCalledWith(120);
        expect(screen.getByText('2:00')).toBeInTheDocument();

        expect(screen.getByRole('img', { name: 'Poster' })).toBeInTheDocument();
        expect(document.querySelector('video')).toBeTruthy();
    });

    it('should not render optional sections if they are empty', () => {
        render(
            <CardCarouselVideo
                textTitle=""
                textAuthor=""
                duration={null}
                badge=""
                cardData={baseProps.cardData}
            />
        );

        expect(screen.queryByText(/Por\s/i)).not.toBeInTheDocument();
        expect(screen.queryByTestId('icon-sprite')).not.toBeInTheDocument();
    });

    it('should open expanded view on click', () => {
        render(<CardCarouselVideo {...baseProps} />);

        const button = screen.getByTestId('card-carousel-video');

        fireEvent.click(button);
        expect(onOpenMediaScrollerExpanded).toHaveBeenCalledTimes(1);
    });

    it('should change isPlaying on hover when desktop', () => {
        render(<CardCarouselVideo {...baseProps} />);

        const button = screen.getByTestId('card-carousel-video');

        expect(getClassNamesMedia).toHaveBeenCalledWith(false);

        fireEvent.mouseEnter(button);
        expect(getClassNamesMedia).toHaveBeenLastCalledWith(true);

        fireEvent.mouseLeave(button);
        expect(getClassNamesMedia).toHaveBeenLastCalledWith(false);
    });

    it('should not change isPlaying on hover when mobile/tablet', () => {
        window.innerWidth = 768;

        render(<CardCarouselVideo {...baseProps} />);

        const button = screen.getByTestId('card-carousel-video');

        fireEvent.mouseEnter(button);
        fireEvent.mouseLeave(button);

        expect(getClassNamesMedia).toHaveBeenCalledTimes(1);
        expect(getClassNamesMedia).toHaveBeenCalledWith(false);
    });
    it('should match snapshot', () => {
        const { asFragment } = render(<CardCarouselVideo {...baseProps} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
