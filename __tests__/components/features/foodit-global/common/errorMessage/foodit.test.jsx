import React from 'react';
import { render } from '@testing-library/react';
import { ErrorMessage } from '../../../../../../components/features/foodit-global/common/errorMessage/foodit';

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children }) => <div data-testid="icon">{children}</div>
}));

jest.mock('@ln/common-ui-text', () => ({
    Text: ({ children, className }) => (
        <div className={className} data-testid="text">
            {children}
        </div>
    )
}));

describe('Components - Features - Foodit-gloval - Common - ErrorMessage', () => {
    it('should not render anything when message is empty', () => {
        const { container } = render(<ErrorMessage message="" />);
        expect(container.firstChild).toBeNull();
    });

    it('should render the icon and message when a message is provided', () => {
        const { getByTestId } = render(
            <ErrorMessage message="Test error message" />
        );

        const icon = getByTestId('icon');
        const message = getByTestId('text');

        expect(icon).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent('Test error message');
    });
});
