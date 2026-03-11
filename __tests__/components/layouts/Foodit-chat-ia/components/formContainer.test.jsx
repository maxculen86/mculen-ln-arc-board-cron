import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormContainer } from '../../../../../components/layouts/Foodit-chat-ia/_children/formContainer';

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
                    disabled={disabled}
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

describe('FormContainer', () => {
    it('renderiza el placeholder default cuando no hay estados especiales', () => {
        render(
            <FormContainer
                isSessionExpired={false}
                requestLimit={false}
                disableInput={false}
            />
        );

        expect(screen.getByTestId('thread-native-input')).toHaveAttribute(
            'placeholder',
            'Continuá preguntándole a Foodit'
        );
    });

    it('muestra el placeholder de límite alcanzado cuando requestLimit=true', () => {
        render(
            <FormContainer
                isSessionExpired={false}
                requestLimit={true}
                disableInput={false}
            />
        );

        expect(
            screen.queryByTestId('thread-native-input')
        ).not.toBeInTheDocument();
    });

    it('deshabilita el input y el botón cuando disableInput=true', () => {
        render(
            <FormContainer
                isSessionExpired={false}
                requestLimit={false}
                disableInput={true}
            />
        );

        expect(screen.getByTestId('thread-native-input')).toBeDisabled();
        expect(screen.getByTestId('send-button')).toBeDisabled();
        expect(screen.getByTestId('thread-input')).toHaveAttribute(
            'data-disabled',
            'true'
        );
    });

    it('should match snapshot', () => {
        const { container } = render(
            <FormContainer
                isSessionExpired={false}
                requestLimit={false}
                disableInput={true}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
