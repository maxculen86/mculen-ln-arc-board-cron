import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCajaCarruselContext } from '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext';
import { Dialog } from '@ln/common-ui-dialog';
import MediaScrollerExpandedWrapper from '../../../../../components/chains/foodit_Carousel_Videos/mediaScrollerExpanded/wrapper';

jest.mock('@ln/common-ui-dialog', () => ({
    Dialog: jest.fn(
        ({
            children,
            isOpen,
            position,
            overlay,
            classnames,
            closeOnClickOutside
        }) => (
            <div
                data-testid="mock-dialog"
                data-mock-isopen={isOpen}
                data-mock-position={position}
                data-mock-overlay={overlay}
                data-mock-close-on-click-outside={closeOnClickOutside}
                data-mock-classnames-base={classnames?.base}
                data-mock-classnames-wrapper={classnames?.wrapper}
            >
                {children}
            </div>
        )
    )
}));

jest.mock(
    '../../../../../components/chains/foodit_Carousel_Videos/cajaCarruselContext',
    () => ({
        useCajaCarruselContext: jest.fn()
    })
);

describe('MediaScrollerExpandedWrapper', () => {
    const defaultProps = {
        children: <div>Test Content</div>
    };
    const mockContext = {
        isOpenMediaScrollerExpanded: true,
        onCloseMediaScrollerExpanded: jest.fn()
    };

    beforeEach(() => {
        useCajaCarruselContext.mockReturnValue(mockContext);
        jest.clearAllMocks();
    });

    it('should render Dialog with correct props', () => {
        render(<MediaScrollerExpandedWrapper {...defaultProps} />);
        expect(Dialog).toHaveBeenCalledWith(
            expect.objectContaining({
                isOpen: true,
                onClose: mockContext.onCloseMediaScrollerExpanded,
                position: 'full',
                overlay: true,
                closeOnClickOutside: true,
                classnames: {
                    base: 'w-100 h-100dvh bg-light-900',
                    wrapper: 'flex w-100 h-100'
                }
            }),
            undefined
        );
    });

    it('should render children when open', () => {
        const { getByText } = render(
            <MediaScrollerExpandedWrapper {...defaultProps} />
        );
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('should return null when not expanded', () => {
        useCajaCarruselContext.mockReturnValue({
            ...mockContext,
            isOpenMediaScrollerExpanded: false
        });
        const { container } = render(
            <MediaScrollerExpandedWrapper {...defaultProps} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <MediaScrollerExpandedWrapper {...defaultProps} />
        );
        expect(container).toMatchSnapshot();
    });
});
