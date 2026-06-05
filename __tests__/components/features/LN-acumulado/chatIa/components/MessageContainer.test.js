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
                {message?.response_chat?.descripcion}
            </div>
        )
    })
);

const userMessage = (content = 'Hola') => ({
    message_type: 'output',
    content
});

const assistantMessage = (descripcion = 'Respuesta IA') => ({
    message_type: 'input',
    response_chat: { descripcion, fuentes: [] }
});

describe('MessageContainer', () => {
    it('matches snapshot with empty messages', () => {
        const { container } = render(
            <MessageContainer
                messages={[]}
                isGenerating={false}
                onTypingDone={jest.fn()}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with user and assistant messages', () => {
        const messages = [
            userMessage('¿Quién ganó?'),
            assistantMessage('Argentina')
        ];
        const { container } = render(
            <MessageContainer
                messages={messages}
                isGenerating={false}
                onTypingDone={jest.fn()}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders MessageUserLN for output messages', () => {
        render(
            <MessageContainer
                messages={[userMessage('Pregunta del usuario')]}
                isGenerating={false}
            />
        );

        expect(screen.getByTestId('message-user')).toBeInTheDocument();
        expect(screen.getByText('Pregunta del usuario')).toBeInTheDocument();
    });

    it('renders MessageAssistantLN for input messages', () => {
        render(
            <MessageContainer
                messages={[assistantMessage('Texto IA')]}
                isGenerating={false}
            />
        );

        expect(screen.getByTestId('message-assistant')).toBeInTheDocument();
        expect(screen.getByText('Texto IA')).toBeInTheDocument();
    });

    it('renders nothing for unknown message_type', () => {
        render(
            <MessageContainer
                messages={[{ message_type: 'unknown' }]}
                isGenerating={false}
            />
        );

        expect(screen.queryByTestId('message-user')).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('message-assistant')
        ).not.toBeInTheDocument();
    });

    it('passes isLastOutput=true to the last assistant message', () => {
        const messages = [userMessage(), assistantMessage()];
        render(<MessageContainer messages={messages} isGenerating={false} />);

        const assistant = screen.getByTestId('message-assistant');
        expect(assistant).toHaveAttribute('data-is-last', 'true');
    });

    it('renders Thread.Generating with correct text', () => {
        render(<MessageContainer messages={[]} isGenerating={false} />);

        expect(screen.getByTestId('thread-generating')).toHaveTextContent(
            'Pensando...'
        );
    });
});
