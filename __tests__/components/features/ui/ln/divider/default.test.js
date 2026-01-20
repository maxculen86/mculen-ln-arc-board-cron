import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Divider from '../../../../../../components/features/ui/ln/divider/default';

jest.mock('@ln/ds-common-divider', () => ({
    Divider: jest.fn(({ direction, color, ...props }) => (
        <hr
            data-testid="common-divider"
            data-direction={direction}
            data-color={color}
            {...props}
        />
    ))
}));

describe('components - features - ui - ln - divider - default', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with default props', () => {
        const { getByTestId } = render(<Divider />);

        const divider = getByTestId('common-divider');
        expect(divider).toBeInTheDocument();
    });

    it('passes direction="horizontal" by default to CommonDivider', () => {
        const { getByTestId } = render(<Divider />);

        const divider = getByTestId('common-divider');
        expect(divider).toHaveAttribute('data-direction', 'horizontal');
    });

    it('passes color="muted" by default to CommonDivider', () => {
        const { getByTestId } = render(<Divider />);

        const divider = getByTestId('common-divider');
        expect(divider).toHaveAttribute('data-color', 'muted');
    });

    it('allows overriding direction prop', () => {
        const { getByTestId } = render(<Divider direction="vertical" />);

        const divider = getByTestId('common-divider');
        expect(divider).toHaveAttribute('data-direction', 'vertical');
    });

    it('allows overriding color prop', () => {
        const { getByTestId } = render(<Divider color="primary" />);

        const divider = getByTestId('common-divider');
        expect(divider).toHaveAttribute('data-color', 'primary');
    });

    it('passes through additional props to CommonDivider', () => {
        const { getByTestId } = render(
            <Divider className="custom-class" data-custom="value" />
        );

        const divider = getByTestId('common-divider');
        expect(divider).toHaveClass('custom-class');
        expect(divider).toHaveAttribute('data-custom', 'value');
    });

    it('should match snapshot with default props', () => {
        const { asFragment } = render(<Divider />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with custom props', () => {
        const { asFragment } = render(
            <Divider
                direction="vertical"
                color="primary"
                className="custom-divider"
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
