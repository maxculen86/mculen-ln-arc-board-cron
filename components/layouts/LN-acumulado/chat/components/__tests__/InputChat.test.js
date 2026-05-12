import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputChat } from '../InputChat';

const PLACEHOLDER_TEXT =
    'Preguntá a la IA. ¿Qué querés saber acerca del mundial 2026 de la FIFA?';

jest.mock('@ln/ds-blocks-thread', () => ({
    Thread: {
        Input: ({ children, disabled, inputProps }) => (
            <div>
                <input
                    data-testid="chat-input"
                    disabled={disabled}
                    placeholder={inputProps?.placeholder}
                    className={inputProps?.className}
                />
                {children}
            </div>
        )
    }
}));

jest.mock('@ln/ds-common-formcontrol', () => ({
    Formcontrol: {
        Adornment: ({ children }) => <div>{children}</div>
    }
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock('../../../../../features/ui/ln/button/default', () => ({
    __esModule: true,
    default: ({ children, disabled, type }) => (
        <button data-testid="submit-button" disabled={disabled} type={type}>
            {children}
        </button>
    )
}));

jest.mock('../../../../../features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name, className }) => (
        <span data-testid={`icon-${name}`} className={className} />
    )
}));

describe('InputChat', () => {
    it('matches snapshot with default props', () => {
        const { container } = render(<InputChat />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot when disabled', () => {
        const { container } = render(
            <InputChat disabled={true} isGenerating={false} isBlocked={false} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot when isBlocked', () => {
        const { container } = render(<InputChat isBlocked={true} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('shows placeholder when not blocked', () => {
        render(<InputChat isBlocked={false} />);

        expect(screen.getByTestId('chat-input')).toHaveAttribute(
            'placeholder',
            PLACEHOLDER_TEXT
        );
    });

    it('shows empty placeholder when isBlocked', () => {
        render(<InputChat isBlocked={true} />);

        expect(screen.getByTestId('chat-input')).toHaveAttribute(
            'placeholder',
            ''
        );
    });

    it('disables input and button when disabled=true', () => {
        render(<InputChat disabled={true} />);

        expect(screen.getByTestId('chat-input')).toBeDisabled();
        expect(screen.getByTestId('submit-button')).toBeDisabled();
    });

    it('disables input and button when isBlocked=true', () => {
        render(<InputChat isBlocked={true} />);

        expect(screen.getByTestId('chat-input')).toBeDisabled();
        expect(screen.getByTestId('submit-button')).toBeDisabled();
    });

    it('applies disabled placeholder class when isDisabled', () => {
        render(<InputChat disabled={true} />);

        const input = screen.getByTestId('chat-input');
        expect(input.className).toContain('placeholder:text-neutral-300');
        expect(input.className).not.toContain('placeholder:text-base-default');
    });
});
