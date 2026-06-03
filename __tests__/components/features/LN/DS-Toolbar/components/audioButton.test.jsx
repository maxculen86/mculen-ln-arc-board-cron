import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioButton } from '../../../../../../components/features/LN/DS-Toolbar/components/audioButton';
import { audioPlayerStore } from '../../../../../../components/features/LN/common/audioPlayer/store/audioPlayerStore';
import { handleClickAudioNews } from '../../../../../../components/features/LN/common/audioPlayer/helpers';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        globalContent: { _id: 'note-123', isListenable: true },
        globalContentConfig: {}
    }))
}));

jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn(() => false)
);

jest.mock('../../../../../../components/private/common/utils/getToken', () =>
    jest.fn(() => 'test-token')
);

jest.mock(
    '../../../../../../components/features/LN/common/audioPlayer/helpers',
    () => ({
        handleClickAudioNews: jest.fn()
    })
);

jest.mock('../../../../../../components/features/ui/ln/button/default', () =>
    jest.fn(({ children, onClick, disabled, id, iconLeft }) => (
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
    jest.fn(() => <span data-testid="icon" />)
);

jest.mock('@ln/contenidos-ui-animatedicons', () => ({
    AnimatedIcons: jest.fn(({ stopAnimation }) => (
        <span data-testid="animated-icon" data-stop={String(stopAnimation)} />
    ))
}));

const defaultProps = {
    noteId: 'note-123',
    showVariantIa: false,
    openBarrier: jest.fn(),
    subscription: true
};

describe('Components - features - LN - DS-Toolbar - components - AudioButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        audioPlayerStore.close();
    });

    it('renders when isListenable is true and termica is off', () => {
        render(<AudioButton {...defaultProps} />);
        expect(screen.getByTestId('btnAudioDesktop')).toBeInTheDocument();
    });

    it('shows "Escuchar" label when player is not open', () => {
        render(<AudioButton {...defaultProps} />);
        expect(screen.getByText('Escuchar')).toBeInTheDocument();
    });

    it('shows "Escuchando" label and animated icon when player is open', () => {
        audioPlayerStore.open('note-123');
        render(<AudioButton {...defaultProps} />);
        expect(screen.getByText('Escuchando')).toBeInTheDocument();
        expect(screen.getByTestId('animated-icon')).toBeInTheDocument();
    });

    it('is disabled when player is open', () => {
        audioPlayerStore.open('note-123');
        render(<AudioButton {...defaultProps} />);
        expect(screen.getByTestId('btnAudioDesktop')).toBeDisabled();
    });

    it('is disabled when hasError is true', () => {
        audioPlayerStore.open('note-123');
        audioPlayerStore.setError();
        render(<AudioButton {...defaultProps} />);
        expect(screen.getByTestId('btnAudioDesktop')).toBeDisabled();
    });

    it('calls handleClickAudioNews with correct args on click', () => {
        render(<AudioButton {...defaultProps} />);
        fireEvent.click(screen.getByTestId('btnAudioDesktop'));
        expect(handleClickAudioNews).toHaveBeenCalledWith(
            expect.objectContaining({
                noteId: 'note-123',
                isSummary: false,
                showVariantIa: false,
                subscription: true
            })
        );
    });

    it('animated icon stops when isPlaying is false', () => {
        audioPlayerStore.open('note-123');
        audioPlayerStore.setPlaying(false);
        render(<AudioButton {...defaultProps} />);
        expect(screen.getByTestId('animated-icon').dataset.stop).toBe('true');
    });

    it('animated icon plays when isPlaying is true', () => {
        audioPlayerStore.open('note-123');
        audioPlayerStore.setPlaying(true);
        render(<AudioButton {...defaultProps} />);
        expect(screen.getByTestId('animated-icon').dataset.stop).toBe('false');
    });
});
