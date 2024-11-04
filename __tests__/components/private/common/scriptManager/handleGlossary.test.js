import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import HandleGlossary from '../../../../../components/private/common/scriptManager/handleGlossary';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(),
}));

describe('HandleGlossary Component', () => {
    const mockDeployment = jest.fn();
    const mockContextPath = '/test-path/';

    beforeEach(() => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: mockContextPath,
        });
        mockDeployment.mockImplementation(path => path);
    });

    test('renders a script tag with the correct src', () => {
        const { container } = render(<HandleGlossary />);

        const scriptTag = container.querySelector('script');
        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute('type', 'application/javascript');
        expect(scriptTag).toHaveAttribute('defer');
        expect(scriptTag).toHaveAttribute(
            'src',
            `${mockContextPath}/resources/js/LN/handleGlossary.min.js`
        );
    });
});