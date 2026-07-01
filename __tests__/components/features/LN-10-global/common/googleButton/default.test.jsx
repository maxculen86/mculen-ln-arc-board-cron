import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleButton from '../../../../../../components/features/LN-10-global/common/googleButton/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

const { useAppContext } = require('fusion:context');

jest.mock('@ln/contenidos-ui-button', () => ({
    Button: ({ children, className, onClick, title, ...props }) => (
        <button
            className={className}
            onClick={onClick}
            title={title}
            {...props}
        >
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children, ...props }) => <span {...props}>{children}</span>
}));

jest.mock('@ln/common-ui-text', () => ({
    Text: ({ children, className, ...props }) => (
        <span className={className} {...props}>
            {children}
        </span>
    )
}));

jest.mock('@ln/cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock('@ln/ds-common-tooltip', () => {
    const React = require('react');
    function Tooltip({ open, children, placement }) {
        return (
            <div
                data-testid="tooltip"
                data-open={open ? 'true' : 'false'}
                data-placement={placement}
            >
                {open && children}
            </div>
        );
    }
    Tooltip.Trigger = function ({ children }) {
        return <>{children}</>;
    };
    Tooltip.Content = function ({ children }) {
        return <div>{children}</div>;
    };
    return { Tooltip };
});

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => ({ __esModule: true, default: () => <svg /> })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/shareHelper',
    () => ({
        openGoogleDiscoverFollow: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

const mockUseGoogleTooltip = jest.fn(() => ({
    isVisible: true,
    handleClose: jest.fn(),
    handleCTAClick: jest.fn(),
    targetRef: { current: null }
}));

jest.mock(
    '../../../../../../components/features/LN-10-global/common/googleButton/hooks/useGoogleTooltip',
    () => ({
        __esModule: true,
        default: (...args) => mockUseGoogleTooltip(...args)
    })
);

const {
    openGoogleDiscoverFollow
} = require('../../../../../../components/private/LN/common/utils/shareHelper');
const {
    addEventToDataLayerV2
} = require('../../../../../../components/private/LN/common/utils/addEventToDataLayer');

describe('Components - Features - LN-10-Global - common - googleButton - default', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue({
            globalContent: { subtype: '1' }
        });
    });

    const renderGoogleButton = (props = {}) =>
        render(<GoogleButton {...props} />);

    describe('Conditional rendering by subtype', () => {
        it('renders the CTA when subtype is NOTICIA', () => {
            renderGoogleButton();
            expect(
                screen.getByTitle('Agregar LA NACION en Google')
            ).toBeInTheDocument();
        });

        it('renders nothing when subtype is not NOTICIA', () => {
            useAppContext.mockReturnValue({
                globalContent: { subtype: '5' }
            });
            const { container } = renderGoogleButton();
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('CTA responsive wording', () => {
        it('shows the desktop wording "Agregar LA NACION en"', () => {
            renderGoogleButton();
            expect(
                screen.getByText('Agregar LA NACION en')
            ).toBeInTheDocument();
        });
    });

    describe('CTA click', () => {
        it('triggers openGoogleDiscoverFollow and the dataLayer event', () => {
            renderGoogleButton();
            const cta = screen.getByTitle('Agregar LA NACION en Google');
            fireEvent.click(cta);

            expect(openGoogleDiscoverFollow).toHaveBeenCalledTimes(1);
            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'toolbard',
                category: 'nota_ln9',
                label: 'seguir_google'
            });
        });
    });

    describe('Tooltip', () => {
        it('shows tooltip content when isVisible=true (snapshot)', () => {
            const { asFragment } = renderGoogleButton();
            expect(asFragment()).toMatchSnapshot();
        });

        it('hides tooltip content when isVisible=false', () => {
            mockUseGoogleTooltip.mockReturnValueOnce({
                isVisible: false,
                handleClose: jest.fn(),
                handleCTAClick: jest.fn(),
                targetRef: { current: null }
            });
            const { asFragment } = renderGoogleButton();
            expect(screen.queryByText(/medio preferido/)).toBeNull();
            expect(asFragment()).toMatchSnapshot();
        });

        it('uses placement="top" by default', () => {
            renderGoogleButton();
            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-placement',
                'top'
            );
        });

        it('uses the placement received via props', () => {
            renderGoogleButton({ tooltipPlacement: 'right' });
            expect(screen.getByTestId('tooltip')).toHaveAttribute(
                'data-placement',
                'right'
            );
        });

        it('the close button calls handleClose', () => {
            const handleClose = jest.fn();
            mockUseGoogleTooltip.mockReturnValueOnce({
                isVisible: true,
                handleClose,
                handleCTAClick: jest.fn(),
                targetRef: { current: null }
            });
            renderGoogleButton();
            fireEvent.click(screen.getByLabelText('Cerrar'));
            expect(handleClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('Snapshots by placement and visibility', () => {
        it('snapshot with placement top + visible', () => {
            const { asFragment } = renderGoogleButton({
                tooltipPlacement: 'top'
            });
            expect(asFragment()).toMatchSnapshot();
        });

        it('snapshot with placement right + visible', () => {
            const { asFragment } = renderGoogleButton({
                tooltipPlacement: 'right'
            });
            expect(asFragment()).toMatchSnapshot();
        });

        it('snapshot with custom className', () => {
            const { asFragment } = renderGoogleButton({
                className: 'l-none extra-class'
            });
            expect(asFragment()).toMatchSnapshot();
        });

        it('hidden snapshot', () => {
            mockUseGoogleTooltip.mockReturnValueOnce({
                isVisible: false,
                handleClose: jest.fn(),
                handleCTAClick: jest.fn(),
                targetRef: { current: null }
            });
            const { asFragment } = renderGoogleButton();
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
