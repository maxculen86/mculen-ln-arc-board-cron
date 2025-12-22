import React from 'react';
import { render } from '@testing-library/react';
import { GetCriticalCss } from '../../../../components/output-types/criticalCss/foodit';

const MockResource = ({ path, encoding, children }) => {
    const mockData = `.test-css { color: red; }`;
    return children({ data: mockData });
};

jest.mock('../../../../components/private/common/utils/get', () =>
    jest.fn((obj, path, defaultValue) => {
        if (path === '.undefined') return defaultValue;
        if (path === 'foodit.default')
            return 'resources/dist/css/foodit/base/index.css';
        return defaultValue;
    })
);

jest.mock(
    '../../../../components/private/LN/common/utils/isAllowedSection',
    () => jest.fn(() => false)
);

describe('GetCriticalCss - Critical Tests for Production', () => {
    const defaultProps = {
        layout: 'FooditHome',
        Resource: MockResource,
        globalContent: {
            _id: '/test-section/',
            taxonomy: {
                primary_section: {
                    _id: '/test-section/'
                }
            }
        }
    };

    describe('Defensive Programming - Missing Props', () => {
        it('should NOT fail when layout is undefined', () => {
            expect(() => {
                render(<GetCriticalCss {...defaultProps} layout={undefined} />);
            }).not.toThrow();
        });

        it('should NOT fail when Resource is undefined', () => {
            const { container } = render(
                <GetCriticalCss {...defaultProps} Resource={undefined} />
            );

            expect(container.firstChild).toBeNull();
        });

        it('should NOT fail when Resource is not a function', () => {
            const { container } = render(
                <GetCriticalCss {...defaultProps} Resource="not-a-function" />
            );

            expect(container.firstChild).toBeNull();
        });

        it('should NOT fail when Resource is an object instead of component', () => {
            const { container } = render(
                <GetCriticalCss {...defaultProps} Resource={{}} />
            );

            expect(container.firstChild).toBeNull();
        });

        it('should NOT fail when globalContent is undefined', () => {
            expect(() => {
                render(
                    <GetCriticalCss
                        {...defaultProps}
                        globalContent={undefined}
                    />
                );
            }).not.toThrow();
        });
    });

    describe('Critical Styles Rendering', () => {
        it('should render the <style> tag with id "critical-css"', () => {
            const { container } = render(<GetCriticalCss {...defaultProps} />);
            const criticalStyle = container.querySelector('#critical-css');

            expect(criticalStyle).toBeInTheDocument();
            expect(criticalStyle).toHaveAttribute('id', 'critical-css');
        });

        it('should contain valid CSS in the critical style', () => {
            const { container } = render(<GetCriticalCss {...defaultProps} />);
            const criticalStyle = container.querySelector('#critical-css');

            expect(criticalStyle.innerHTML).toContain(
                '.test-css { color: red; }'
            );
        });

        it('should NOT render tailwind CSS by default (isAllowedSection = false)', () => {
            const { container } = render(<GetCriticalCss {...defaultProps} />);
            const tailwindStyle = container.querySelector(
                '#critical-css-tailwind'
            );

            expect(tailwindStyle).not.toBeInTheDocument();
        });
    });

    describe('Resource Error Handling', () => {
        it('should NOT fail when Resource returns data = null', () => {
            const BrokenResource = ({ children }) => children({ data: null });

            expect(() => {
                render(
                    <GetCriticalCss
                        {...defaultProps}
                        Resource={BrokenResource}
                    />
                );
            }).not.toThrow();
        });

        it('should NOT fail when Resource returns data = undefined', () => {
            const BrokenResource = ({ children }) =>
                children({ data: undefined });

            expect(() => {
                render(
                    <GetCriticalCss
                        {...defaultProps}
                        Resource={BrokenResource}
                    />
                );
            }).not.toThrow();
        });

        it('should NOT fail when Resource returns empty string', () => {
            const EmptyResource = ({ children }) => children({ data: '' });

            const { container } = render(
                <GetCriticalCss {...defaultProps} Resource={EmptyResource} />
            );

            const criticalStyle = container.querySelector('#critical-css');
            expect(criticalStyle).not.toBeInTheDocument();
        });
    });

    describe('Conditional Tailwind CSS Loading', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should load Tailwind when isAllowedSection returns true', () => {
            const isAllowedSection = require('../../../../components/private/LN/common/utils/isAllowedSection');
            isAllowedSection.mockReturnValue(true);

            const { container } = render(<GetCriticalCss {...defaultProps} />);
            const tailwindStyle = container.querySelector(
                '#critical-css-tailwind'
            );

            expect(tailwindStyle).toBeInTheDocument();
            expect(tailwindStyle).toHaveAttribute(
                'id',
                'critical-css-tailwind'
            );
        });

        it('should NOT load Tailwind when isAllowedSection returns false', () => {
            const isAllowedSection = require('../../../../components/private/LN/common/utils/isAllowedSection');
            isAllowedSection.mockReturnValue(false);

            const { container } = render(<GetCriticalCss {...defaultProps} />);
            const tailwindStyle = container.querySelector(
                '#critical-css-tailwind'
            );

            expect(tailwindStyle).not.toBeInTheDocument();
        });
    });

    describe('Security - XSS Prevention', () => {
        it('should NOT execute injected JavaScript in CSS', () => {
            const MaliciousResource = ({ children }) =>
                children({
                    data: '.test { color: red; } </style><script>alert("XSS")</script><style>'
                });

            const { container } = render(
                <GetCriticalCss
                    {...defaultProps}
                    Resource={MaliciousResource}
                />
            );

            const scriptsInContainer = container.querySelectorAll('script');
            const scriptsInDocument = document.querySelectorAll('script');
            expect(scriptsInContainer).toHaveLength(0);
            expect(scriptsInDocument).toHaveLength(0);
        });
    });

    describe('Performance', () => {
        it('should NOT create multiple style elements with the same ID', () => {
            const { rerender, container } = render(
                <GetCriticalCss {...defaultProps} />
            );

            rerender(<GetCriticalCss {...defaultProps} layout="OtherLayout" />);
            rerender(<GetCriticalCss {...defaultProps} layout="FooditHome" />);

            const styleElements = container.querySelectorAll('#critical-css');
            expect(styleElements).toHaveLength(1);
        });
    });

    describe('Regression Prevention', () => {
        it('should maintain expected HTML structure', () => {
            const { asFragment } = render(<GetCriticalCss {...defaultProps} />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('should maintain structure with Tailwind enabled', () => {
            const isAllowedSection = require('../../../../components/private/LN/common/utils/isAllowedSection');
            isAllowedSection.mockReturnValue(true);

            const { asFragment } = render(<GetCriticalCss {...defaultProps} />);
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe('Path Configuration', () => {
        it('should use correct path for foodit default CSS', () => {
            let capturedPaths = [];
            let capturedEncoding;
            const TestResource = ({ path, encoding, children }) => {
                capturedPaths.push(path);
                capturedEncoding = encoding;
                return children({ data: '.test {}' });
            };

            render(
                <GetCriticalCss {...defaultProps} Resource={TestResource} />
            );

            expect(capturedPaths).toContain(
                'resources/dist/css/foodit/base/index.css'
            );
            expect(capturedEncoding).toBe('utf8');
        });

        it('should use correct path for Tailwind CSS when enabled', () => {
            const isAllowedSection = require('../../../../components/private/LN/common/utils/isAllowedSection');
            isAllowedSection.mockReturnValue(true);

            let capturedPaths = [];
            const TestResource = ({ path, encoding, children }) => {
                capturedPaths.push(path);
                return children({ data: '.test {}' });
            };

            render(
                <GetCriticalCss {...defaultProps} Resource={TestResource} />
            );

            expect(capturedPaths).toContain(
                'resources/dist/css/foodit/tailwind/global.css'
            );
        });

        it('should return null when path is not found', () => {
            const get = require('../../../../components/private/common/utils/get');
            get.mockReturnValue('');

            const { container } = render(<GetCriticalCss {...defaultProps} />);

            expect(container.firstChild).toBeNull();
        });
    });
});
