import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Thread } from '@ln/ds-blocks-thread';
import { MessageAssistantLN } from '../../../../../../components/features/LN-acumulado/chatIa/components/MessageAssistant';

// `@ln/ds-blocks-thread` va sin mockear: se verifica el render real del markdown

jest.mock('../../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name }) => <span data-testid={`icon-${name}`} />
}));

jest.mock('../../../../../../components/features/ui/ln/link/default', () => ({
    __esModule: true,
    default: ({ children, href }) => <a href={href}>{children}</a>
}));

jest.mock(
    '../../../../../../components/features/LN-acumulado/chatIa/components/MessageFeedback',
    () => ({
        MessageFeedbackLN: () => <div data-testid="message-feedback" />
    })
);

const assistantMessage = (answer, sources = []) => ({
    success: true,
    message_type: 'input',
    error: null,
    data: {
        message: {
            query: '¿Quién ganó?',
            answer,
            follow_up_query: null,
            sources
        },
        session_id: 'mundial-1',
        chat_count: 1,
        max_reached: false,
        session_status: 'active'
    }
});

// `isLastOutput={false}` desactiva el tipeo: la respuesta se renderiza completa
const renderMessage = (message, props = {}) =>
    render(
        <Thread>
            <MessageAssistantLN
                message={message}
                isLastOutput={false}
                {...props}
            />
        </Thread>
    );

const SOURCE = {
    title: 'Fixture del Mundial',
    url: 'https://canchallena.lanacion.com.ar/fixture/'
};

describe('MessageAssistantLN', () => {
    describe('markdown rendering', () => {
        it('should render the answer from the new contract', () => {
            renderMessage(assistantMessage('Ganó **Argentina** en penales.'));

            expect(screen.getByText('Argentina')).toBeInTheDocument();
        });

        it('should render bold text when the answer contains emphasis', () => {
            renderMessage(assistantMessage('Ganó **Argentina** en penales.'));

            expect(screen.getByText('Argentina').tagName).toBe('STRONG');
        });

        it('should link to the embedded url when the answer contains a link', () => {
            renderMessage(
                assistantMessage(
                    'Mirá el [resumen](https://canchallena.lanacion.com.ar/x/).'
                )
            );

            expect(
                screen.getByRole('link', { name: 'resumen' })
            ).toHaveAttribute('href', 'https://canchallena.lanacion.com.ar/x/');
        });
    });

    describe('sources', () => {
        it('should show the sources heading when the response carries sources', () => {
            renderMessage(assistantMessage('Respuesta.', [SOURCE]));

            expect(screen.getByText('Fuentes:')).toBeInTheDocument();
        });

        it('should read title and url, renamed in the new contract', () => {
            renderMessage(assistantMessage('Respuesta.', [SOURCE]));

            expect(
                screen.getByRole('link', { name: SOURCE.title })
            ).toHaveAttribute('href', SOURCE.url);
        });

        it('should not render the sources block when sources is empty', () => {
            renderMessage(assistantMessage('Respuesta sin fuentes.'));

            expect(screen.queryByText('Fuentes:')).not.toBeInTheDocument();
        });
    });

    describe('when the response is outside the contract', () => {
        it('should still render without crashing when data is missing', () => {
            renderMessage({
                success: false,
                message_type: 'input',
                error: null
            });

            expect(screen.getByTestId('message-feedback')).toBeInTheDocument();
        });
    });
});
