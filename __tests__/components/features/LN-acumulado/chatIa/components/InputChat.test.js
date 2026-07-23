import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputChat } from '../../../../../../components/features/LN-acumulado/chatIa/components/InputChat';

const PLACEHOLDER_TEXT =
    'Preguntá a la IA. ¿Qué querés saber acerca del mundial 2026 de la FIFA?';

jest.mock('@ln/ds-blocks-thread', () => ({
    Thread: {
        // El `disabled` del root solo llega al wrapper: el textarea lee `inputProps.disabled`
        Input: ({ children, inputProps }) => (
            <div>
                <input
                    data-testid="chat-input"
                    disabled={!!inputProps?.disabled}
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

jest.mock('../../../../../../components/features/ui/ln/button/default', () => ({
    __esModule: true,
    default: ({ children, disabled, type }) => (
        <button data-testid="submit-button" disabled={disabled} type={type}>
            {children}
        </button>
    )
}));

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name, className }) => (
        <span data-testid={`icon-${name}`} className={className} />
    )
}));

describe('InputChat', () => {
    describe('placeholder', () => {
        it('should show the prompt copy when the chat is open', () => {
            render(<InputChat isBlocked={false} />);

            expect(screen.getByTestId('chat-input')).toHaveAttribute(
                'placeholder',
                PLACEHOLDER_TEXT
            );
        });

        it('should show no placeholder when the chat is blocked', () => {
            render(<InputChat isBlocked={true} />);

            expect(screen.getByTestId('chat-input')).toHaveAttribute(
                'placeholder',
                ''
            );
        });
    });

    describe('when the input is disabled', () => {
        it('should disable the text field', () => {
            render(<InputChat disabled={true} />);

            expect(screen.getByTestId('chat-input')).toBeDisabled();
        });

        it('should disable the submit button', () => {
            render(<InputChat disabled={true} />);

            expect(screen.getByTestId('submit-button')).toBeDisabled();
        });

        it('should apply the muted placeholder style', () => {
            render(<InputChat disabled={true} />);

            const input = screen.getByTestId('chat-input');
            expect(input.className).toContain('placeholder:text-neutral-300');
            expect(input.className).not.toContain(
                'placeholder:text-base-default'
            );
        });
    });

    describe('when the chat is blocked', () => {
        it('should disable the text field', () => {
            render(<InputChat isBlocked={true} />);

            expect(screen.getByTestId('chat-input')).toBeDisabled();
        });

        it('should disable the submit button', () => {
            render(<InputChat isBlocked={true} />);

            expect(screen.getByTestId('submit-button')).toBeDisabled();
        });
    });

    describe('snapshots', () => {
        it('should match snapshot with default props', () => {
            const { container } = render(<InputChat />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when disabled', () => {
            const { container } = render(
                <InputChat
                    disabled={true}
                    isGenerating={false}
                    isBlocked={false}
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when blocked', () => {
            const { container } = render(<InputChat isBlocked={true} />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
