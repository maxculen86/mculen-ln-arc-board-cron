import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chips from '../../../../../components/features/foodit-global/Queryly/_children/chips';

jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({ onClick, style, children }) => (
        <button onClick={onClick} style={style} data-testid="chips-button">
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ size, children }) => (
        <span data-testid="icon" style={{ fontSize: size }}>
            {children}
        </span>
    )
}));

jest.mock(
    '../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => jest.fn(({ name }) => <svg data-testid="icon-sprite">{name}</svg>)
);

describe('Chips Component', () => {
    const mockActionClick = jest.fn();
    const mockText = 'Example Text';

    const setup = () => {
        render(<Chips text={mockText} actionClick={mockActionClick} />);
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the Chips component', () => {
        setup();
        const button = screen.getByTestId('chips-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(mockText);
    });

    it('should render the text passed as prop', () => {
        setup();
        const button = screen.getByTestId('chips-button');
        expect(button).toHaveTextContent(mockText);
    });

    it('should call actionClick when the button is clicked', () => {
        setup();
        const button = screen.getByTestId('chips-button');
        fireEvent.click(button);

        expect(mockActionClick).toHaveBeenCalledTimes(1);
    });

    it('should render the Icon component with size 12', () => {
        setup();
        const icon = screen.getByTestId('icon');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveStyle('font-size: 12px');
    });

    it('should render the IconSprite component with the name "close"', () => {
        setup();
        const iconSprite = screen.getByTestId('icon-sprite');
        expect(iconSprite).toBeInTheDocument();
        expect(iconSprite).toHaveTextContent('close');
    });

    it('should apply the correct button styles', () => {
        setup();
        const button = screen.getByTestId('chips-button');
        expect(button).toHaveStyle('padding: 8px 12px');
    });
});
