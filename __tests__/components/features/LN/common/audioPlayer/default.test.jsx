import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AudioPlayer from '../../../../../../components/features/LN/common/audioPlayer/default';
import { audioPlayerStore } from '../../../../../../components/features/LN/common/audioPlayer/store/audioPlayerStore';

jest.mock('@ln/ds-common-portal', () => ({
    Portal: ({ children }) => <>{children}</>
}));

jest.mock('@ln/ds-common-animatepresence', () => ({
    AnimatePresence: ({ show, children }) => (show ? <>{children}</> : null)
}));

jest.mock(
    '../../../../../../components/features/LN/common/audioPlayer/hooks/useAudioPlayerActions',
    () => ({
        useAudioPlayerActions: () => ({ close: jest.fn() })
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/audioPlayer/components/buildAudioPlayer',
    () => jest.fn(() => <div data-testid="build-audio-player" />)
);

jest.mock(
    '../../../../../../components/features/LN/common/audioPlayer/components/summarySwitch',
    () => jest.fn(() => null)
);

jest.mock('../../../../../../components/features/ui/ln/button/default', () =>
    jest.fn(({ onClick, children }) => (
        <button onClick={onClick}>{children}</button>
    ))
);

jest.mock('../../../../../../components/features/ui/ln/icon/default', () =>
    jest.fn(() => null)
);

describe('Components - features - LN - common - audioPlayer - AudioPlayer', () => {
    beforeEach(() => {
        act(() => {
            audioPlayerStore.close();
        });
    });

    it('does not render the drawer content when store is closed', () => {
        render(<AudioPlayer />);
        expect(
            screen.queryByTestId('build-audio-player')
        ).not.toBeInTheDocument();
    });

    it('renders drawer when store is open', () => {
        audioPlayerStore.open('note-123');
        render(<AudioPlayer />);
        expect(screen.getByTestId('build-audio-player')).toBeInTheDocument();
    });

    it('unmounts drawer when store closes', () => {
        audioPlayerStore.open('note-123');
        const { rerender } = render(<AudioPlayer />);
        expect(screen.getByTestId('build-audio-player')).toBeInTheDocument();
        act(() => {
            audioPlayerStore.close();
        });
        rerender(<AudioPlayer />);
        expect(
            screen.queryByTestId('build-audio-player')
        ).not.toBeInTheDocument();
    });
});
