import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaScrollerExpanded from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/mediaScrollerExpanded';
import {
    useObserverItems,
    useHandleNext,
    useHandleBack,
    useScrollTo,
    useUpdateVideoWidth
} from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks';
import { useCajaCarruselContext } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import useHandlerBanner from '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/useHandlerBanner';

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks',
    () => ({
        useObserverItems: jest.fn(),
        useHandleNext: jest.fn(() => jest.fn()),
        useHandleBack: jest.fn(() => jest.fn()),
        useScrollTo: jest.fn(),
        useUpdateVideoWidth: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/hooks/useHandlerBanner',
    () =>
        jest.fn(() => ({
            handleBannerViewed: jest.fn()
        }))
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/helpers',
    () => ({
        resetTracking: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/jwVideoContainer',
    () => {
        const React = require('react');
        // eslint-disable-next-line react/display-name
        return React.forwardRef((props, ref) => (
            <div ref={ref} data-testid="jw-video-container" />
        ));
    }
);

jest.mock('@ln/hooks', () => ({
    useWindowSize: jest.fn(() => ({ width: 390 }))
}));

jest.mock('@ln/contenidos-ui-button', () => ({
    // eslint-disable-next-line react/prop-types
    Button: ({ children, ...rest }) => (
        <button type="button" {...rest}>
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    // eslint-disable-next-line react/prop-types
    Icon: ({ children }) => <span>{children}</span>
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => {
        const React = require('react');
        // eslint-disable-next-line react/display-name
        return function IconSprite() {
            return <svg />;
        };
    }
);

describe('MediaScrollerExpanded', () => {
    let origRAF;

    const defaultProps = {
        listVideoData: [
            { id: 'v1', title: 'Video 1', counterVideo: 1 },
            { id: 'v2', title: 'Video 2', counterVideo: 2 },
            { id: 'v3', title: 'Video 3', counterVideo: 3 }
        ],
        variant: 'vertical'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useCajaCarruselContext.mockReturnValue({
            currentIndex: 2,
            setCurrentIndex: jest.fn()
        });

        origRAF = global.requestAnimationFrame;
        global.requestAnimationFrame = jest.fn();
    });

    afterEach(() => {
        global.requestAnimationFrame = origRAF;
    });

    it('initializes the positioning gate as true so the observer is gated before first paint', () => {
        render(<MediaScrollerExpanded {...defaultProps} />);

        const observerCall = useObserverItems.mock.calls[0];
        const scrollToCall = useScrollTo.mock.calls[0];

        expect(observerCall[0].isInitialPositioningRef.current).toBe(true);
        expect(scrollToCall[0].isInitialPositioningRef.current).toBe(true);
    });

    it('does not own any RAF-based gate-clear timer — useScrollTo is the sole owner of the gate lifecycle', () => {
        render(<MediaScrollerExpanded {...defaultProps} />);

        expect(global.requestAnimationFrame).not.toHaveBeenCalled();
    });
});
