import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageContainer } from '../../../../../../components/features/LN-acumulado/chatIa/components/MessageContainer';

jest.mock('@ln/ds-blocks-thread', () => ({
    Thread: {
        Messages: ({ children, className }) => (
            <div data-testid="thread-messages" className={className}>
                {children}
            </div>
        ),
        Generating: ({ children, className }) => (
            <div data-testid="thread-generating" className={className}>
                {children}
            </div>
        )
    }
}));

jest.mock(
    '../../../../../../components/features/LN-acumulado/chatIa/components/MessageUser',
    () => ({
        MessageUserLN: ({ message }) => (
            <div data-testid="message-user">{message.content}</div>
        )
    })
);

jest.mock(
    '../../../../../../components/features/LN-acumulado/chatIa/components/MessageAssistant',
    () => ({
        MessageAssistantLN: ({ message, isLastOutput, isGenerating }) => (
            <div
                data-testid="message-assistant"
                data-is-last={String(isLastOutput)}
                data-is-generating={String(isGenerating)}
            >
                {message?.data?.message?.answer}
            </div>
        )
    })
);

const userMessage = (content = 'Hola') => ({
    message_type: 'output',
    content
});

const assistantMessage = (answer = 'Respuesta IA', overrides = {}) => ({
    success: true,
    message_type: 'input',
    error: null,
    data: {
        message: {
            query: '',
            answer,
            follow_up_query: null,
            sources: []
        },
        session_id: 'mundial-1',
        chat_count: 1,
        max_reached: false,
        session_status: 'active',
        ...overrides
    }
});

const renderContainer = (messages = []) =>
    render(
        <MessageContainer
            messages={messages}
            isGenerating={false}
            onTypingDone={jest.fn()}
        />
    );

describe('MessageContainer', () => {
    // `message_type` es lo único que distingue quién habla: `output` usuario, `input` asistente
    describe('message routing', () => {
        it('should render the user message when the type is output', () => {
            renderContainer([userMessage('Pregunta del usuario')]);

            expect(screen.getByTestId('message-user')).toBeInTheDocument();
        });

        it('should show the user content when the type is output', () => {
            renderContainer([userMessage('Pregunta del usuario')]);

            expect(
                screen.getByText('Pregunta del usuario')
            ).toBeInTheDocument();
        });

        it('should render the assistant message when the type is input', () => {
            renderContainer([assistantMessage('Texto IA')]);

            expect(screen.getByTestId('message-assistant')).toBeInTheDocument();
        });

        it('should read the answer from data.message when the type is input', () => {
            renderContainer([assistantMessage('Texto IA')]);

            expect(screen.getByText('Texto IA')).toBeInTheDocument();
        });

        it('should render nothing when the message type is unknown', () => {
            renderContainer([{ message_type: 'unknown' }]);

            expect(
                screen.queryByTestId('message-user')
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId('message-assistant')
            ).not.toBeInTheDocument();
        });
    });

    describe('typing animation', () => {
        it('should flag the last assistant message so it animates', () => {
            renderContainer([userMessage(), assistantMessage()]);

            expect(screen.getByTestId('message-assistant')).toHaveAttribute(
                'data-is-last',
                'true'
            );
        });
    });

    describe('generating state', () => {
        it('should render the thinking copy', () => {
            renderContainer();

            expect(screen.getByTestId('thread-generating')).toHaveTextContent(
                'Pensando...'
            );
        });
    });

    describe('snapshots', () => {
        it('should match snapshot when there are no messages', () => {
            const { container } = renderContainer();

            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot with user and assistant messages', () => {
            const { container } = renderContainer([
                userMessage('¿Quién ganó?'),
                assistantMessage('Argentina')
            ]);

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
