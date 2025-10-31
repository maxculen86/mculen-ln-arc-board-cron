import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GetCriticalCss } from '../../../../components/output-types/criticalCss/foodit';

const MockResource = ({ children }) => {
    const mockData = `.foodit-test { color: #ff6b35; }`;
    return children({ data: mockData });
};

describe('GetCriticalCss Foodit', () => {
    const defaultProps = {
        Resource: MockResource
    };

    it('should return null when Resource is not a function', () => {
        const { container } = render(<GetCriticalCss Resource={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should return null when Resource is undefined', () => {
        const { container } = render(<GetCriticalCss Resource={undefined} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render style tag with critical CSS', () => {
        const { container } = render(<GetCriticalCss {...defaultProps} />);
        const criticalStyle = container.querySelector('#critical-css');

        expect(criticalStyle).toBeInTheDocument();
        expect(criticalStyle.innerHTML).toContain('.foodit-test');
    });

    it('should use correct path and encoding', () => {
        let capturedPath, capturedEncoding;
        const TestResource = ({ path, encoding, children }) => {
            capturedPath = path;
            capturedEncoding = encoding;
            return children({ data: '.test {}' });
        };

        render(<GetCriticalCss Resource={TestResource} />);

        expect(capturedPath).toBe('resources/dist/css/foodit/base/index.css');
        expect(capturedEncoding).toBe('utf8');
    });

    it('should not render when data is empty', () => {
        const EmptyResource = ({ children }) => children({ data: '' });
        const { container } = render(
            <GetCriticalCss Resource={EmptyResource} />
        );

        expect(
            container.querySelector('#critical-css')
        ).not.toBeInTheDocument();
    });

    it('should not render when data is null', () => {
        const NullResource = ({ children }) => children({ data: null });
        const { container } = render(
            <GetCriticalCss Resource={NullResource} />
        );

        expect(
            container.querySelector('#critical-css')
        ).not.toBeInTheDocument();
    });

    it('should maintain expected structure', () => {
        const { asFragment } = render(<GetCriticalCss {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
