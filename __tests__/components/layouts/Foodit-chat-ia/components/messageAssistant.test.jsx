import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Thread } from '@ln/ds-blocks-thread';
import { MessageAssistant } from '../../../../../components/layouts/Foodit-chat-ia/_children/MessageContainer/MessageAssistant';

// `@ln/ds-blocks-thread` va sin mockear: se verifica el render real del markdown

jest.mock('../../../../../components/features/ui/foodit/icon/default', () => ({
    __esModule: true,
    default: ({ name, size }) => (
        <span data-testid="icon" data-name={name} data-size={size} />
    )
}));

const assistantMessage = (answer, overrides = {}) => ({
    success: true,
    message_type: 'input',
    error: null,
    data: {
        message: {
            query: 'tengo pollo y arroz',
            answer,
            follow_up_query: null,
            sources: [],
            ...overrides
        },
        session_id: 'foodit-1',
        chat_count: 1,
        max_reached: false,
        session_status: 'active'
    }
});

// `isLastOutput={false}` desactiva el tipeo: la respuesta se renderiza completa
const renderMessage = (message, props = {}) =>
    render(
        <Thread>
            <MessageAssistant
                message={message}
                isLastOutput={false}
                {...props}
            />
        </Thread>
    );

describe('MessageAssistant', () => {
    describe('markdown rendering', () => {
        it('should render bold text when the answer contains emphasis', () => {
            renderMessage(
                assistantMessage(
                    'Podés hacer **arroz con pollo** en 40 minutos.'
                )
            );

            expect(screen.getByText('arroz con pollo').tagName).toBe('STRONG');
        });

        it('should render list items when the answer contains a list', () => {
            renderMessage(
                assistantMessage('Opciones:\n\n* Pollo al horno\n* Risotto')
            );

            expect(screen.getAllByRole('listitem')).toHaveLength(2);
        });

        it('should render the list content when the answer contains a list', () => {
            renderMessage(
                assistantMessage('Opciones:\n\n* Pollo al horno\n* Risotto')
            );

            expect(screen.getByText('Pollo al horno')).toBeInTheDocument();
        });
    });

    describe('embedded links', () => {
        it('should link to the embedded url when the answer contains a link', () => {
            renderMessage(
                assistantMessage(
                    'Mirá la [receta](https://foodit.lanacion.com.ar/recetas/x/).'
                )
            );

            expect(
                screen.getByRole('link', { name: 'receta' })
            ).toHaveAttribute(
                'href',
                'https://foodit.lanacion.com.ar/recetas/x/'
            );
        });

        it('should open embedded links in a new tab', () => {
            renderMessage(
                assistantMessage(
                    'Mirá la [receta](https://foodit.lanacion.com.ar/recetas/x/).'
                )
            );

            const link = screen.getByRole('link', { name: 'receta' });
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('should not render a link when the url is unsafe', () => {
            renderMessage(
                assistantMessage('Peligro [click](javascript:alert(1)).')
            );

            expect(screen.queryByRole('link')).not.toBeInTheDocument();
        });

        it('should keep the text visible when the url is unsafe', () => {
            renderMessage(
                assistantMessage('Peligro [click](javascript:alert(1)).')
            );

            expect(screen.getByText(/click/)).toBeInTheDocument();
        });
    });

    describe('feedback visibility', () => {
        it('should show the feedback when the message finished rendering', () => {
            const { container } = renderMessage(
                assistantMessage('Respuesta.'),
                {
                    isLastOutput: true,
                    showAfterRender: true
                }
            );

            expect(container.querySelector('button')).toBeInTheDocument();
        });

        it('should hide the feedback while the last message is still typing', () => {
            const { container } = renderMessage(
                assistantMessage('Respuesta.'),
                {
                    isLastOutput: true,
                    showAfterRender: false
                }
            );

            expect(container.querySelector('button')).not.toBeInTheDocument();
        });
    });

    describe('when the response is outside the contract', () => {
        it('should still render without crashing when data is missing', () => {
            renderMessage({
                success: false,
                message_type: 'input',
                error: null
            });

            expect(screen.getByText('Foodit IA:')).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('should match snapshot with a link inside bold text', () => {
            const { container } = renderMessage(
                assistantMessage(
                    'Probá el **[arroz con pollo](https://foodit.lanacion.com.ar/recetas/x/)**.'
                )
            );

            expect(container).toMatchSnapshot();
        });
    });
});
