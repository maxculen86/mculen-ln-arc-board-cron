import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AudioButton } from '../../../../../../components/features/LN-nota/signature/components/audioButton';
import { useAppContext } from 'fusion:context';
import getToken from '../../../../../../components/private/common/utils/getToken';
import { useAudioPlayerState } from '../../../../../../components/features/LN/common/audioPlayer/hooks/useAudioPlayerState';
import { handleClickAudioNews } from '../../../../../../components/features/LN/common/audioPlayer/helpers';
import { useDisclosure } from '@ln/hooks';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../../components/private/common/utils/getToken', () =>
    jest.fn(() => 'mock-token')
);

jest.mock(
    '../../../../../../components/features/LN/common/audioPlayer/hooks/useAudioPlayerState',
    () => ({
        useAudioPlayerState: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/audioPlayer/helpers',
    () => ({
        handleClickAudioNews: jest.fn(),
        getTextAndIconColor: jest.fn(() => ({
            text: 'Escuchando',
            iconColor: '#808080'
        }))
    })
);

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        isSubscribed: jest.fn(() => true),
        SUBSCRIBED_HELPER: { LN: 'LN' }
    })
);

jest.mock('@ln/hooks', () => ({
    useDisclosure: jest.fn(() => ({
        isOpen: false,
        onOpen: jest.fn(),
        onClose: jest.fn()
    }))
}));

jest.mock('@ln/contenidos-ui-animatedicons', () => ({
    AnimatedIcons: jest.fn(({ stopAnimation }) => (
        <span data-testid="animated-icon" data-stop={String(stopAnimation)} />
    ))
}));

jest.mock('../../../../../../components/features/ui/ln/button/default', () =>
    jest.fn(({ id, onClick, disabled, iconLeft, children }) => (
        <button
            data-testid={id || 'button'}
            onClick={onClick}
            disabled={disabled}
        >
            {iconLeft}
            {children}
        </button>
    ))
);

jest.mock('../../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(({ name }) => <span data-testid={`icon-${name}`} />)
);

jest.mock(
    '../../../../../../components/features/LN/common/barrierRequiresSubscription/default',
    () =>
        jest.fn(({ isOpen }) => (isOpen ? <div data-testid="barrier" /> : null))
);

jest.mock(
    '../../../../../../components/features/LN/common/barrierRequiresSubscription/helper',
    () => ({
        barrierMessages: { AUDIO: 'AUDIO_MESSAGE' }
    })
);

const defaultPlayerState = {
    isOpen: false,
    isPlaying: false,
    isSummary: false,
    hasError: false
};

describe('components - features - LN-nota - signature - components - AudioButton', () => {
    const mockGlobalContent = { isListenable: true };
    const mockGlobalContentConfig = {};

    const defaultProps = {
        noteId: 'test-note-id',
        withAudio: true,
        showVariantIa: false,
        showListenButton: true
    };

    const renderComponent = (props = {}) =>
        render(<AudioButton {...defaultProps} {...props} />);

    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({
            globalContent: mockGlobalContent,
            globalContentConfig: mockGlobalContentConfig
        });

        useAudioPlayerState.mockReturnValue(defaultPlayerState);
    });

    it('renders "Escuchar" label and headphone icon when player is closed', () => {
        renderComponent();
        expect(screen.getByText('Escuchar nota')).toBeInTheDocument();
        expect(screen.getByTestId('icon-headphone')).toBeInTheDocument();
        expect(screen.queryByTestId('animated-icon')).not.toBeInTheDocument();
    });

    it('renders "Escuchando" label and animated icon when player is open', () => {
        useAudioPlayerState.mockReturnValue({
            ...defaultPlayerState,
            isOpen: true,
            isPlaying: true
        });
        renderComponent();
        expect(screen.getByText('Escuchando')).toBeInTheDocument();
        expect(screen.getByTestId('animated-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('icon-headphone')).not.toBeInTheDocument();
    });

    it('does not render when withAudio is false', () => {
        const { container } = renderComponent({ withAudio: false });
        expect(container).toBeEmptyDOMElement();
    });

    it('does not render when showListenButton is false', () => {
        const { container } = renderComponent({ showListenButton: false });
        expect(container).toBeEmptyDOMElement();
    });

    it('disables button when isOpen is true', () => {
        useAudioPlayerState.mockReturnValue({
            ...defaultPlayerState,
            isOpen: true
        });
        renderComponent();
        expect(screen.getByTestId('btnAudioSignature')).toBeDisabled();
    });

    it('disables button when hasError is true', () => {
        useAudioPlayerState.mockReturnValue({
            ...defaultPlayerState,
            hasError: true
        });
        renderComponent();
        expect(screen.getByTestId('btnAudioSignature')).toBeDisabled();
    });

    it('calls handleClickAudioNews with correct args on click', () => {
        renderComponent({ showVariantIa: true });
        fireEvent.click(screen.getByTestId('btnAudioSignature'));
        expect(handleClickAudioNews).toHaveBeenCalledWith(
            expect.objectContaining({
                noteId: 'test-note-id',
                globalContent: mockGlobalContent,
                globalContentConfig: mockGlobalContentConfig,
                isSummary: false,
                showVariantIa: true,
                subscription: true,
                token: 'mock-token'
            })
        );
    });

    it('animated icon stops when isPlaying is false', () => {
        useAudioPlayerState.mockReturnValue({
            ...defaultPlayerState,
            isOpen: true,
            isPlaying: false
        });
        renderComponent();
        expect(screen.getByTestId('animated-icon').dataset.stop).toBe('true');
    });

    it('animated icon plays when isPlaying is true', () => {
        useAudioPlayerState.mockReturnValue({
            ...defaultPlayerState,
            isOpen: true,
            isPlaying: true
        });
        renderComponent();
        expect(screen.getByTestId('animated-icon').dataset.stop).toBe('false');
    });

    it('passes login state to BarrierRequiresSubscription', () => {
        const BarrierRequiresSubscription = require('../../../../../../components/features/LN/common/barrierRequiresSubscription/default');
        renderComponent();
        expect(BarrierRequiresSubscription).toHaveBeenCalledWith(
            expect.objectContaining({
                isLogged: true,
                message: 'AUDIO_MESSAGE'
            }),
            undefined
        );
    });

    it('passes isLogged false to BarrierRequiresSubscription when token is null', () => {
        const BarrierRequiresSubscription = require('../../../../../../components/features/LN/common/barrierRequiresSubscription/default');
        BarrierRequiresSubscription.mockClear();
        getToken.mockReturnValue(null);
        renderComponent();
        expect(BarrierRequiresSubscription).toHaveBeenCalledWith(
            expect.objectContaining({
                isLogged: false
            }),
            undefined
        );
    });

    it('passes subscription false to handleClickAudioNews when user is not subscribed', () => {
        const {
            isSubscribed
        } = require('../../../../../../components/private/common/auth/helper/loginHelper');
        isSubscribed.mockReturnValue(false);
        renderComponent();
        fireEvent.click(screen.getByTestId('btnAudioSignature'));
        expect(handleClickAudioNews).toHaveBeenCalledWith(
            expect.objectContaining({
                subscription: false
            })
        );
    });

    it('passes isSummary true to handleClickAudioNews when player state is summary', () => {
        useAudioPlayerState.mockReturnValue({
            ...defaultPlayerState,
            isSummary: true
        });
        renderComponent();
        fireEvent.click(screen.getByTestId('btnAudioSignature'));
        expect(handleClickAudioNews).toHaveBeenCalledWith(
            expect.objectContaining({
                isSummary: true
            })
        );
    });

    it('renders BarrierRequiresSubscription when disclosure isOpen is true', () => {
        useDisclosure.mockReturnValue({
            isOpen: true,
            onOpen: jest.fn(),
            onClose: jest.fn()
        });
        renderComponent();
        expect(screen.getByTestId('barrier')).toBeInTheDocument();
    });

    it('opens the barrier via disclosure onOpen when triggered by click handler', () => {
        const openBarrier = jest.fn();
        useDisclosure.mockReturnValue({
            isOpen: false,
            onOpen: openBarrier,
            onClose: jest.fn()
        });
        renderComponent();
        fireEvent.click(screen.getByTestId('btnAudioSignature'));
        expect(handleClickAudioNews).toHaveBeenCalledWith(
            expect.objectContaining({
                openBarrier
            })
        );
    });
});
