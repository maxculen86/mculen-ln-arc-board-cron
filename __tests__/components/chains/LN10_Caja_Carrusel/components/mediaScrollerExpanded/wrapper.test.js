import React from 'react';
import { render } from '@testing-library/react';
import MediaScrollerExpandedWrapper from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/wrapper';
import { useCajaCarruselContext } from '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext';
import { Dialog } from '@ln/common-ui-dialog';

jest.mock('@ln/common-ui-dialog', () => ({
    Dialog: jest.fn(({ children, isOpen, position, overlay, classnames }) => (
        <div
            data-testid="mock-dialog"
            data-mock-isopen={isOpen}
            data-mock-position={position}
            data-mock-overlay={overlay}
            data-mock-classnames-base={classnames.base}
            data-mock-classnames-wrapper={classnames.wrapper}
        >
            {children}
        </div>
    ))
}));

jest.mock(
    '../../../../../../components/chains/LN10_Caja_Carrusel/components/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

describe('MediaScrollerExpandedWrapper', () => {
    const mockPublish = jest.fn();
    const defaultProps = {
        children: <div>Test Content</div>
    };
    const mockContext = {
        isOpenMediaScrollerExpanded: true,
        onCloseMediaScrollerExpanded: jest.fn()
    };

    beforeEach(() => {
        window.LN = {
            observable: {
                publish: mockPublish
            }
        };
        useCajaCarruselContext.mockReturnValue(mockContext);
        jest.clearAllMocks();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <MediaScrollerExpandedWrapper {...defaultProps} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should render Dialog with correct props', () => {
        render(<MediaScrollerExpandedWrapper {...defaultProps} />);
        expect(Dialog).toHaveBeenCalledWith(
            expect.objectContaining({
                isOpen: true,
                onClose: mockContext.onCloseMediaScrollerExpanded,
                position: 'full',
                overlay: true,
                classnames: {
                    base: 'w-100 h-100dvh bg-light-900',
                    wrapper: 'flex w-100 h-100'
                }
            }),
            undefined
        );
    });

    it('should render Dialog without closeOnClickOutside to preserve ad-interaction UX', () => {
        render(<MediaScrollerExpandedWrapper {...defaultProps} />);
        const [dialogProps] = Dialog.mock.calls[0];
        expect(dialogProps).not.toHaveProperty('closeOnClickOutside');
    });

    it('should publish clearTimeout when expanded', () => {
        render(<MediaScrollerExpandedWrapper {...defaultProps} />);
        expect(mockPublish).toHaveBeenCalledWith('pauseTimeout');
    });

    it('should publish retriggerTimeout when not expanded', () => {
        useCajaCarruselContext.mockReturnValue({
            ...mockContext,
            isOpenMediaScrollerExpanded: false
        });
        render(<MediaScrollerExpandedWrapper {...defaultProps} />);
        expect(mockPublish).toHaveBeenCalledWith('resumeTimeout');
    });

    it('should render children', () => {
        const { getByText } = render(
            <MediaScrollerExpandedWrapper {...defaultProps} />
        );
        expect(getByText('Test Content')).toBeInTheDocument();
    });
});
