import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from '../../../../../components/features/ui-ln/icon/default';

jest.unmock('../../../../../components/features/ui-ln/icon/default');

const mockAppContext = {
    deployment: jest.fn(path => `https://cdn.test.com${path}`),
    contextPath: '/pf'
};

jest.mock('fusion:context', () => ({
    useAppContext: () => mockAppContext
}));

jest.mock('@ln/ds-common-icon', () => ({
    Icon: ({ path, size, ...props }) => (
        <i data-testid="ds-icon" data-path={path} data-size={size} {...props}>
            <svg>
                <use href={`${path}#icon`} />
            </svg>
        </i>
    )
}));

describe('components - features - ui-ln - icon', () => {
    beforeEach(() => {
        mockAppContext.deployment.mockClear();
    });

    describe('Custom props integration', () => {
        it('should use default type when not specified', () => {
            const { getByTestId } = render(<Icon />);
            const icon = getByTestId('ds-icon');

            expect(icon).toHaveAttribute(
                'data-path',
                'https://cdn.test.com/pf/resources/images/la-nacion-ar-sprite-default.svg'
            );
        });

        it('should use custom type prop', () => {
            const { getByTestId } = render(<Icon type="color" />);
            const icon = getByTestId('ds-icon');

            expect(icon).toHaveAttribute(
                'data-path',
                'https://cdn.test.com/pf/resources/images/la-nacion-ar-sprite-color.svg'
            );
        });

        it('should use default size when not specified', () => {
            const { getByTestId } = render(<Icon />);
            const icon = getByTestId('ds-icon');

            expect(icon).toHaveAttribute('data-size', '24');
        });

        it('should use custom size prop', () => {
            const { getByTestId } = render(<Icon size={32} />);
            const icon = getByTestId('ds-icon');

            expect(icon).toHaveAttribute('data-size', '32');
        });
    });

    describe('Fusion context Integration', () => {
        it('should use contextPath and deployment from useAppContext', () => {
            render(<Icon type="default" />);

            expect(mockAppContext.deployment).toHaveBeenCalledWith(
                '/pf/resources/images/la-nacion-ar-sprite-default.svg'
            );
        });
    });

    describe('Props passthrough', () => {
        it('should pass through additional props to DS component', () => {
            const { getByTestId } = render(
                <Icon
                    type="color"
                    size={16}
                    className="custom-class"
                    id="custom-id"
                    data-custom="test"
                />
            );
            const icon = getByTestId('ds-icon');

            expect(icon).toHaveClass('custom-class');
            expect(icon).toHaveAttribute('id', 'custom-id');
            expect(icon).toHaveAttribute('data-custom', 'test');
        });
    });

    describe('Snapshots', () => {
        it('should maintain expected DOM structure with default props', () => {
            const { asFragment } = render(<Icon />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('should maintain expected DOM structure with custom props', () => {
            const { asFragment } = render(
                <Icon type="color" size={32} className="test-class" />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
