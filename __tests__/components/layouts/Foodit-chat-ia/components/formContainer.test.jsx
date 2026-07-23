import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormContainer } from '../../../../../components/layouts/Foodit-chat-ia/_children/formContainer';

// El `disabled` del root solo llega al wrapper: el textarea lee `inputProps.disabled`
jest.mock('@ln/ds-blocks-thread', () => ({
    Thread: {
        Input: ({ inputProps, disabled, className, children }) => (
            <div
                data-testid="thread-input"
                data-disabled={String(!!disabled)}
                className={className}
            >
                <input
                    data-testid="thread-native-input"
                    disabled={!!inputProps?.disabled}
                    placeholder={inputProps && inputProps.placeholder}
                />
                {children}
            </div>
        )
    }
}));

jest.mock('@ln/ds-common-button', () => ({
    Button: ({ disabled, type, children }) => (
        <button data-testid="send-button" disabled={disabled} type={type}>
            {children}
        </button>
    )
}));

jest.mock('@ln/ds-common-formcontrol', () => ({
    Formcontrol: {
        Adornment: ({ children }) => (
            <div data-testid="adornment">{children}</div>
        ),
        Helpertext: ({ children }) => (
            <div data-testid="helpertext">{children}</div>
        )
    }
}));

jest.mock('../../../../../components/features/ui/foodit/icon/default', () => ({
    __esModule: true,
    default: ({ name }) => <span data-testid="icon">{name}</span>
}));

const renderForm = (props = {}) =>
    render(
        <FormContainer
            isSessionExpired={false}
            requestLimit={false}
            disableInput={false}
            {...props}
        />
    );

describe('FormContainer', () => {
    describe('placeholder', () => {
        it('should show the default placeholder when there is no special state', () => {
            renderForm();

            expect(screen.getByTestId('thread-native-input')).toHaveAttribute(
                'placeholder',
                'Continuá preguntándole a Foodit'
            );
        });

        it('should say the assistant is writing while the answer types', () => {
            renderForm({ isTypingAnswer: true, disableInput: true });

            expect(screen.getByTestId('thread-native-input')).toHaveAttribute(
                'placeholder',
                'Foodit está escribiendo…'
            );
        });

        it('should prefer the error copy over the typing one', () => {
            renderForm({ isTypingAnswer: true, hasError: true });

            expect(screen.getByTestId('thread-native-input')).toHaveAttribute(
                'placeholder',
                '¡Ups! Hubo un error'
            );
        });
    });

    describe('when the request limit is reached', () => {
        it('should not render the input at all', () => {
            renderForm({ requestLimit: true });

            expect(
                screen.queryByTestId('thread-native-input')
            ).not.toBeInTheDocument();
        });
    });

    describe('when the input is disabled', () => {
        it('should disable the native input', () => {
            renderForm({ disableInput: true });

            expect(screen.getByTestId('thread-native-input')).toBeDisabled();
        });

        it('should disable the send button', () => {
            renderForm({ disableInput: true });

            expect(screen.getByTestId('send-button')).toBeDisabled();
        });

        it('should forward the disabled state to the Thread input', () => {
            renderForm({ disableInput: true });

            expect(screen.getByTestId('thread-input')).toHaveAttribute(
                'data-disabled',
                'true'
            );
        });
    });

    describe('snapshots', () => {
        it('should match snapshot when the input is disabled', () => {
            const { container } = renderForm({ disableInput: true });

            expect(container).toMatchSnapshot();
        });
    });
});
