import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { StickyMobile } from '../../../../../../components/features/LN-10-global/common/stickyMobile/default';
import { useStickyMobile } from '../../../../../../components/features/LN-10-global/common/stickyMobile/hooks/useStickyMobile';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import stickyMobileData from '../../../../../../__mocks__/data/stickyMobile/stickyMobile.json';
import {
    getComboIds,
    getComboTitles,
    getTitle
} from '../../../../../../components/features/LN-10-global/common/stickyMobile/_helpers';

jest.mock(
    '../../../../../../components/features/LN-10-global/common/stickyMobile/hooks/useStickyMobile',
    () => ({
        useStickyMobile: jest.fn()
    })
);

jest.mock('@ln/common-ui-dialog', () => {
    const React = require('react');
    const DialogComponent = React.forwardRef(
        ({ children, className, isOpen, ...props }, ref) => {
            if (!isOpen) return null;
            return (
                <div
                    ref={ref}
                    className={className}
                    role="dialog"
                    data-testid={props['data-mrf-recirculation']}
                    {...props}
                >
                    {children}
                </div>
            );
        }
    );

    DialogComponent.Body = ({ children, className, ...props }) => (
        <div className={className} {...props}>
            {children}
        </div>
    );

    DialogComponent.Header = ({ children, className, ...props }) => (
        <div className={className} {...props}>
            {children}
        </div>
    );

    return {
        Dialog: DialogComponent
    };
});

jest.mock('@ln/contenidos-ui-text', () => ({
    Text: ({ children, className, as = 'div', ...props }) => {
        const Component = as;
        return (
            <Component className={className} {...props}>
                {children}
            </Component>
        );
    }
}));

jest.mock('@ln/contenidos-ui-button', () => ({
    Button: ({ children, className, onClick, iconOnly, size, ...props }) => {
        const {
            iconOnly: _,
            size: __,
            ...domProps
        } = { iconOnly, size, ...props };
        return (
            <button className={className} onClick={onClick} {...domProps}>
                {children}
            </button>
        );
    }
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children, className, ...props }) => (
        <div className={className} {...props}>
            {children}
        </div>
    )
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => {
        return function IconSprite({ name, ...props }) {
            return <div data-icon={name} {...props} />;
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

const articlesToShow = stickyMobileData.stickyMobileData;
describe('StickyMobile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useStickyMobile.mockReturnValue({
            displaySticky: true,
            isCollapsed: true,
            ref: React.createRef(),
            closeHandler: jest.fn()
        });
    });

    it('matches snapshot', () => {
        const { container } = render(
            <StickyMobile articlesToShow={articlesToShow} />
        );
        expect(container).toMatchSnapshot();
    });

    it('renders correctly only on mobile (displaySticky true)', () => {
        render(<StickyMobile articlesToShow={articlesToShow} />);
        expect(screen.getByTestId('n_sticky')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toHaveClass('sticky-mobile-v2');
    });

    it('adds "open" class to sticky-mobile-v2-body on swipe up', () => {
        useStickyMobile.mockReturnValue({
            displaySticky: true,
            isCollapsed: false,
            ref: React.createRef(),
            closeHandler: jest.fn()
        });
        const { container } = render(
            <StickyMobile articlesToShow={articlesToShow} />
        );
        const bodyDiv = container.querySelector('.sticky-mobile-v2-body');
        expect(bodyDiv).toHaveClass('open');
    });

    it('does not render on desktop (displaySticky:false)', () => {
        useStickyMobile.mockReturnValue({
            displaySticky: false,
            isCollapsed: false,
            ref: React.createRef(),
            closeHandler: jest.fn()
        });
        const { container } = render(
            <StickyMobile articlesToShow={articlesToShow} />
        );
        expect(container.querySelector('.sticky-mobile-v2')).toBeNull();
        expect(screen.queryByTestId('n_sticky')).not.toBeInTheDocument();
    });

    it('fires ImpressionStickyMobile (collapsed) for the first article only once', () => {
        render(<StickyMobile articlesToShow={articlesToShow} />);

        const first = articlesToShow[0];
        const expected = {
            event: 'ImpresionStickyMobile',
            articleId: first._id,
            title: getTitle(first),
            rest: { number_note: 1 }
        };

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining(expected)
        );

        act(() => {});

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
    });

    it('fires ImpresionStickyMobileCombo (expanded) with combo_notas and combo_titles', () => {
        useStickyMobile.mockReturnValue({
            displaySticky: true,
            isCollapsed: false,
            ref: React.createRef(),
            closeHandler: jest.fn()
        });

        render(<StickyMobile articlesToShow={articlesToShow} />);

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({
                event: 'ImpresionStickyMobileCombo',
                rest: {
                    combo_notas: getComboIds(articlesToShow),
                    combo_titles: getComboTitles(articlesToShow)
                }
            })
        );
    });

    it('sends collapsed impression first, then expanded impression when state changes', () => {
        const hookState = {
            displaySticky: true,
            isCollapsed: true,
            ref: React.createRef(),
            closeHandler: jest.fn()
        };
        useStickyMobile.mockReturnValue(hookState);

        const { rerender } = render(
            <StickyMobile articlesToShow={articlesToShow} />
        );

        const first = articlesToShow[0];
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenLastCalledWith(
            expect.objectContaining({
                event: 'ImpresionStickyMobile',
                articleId: first._id,
                title: getTitle(first),
                rest: { number_note: 1 }
            })
        );

        useStickyMobile.mockReturnValue({
            ...hookState,
            isCollapsed: false
        });
        rerender(<StickyMobile articlesToShow={articlesToShow} />);
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(2);
        expect(addEventToDataLayerV2).toHaveBeenLastCalledWith(
            expect.objectContaining({
                event: 'ImpresionStickyMobileCombo',
                rest: {
                    combo_notas: getComboIds(articlesToShow),
                    combo_titles: getComboTitles(articlesToShow)
                }
            })
        );
    });
});
