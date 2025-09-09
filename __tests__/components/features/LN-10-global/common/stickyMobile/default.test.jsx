import React from 'react';
import { render, screen } from '@testing-library/react';
import { StickyMobile } from '../../../../../../components/features/LN-10-global/common/stickyMobile/default';
import { useStickyMobile } from '../../../../../../components/features/LN-10-global/common/stickyMobile/_helpers/useStickyMobile';
import stickyMobileData from '../../../../../../__mocks__/data/stickyMobile/stickyMobile.json';

jest.mock(
    '../../../../../../components/features/LN-10-global/common/stickyMobile/_helpers/useStickyMobile',
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
});
