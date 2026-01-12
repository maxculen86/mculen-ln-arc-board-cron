import React from 'react';
import { render } from '@testing-library/react';
import PreHeader from '../../../../../../../../components/features/LN/common/header/components/preHeader/default';

jest.mock('fusion:static', () => ({
    __esModule: true,
    default: jest.fn(({ children, id, ...props }) => (
        <div data-testid="static-component" data-id={id} {...props}>
            {children}
        </div>
    ))
}));

jest.mock('@ln/ds-common-preheader', () => ({
    Preheader: jest.fn(({ children, containerClassName, ...props }) => (
        <div
            data-testid="common-preheader"
            className={containerClassName}
            {...props}
        >
            {children}
        </div>
    ))
}));

jest.mock(
    '../../../../../../../../components/features/LN/common/header/components/preHeader/components/Weather',
    () => ({
        __esModule: true,
        default: jest.fn(() => (
            <div data-testid="weather-component">Weather</div>
        ))
    })
);

jest.mock(
    '../../../../../../../../components/features/LN/common/header/components/preHeader/components/Brands',
    () => ({
        __esModule: true,
        default: jest.fn(() => <div data-testid="brands-component">Brands</div>)
    })
);

jest.mock(
    '../../../../../../../../components/private/common/scriptManager/PreHeaderEventsScript',
    () => ({
        __esModule: true,
        default: jest.fn(() => (
            <script
                data-testid="preheader-events-script"
                type="text/javascript"
            />
        ))
    })
);

describe('components - features - LN - common - header - components - preHeader', () => {
    describe('Render', () => {
        it('should render the PreHeader component with all child components', () => {
            const { getByTestId } = render(<PreHeader />);

            const staticComponent = getByTestId('static-component');
            expect(staticComponent).toBeInTheDocument();
            expect(staticComponent).toHaveAttribute('data-id', 'pre-header');

            const commonPreHeader = getByTestId('common-preheader');
            expect(commonPreHeader).toBeInTheDocument();
            expect(commonPreHeader).toHaveClass('hidden lg:flex');

            expect(getByTestId('weather-component')).toBeInTheDocument();
            expect(getByTestId('brands-component')).toBeInTheDocument();
            expect(getByTestId('preheader-events-script')).toBeInTheDocument();
        });
    });

    describe('Snapshots', () => {
        it('should match snapshot with default structure', () => {
            const { asFragment } = render(<PreHeader />);

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
