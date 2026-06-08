import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatLN from '../../../../../components/features/LN-acumulado/chatIa/default';
import { useChatRuntime } from '@ln/ds-blocks-thread';
import useGetUserData from '../../../../../components/private/common/auth/hooks/useGetUserData';

jest.mock('@ln/ds-blocks-thread', () => ({
    Thread: Object.assign(
        ({ children }) => <div data-testid="thread">{children}</div>,
        {
            Composer: ({ children }) => <div>{children}</div>,
            Viewport: ({ children, className }) => (
                <div data-testid="thread-viewport" className={className}>
                    {children}
                </div>
            ),
            Error: ({ children, className }) => (
                <div data-testid="thread-error" className={className}>
                    {children}
                </div>
            )
        }
    ),
    useChatRuntime: jest.fn()
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/InputChat',
    () => ({
        InputChat: ({ isSubscribed, isGenerating, isBlocked, disabled }) => (
            <div
                data-testid="input-chat"
                data-subscribed={String(isSubscribed)}
                data-generating={String(isGenerating)}
                data-blocked={String(isBlocked)}
                data-disabled={String(disabled)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/MessageContainer',
    () => ({
        MessageContainer: ({ messages, isGenerating }) => (
            <div
                data-testid="message-container"
                data-count={messages.length}
                data-generating={String(isGenerating)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/EmptyState',
    () => ({
        EmptyState: ({ isSubscribed }) => (
            <div
                data-testid="empty-state"
                data-subscribed={String(isSubscribed)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/SkeletonChat',
    () => ({
        SkeletonChat: () => <div data-testid="skeleton-chat" />
    })
);

jest.mock('../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name }) => <span data-testid={`icon-${name}`} />
}));

jest.mock('../../../../../components/features/ui/ln/button/default', () => ({
    __esModule: true,
    default: ({ children, onClick, type, disabled }) => (
        <button
            data-testid="reset-button"
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}));

jest.mock('../../../../../components/features/ui/ln/divider/default', () => ({
    __esModule: true,
    default: () => <hr data-testid="divider" />
}));

jest.mock(
    '../../../../../components/private/common/auth/hooks/useGetUserData',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        SUBSCRIBED_HELPER: { LN: 'ln' }
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/helpers/api',
    () => ({
        createMundialSession: jest.fn(),
        sendMundialChatMessage: jest.fn(),
        getSuggestedQuestions: jest.fn(),
        resolveErrorMessage: jest.fn(),
        FALLBACK_SUGGESTED_QUESTIONS: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3']
    })
);

jest.mock('../../../../../components/private/common/hooks/useTermica', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/common/auth/hooks/useAuthManager',
    () => ({
        __esModule: true,
        default: jest.fn(() => ({
            token: 'mock-token',
            accessToken: 'mock-access-token'
        }))
    })
);

const mockSetMessages = jest.fn();
const mockSetStatus = jest.fn();
const mockSetError = jest.fn();
const mockOnSubmit = jest.fn();

const createRuntime = (overrides = {}) => ({
    status: 'idle',
    messages: [],
    setMessages: mockSetMessages,
    setStatus: mockSetStatus,
    setError: mockSetError,
    onSubmit: mockOnSubmit,
    ...overrides
});

beforeEach(() => {
    jest.clearAllMocks();
    useChatRuntime.mockReturnValue(createRuntime());
    useGetUserData.mockReturnValue({ isSubscribed: true });
});

describe('ChatLN', () => {
    describe('snapshots', () => {
        it('matches snapshot when subscribed and idle', () => {
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('matches snapshot when not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('matches snapshot when blocked', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('matches snapshot when error', () => {
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('heading', () => {
        it('renders the LA NACION IA title', () => {
            render(<ChatLN />);
            expect(screen.getByText('LA NACION IA')).toBeInTheDocument();
        });
    });

    describe('suggested questions', () => {
        it('shows suggestions when idle with no messages', () => {
            render(<ChatLN />);
            expect(screen.getByText('Pregunta 1')).toBeInTheDocument();
            expect(screen.getByText('Pregunta 2')).toBeInTheDocument();
            expect(screen.getByText('Pregunta 3')).toBeInTheDocument();
        });

        it('hides suggestions when there are messages', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );
            render(<ChatLN />);
            expect(screen.queryByText('Pregunta 1')).not.toBeInTheDocument();
        });

        it('hides suggestions when not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(screen.queryByText('Pregunta 1')).not.toBeInTheDocument();
        });

        it('enables suggestion buttons when subscribed', () => {
            render(<ChatLN />);
            const buttons = screen.getAllByRole('button', { name: /Pregunta/ });
            buttons.forEach(btn => expect(btn).not.toBeDisabled());
        });

        it('calls onSubmit with the suggestion text on click', () => {
            render(<ChatLN />);
            fireEvent.click(screen.getByText('Pregunta 1'));
            expect(mockOnSubmit).toHaveBeenCalledWith('Pregunta 1');
        });
    });

    describe('reset button', () => {
        it('shows reset button when blocked', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('reset-button')).toBeInTheDocument();
        });

        it('shows reset button when error (ambiguous / no answer)', () => {
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            render(<ChatLN />);
            expect(screen.getByTestId('reset-button')).toBeInTheDocument();
        });

        it('does not show reset button when idle', () => {
            render(<ChatLN />);
            expect(
                screen.queryByTestId('reset-button')
            ).not.toBeInTheDocument();
        });

        it('does not show reset button when generating', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'generating' })
            );
            render(<ChatLN />);
            expect(
                screen.queryByTestId('reset-button')
            ).not.toBeInTheDocument();
        });

        it('creates new session and resets runtime on reset click', async () => {
            const { createMundialSession, getSuggestedQuestions } =
                jest.requireMock(
                    '../../../../../components/features/LN-acumulado/chatIa/helpers/api'
                );
            createMundialSession.mockResolvedValue({
                session_id: 'new-session-123'
            });
            getSuggestedQuestions.mockResolvedValue([
                'Nueva P1',
                'Nueva P2',
                'Nueva P3'
            ]);

            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            render(<ChatLN />);
            fireEvent.click(screen.getByTestId('reset-button'));

            await waitFor(() => {
                expect(createMundialSession).toHaveBeenCalledWith({
                    userId: undefined,
                    accessToken: 'mock-access-token'
                });
                expect(mockSetMessages).toHaveBeenCalledWith([]);
                expect(mockSetStatus).toHaveBeenCalledWith('idle');
                expect(mockSetError).toHaveBeenCalledWith(null);
                expect(getSuggestedQuestions).toHaveBeenCalledWith({
                    userId: undefined,
                    accessToken: 'mock-access-token'
                });
            });
        });

        it('creates new session and resets runtime on reset click from error state', async () => {
            const { createMundialSession, getSuggestedQuestions } =
                jest.requireMock(
                    '../../../../../components/features/LN-acumulado/chatIa/helpers/api'
                );
            createMundialSession.mockResolvedValue({
                session_id: 'new-session-456'
            });
            getSuggestedQuestions.mockResolvedValue([
                'Nueva P1',
                'Nueva P2',
                'Nueva P3'
            ]);

            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            render(<ChatLN />);
            fireEvent.click(screen.getByTestId('reset-button'));

            await waitFor(() => {
                expect(createMundialSession).toHaveBeenCalled();
                expect(mockSetMessages).toHaveBeenCalledWith([]);
                expect(mockSetStatus).toHaveBeenCalledWith('idle');
                expect(mockSetError).toHaveBeenCalledWith(null);
                expect(getSuggestedQuestions).toHaveBeenCalledWith({
                    userId: undefined,
                    accessToken: 'mock-access-token'
                });
            });
        });
    });

    describe('disclaimer', () => {
        it('shows disclaimer when subscribed', () => {
            render(<ChatLN />);
            expect(
                screen.getByText(/Las respuestas se basan/)
            ).toBeInTheDocument();
        });

        it('hides disclaimer when not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(
                screen.queryByText(/Las respuestas se basan/)
            ).not.toBeInTheDocument();
        });

        it('shows divider only when subscribed', () => {
            render(<ChatLN />);
            expect(screen.getByTestId('divider')).toBeInTheDocument();
        });

        it('hides divider when not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(screen.queryByTestId('divider')).not.toBeInTheDocument();
        });
    });

    describe('InputChat props', () => {
        it('passes disabled=true to InputChat when not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-disabled',
                'true'
            );
        });

        it('passes disabled=false to InputChat when subscribed', () => {
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-disabled',
                'false'
            );
        });

        it('passes isGenerating=true to InputChat when generating', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'generating' })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-generating',
                'true'
            );
        });

        it('passes isBlocked=true to InputChat when blocked', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-blocked',
                'true'
            );
        });

        it('passes isBlocked=true to InputChat when error', () => {
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-blocked',
                'true'
            );
        });
    });

    describe('customFields - hideChat', () => {
        it('hides chat when hideChat is true', () => {
            const { container } = render(
                <ChatLN customFields={{ hideChat: true }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('shows chat when hideChat is false', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            const { container } = render(
                <ChatLN customFields={{ hideChat: false }} />
            );
            expect(container.firstChild).not.toBeNull();
        });
    });

    describe('hideChat and termica coexist', () => {
        let restoreUseTermica;

        beforeEach(() => {
            const useTermica = jest.requireMock(
                '../../../../../components/private/common/hooks/useTermica'
            ).default;
            restoreUseTermica = useTermica.getMockImplementation();
        });

        afterEach(() => {
            const useTermica = jest.requireMock(
                '../../../../../components/private/common/hooks/useTermica'
            ).default;
            useTermica.mockImplementation(restoreUseTermica);
        });

        it('hides chat when termica flag is true even if hideChat is false', () => {
            const useTermica = jest.requireMock(
                '../../../../../components/private/common/hooks/useTermica'
            ).default;
            useTermica.mockImplementation(() => 'true');
            const { container } = render(
                <ChatLN customFields={{ hideChat: false }} />
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('viewport visibility', () => {
        it('applies hidden class to viewport when no messages', () => {
            render(<ChatLN />);
            expect(screen.getByTestId('thread-viewport')).toHaveClass('hidden');
        });

        it('does not apply hidden class when there are messages', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('thread-viewport')).not.toHaveClass(
                'hidden'
            );
        });
    });
});
