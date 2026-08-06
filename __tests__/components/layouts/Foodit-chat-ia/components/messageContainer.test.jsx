import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Thread } from '@ln/ds-blocks-thread';
import { MessageContainer } from '../../../../../components/layouts/Foodit-chat-ia/_children/MessageContainer/MessageContainer';

// `@ln/ds-blocks-thread` va sin mockear: lo que se testea es su `filter` de `Thread.Error`

jest.mock('../../../../../components/features/ui/foodit/icon/default', () => ({
    __esModule: true,
    default: ({ name }) => <span data-testid="icon" data-name={name} />
}));

jest.mock(
    '../../../../../components/features/foodit-global/common/utils/pushFooditEvent',
    () => ({ pushFooditEvent: jest.fn() })
);

const assistantMessage = {
    success: true,
    message_type: 'input',
    error: null,
    data: {
        message: {
            query: 'tengo pollo y arroz',
            answer: 'Una respuesta.',
            follow_up_query: null,
            sources: []
        },
        session_id: 'foodit-1',
        chat_count: 1,
        max_reached: false,
        session_status: 'active'
    }
};

const userMessage = { message_type: 'output', content: 'hola' };

// El asistente no va último a propósito: sin `isLastOutput` no hay tipeo y se renderiza entero
const renderContainer = ({
    messages = [assistantMessage, userMessage],
    status = 'idle',
    error = null
} = {}) =>
    render(
        <Thread runtime={{ messages, status, error }}>
            <MessageContainer messages={messages} showAfterRenderAssistant />
        </Thread>
    );

const errorText = () => screen.queryByText(/Upssss/);

describe('MessageContainer', () => {
    describe('messages', () => {
        it('should render the assistant answer', () => {
            renderContainer();

            expect(screen.getByText('Una respuesta.')).toBeInTheDocument();
        });

        it('should render the user message', () => {
            renderContainer();

            expect(screen.getByText('hola')).toBeInTheDocument();
        });
    });

    describe('error banner', () => {
        it('should not show the error banner when the session completed normally', () => {
            renderContainer({
                status: 'blocked',
                error: { code: 'session_completed' }
            });

            expect(errorText()).not.toBeInTheDocument();
        });

        it('should show the error banner when the runtime failed', () => {
            renderContainer({
                status: 'error',
                error: { code: 'internal_error' }
            });

            expect(errorText()).toBeInTheDocument();
        });

        it('should not show the error banner when the session was terminated', () => {
            renderContainer({
                status: 'blocked',
                error: { code: 'session_terminated' }
            });

            expect(errorText()).not.toBeInTheDocument();
        });

        it('should not show the error banner when the runtime recovered and is idle', () => {
            renderContainer({
                status: 'idle',
                error: { code: 'internal_error' }
            });

            expect(errorText()).not.toBeInTheDocument();
        });
    });
});
