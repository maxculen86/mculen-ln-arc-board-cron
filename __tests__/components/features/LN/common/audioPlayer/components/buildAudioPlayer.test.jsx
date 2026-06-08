import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import BuildAudioPlayer from '../../../../../../../components/features/LN/common/audioPlayer/components/buildAudioPlayer';
import { audioPlayerStore } from '../../../../../../../components/features/LN/common/audioPlayer/store/audioPlayerStore';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        globalContent: { _id: 'note-123' },
        globalContentConfig: {}
    }))
}));

jest.mock('fusion:environment', () => ({
    BEYONDWORDS_PROJECT_ID: 38983
}));

jest.mock('@ln/ds-common-spinner', () => ({
    Spinner: jest.fn(() => <div data-testid="spinner" />)
}));

jest.mock(
    '../../../../../../../components/features/LN-10-global/common/toasts/renderToastAdapter',
    () => jest.fn()
);

jest.mock(
    '../../../../../../../components/features/LN/common/audioPlayer/helpers',
    () => ({
        ...jest.requireActual(
            '../../../../../../../components/features/LN/common/audioPlayer/helpers'
        ),
        setupBwReproductionTracking: jest.fn()
    })
);

const mockBwPlayer = {
    addEventListener: jest.fn(),
    playbackState: 'playing',
    summary: false,
    destroy: jest.fn()
};

// Simulates the BeyondWords umd script finishing loading: defines the global
// and fires the script's load event so the hook flips isScriptLoaded to true.
const loadBeyondWordsScript = async () => {
    global.BeyondWords = { Player: jest.fn(() => mockBwPlayer) };
    const script = document.querySelector('script[src*="beyondwords"]');
    await act(async () => {
        script.dispatchEvent(new Event('load'));
    });
    return global.BeyondWords.Player;
};

describe('Components - features - LN - common - audioPlayer - components - BuildAudioPlayer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Restore the default (old-template) context: clearAllMocks resets call
        // history but not implementations set via mockReturnValue in a test.
        const { useAppContext } = require('fusion:context');
        useAppContext.mockReturnValue({
            globalContent: { _id: 'note-123' },
            globalContentConfig: {}
        });
        act(() => {
            audioPlayerStore.open('note-123');
        });
    });

    afterEach(() => {
        act(() => {
            audioPlayerStore.close();
        });
        delete global.BeyondWords;
        // The script is shared on purpose (not removed on unmount), so clean it
        // up here to keep tests isolated.
        document
            .querySelectorAll('script[src*="beyondwords"]')
            .forEach(node => node.remove());
    });

    it('renders spinner when content is not yet available', () => {
        render(<BuildAudioPlayer />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders the audio-player target div for BeyondWords', () => {
        render(<BuildAudioPlayer />);
        expect(document.querySelector('.audio-player')).toBeInTheDocument();
    });

    it('injects the BeyondWords script on mount when not already present', () => {
        render(<BuildAudioPlayer />);
        expect(
            document.querySelector('script[src*="beyondwords"]')
        ).toBeInTheDocument();
    });

    it('initializes BeyondWords.Player once the script loads', async () => {
        render(<BuildAudioPlayer />);
        const Player = await loadBeyondWordsScript();
        await waitFor(() => {
            expect(Player).toHaveBeenCalledWith(
                expect.objectContaining({
                    projectId: 38983,
                    sourceId: 'note-123'
                })
            );
        });
    });

    it('does not re-inject the script when BeyondWords is already loaded', () => {
        global.BeyondWords = { Player: jest.fn(() => mockBwPlayer) };
        render(<BuildAudioPlayer />);
        expect(
            document.querySelector('script[src*="beyondwords"]')
        ).not.toBeInTheDocument();
    });

    it('sets error in the store and shows a toast via the legacy system on old templates', async () => {
        const renderToastAdapter = require('../../../../../../../components/features/LN-10-global/common/toasts/renderToastAdapter');
        let noContentHandler;
        mockBwPlayer.addEventListener.mockImplementation((event, handler) => {
            if (event === 'NoContentAvailable') noContentHandler = handler;
        });

        render(<BuildAudioPlayer />);
        await loadBeyondWordsScript();

        await act(async () => {
            noContentHandler?.();
        });

        await waitFor(() => {
            expect(audioPlayerStore.getSnapshot().hasError).toBe(true);
            expect(renderToastAdapter).toHaveBeenCalledWith(
                expect.objectContaining({ variant: 'danger' }),
                false
            );
        });
    });

    it('shows the error toast via the Design System on migrated templates', async () => {
        const { useAppContext } = require('fusion:context');
        useAppContext.mockReturnValue({
            globalContent: { _id: 'note-123' },
            globalContentConfig: {},
            layout: 'LN-nota-storytelling-v2'
        });
        const renderToastAdapter = require('../../../../../../../components/features/LN-10-global/common/toasts/renderToastAdapter');
        let noContentHandler;
        mockBwPlayer.addEventListener.mockImplementation((event, handler) => {
            if (event === 'NoContentAvailable') noContentHandler = handler;
        });

        render(<BuildAudioPlayer />);
        await loadBeyondWordsScript();

        await act(async () => {
            noContentHandler?.();
        });

        await waitFor(() => {
            expect(renderToastAdapter).toHaveBeenCalledWith(
                expect.objectContaining({ variant: 'danger' }),
                true
            );
        });
    });

    it('updates player.summary when isSummary changes and the note has a summary', async () => {
        render(<BuildAudioPlayer />);
        await loadBeyondWordsScript();

        await act(async () => {
            audioPlayerStore.setSummaryAvailable(true);
            audioPlayerStore.setSummary(true);
        });

        await waitFor(() => {
            expect(mockBwPlayer.summary).toBe(true);
        });
    });

    it('keeps player.summary false when the note has no summary, even if the preference is summary', async () => {
        render(<BuildAudioPlayer />);
        await loadBeyondWordsScript();

        await act(async () => {
            audioPlayerStore.setSummaryAvailable(false);
            audioPlayerStore.setSummary(true);
        });

        await waitFor(() => {
            expect(mockBwPlayer.playbackState).toBe('playing');
        });
        expect(mockBwPlayer.summary).toBe(false);
    });
});
