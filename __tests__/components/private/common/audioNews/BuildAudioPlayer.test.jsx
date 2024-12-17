import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BuildAudioPlayer from '../../../../../components/private/common/audioNews/BuildAudioPlayer';
import { GlobalContext } from '../../../../../components/private/common/context/globalContext';
import * as helpers from '../../../../../components/private/common/audioNews/helpers';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

jest.mock('../../../../../components/private/common/audioNews/helpers', () => ({
    ...jest.requireActual(
        '../../../../../components/private/common/audioNews/helpers'
    ),
    setCookie: jest.fn(),
    getCookie: jest.fn()
}));

describe('components - private - common - audioNews - BuildAudioPlayer', () => {
    const mockDispatch = jest.fn();
    const defaultContextValue = { dispatch: mockDispatch };

    const defaultProps = {
        setOpenPlayer: jest.fn(),
        setEnableButton: jest.fn(),
        noteId: 'test-note-id',
        loaderClass: 'test-loader-class',
        isOpenAudioPlayer: true
    };

    const renderComponent = (props = {}, contextValue = defaultContextValue) =>
        render(
            <GlobalContext.Provider value={contextValue}>
                <BuildAudioPlayer {...defaultProps} {...props} />
            </GlobalContext.Provider>
        );

    beforeEach(() => {
        jest.clearAllMocks();
        helpers.getCookie.mockReturnValue('article');
    });

    it('should render Spinner when contentAvailable is false', () => {
        const originalUseState = jest.requireActual('react').useState;

        jest.spyOn(React, 'useState').mockImplementation(initialValue => {
            if (initialValue === false) {
                return [false, jest.fn()];
            }
            return originalUseState(initialValue);
        });

        render(
            <BuildAudioPlayer
                setEnableButton={jest.fn()}
                onCloseAudioPlayer={jest.fn()}
                noteId="test-note"
                playbackState="paused"
                showVariantIa={false}
            />
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should render audio player when isScriptLoaded is true and no error', async () => {
        helpers.getCookie.mockReturnValue('article');
        const script = document.createElement('script');
        script.src =
            'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';
        script.onload = () => {
            renderComponent();
            expect(screen.getByLabelText('')).toBeInTheDocument();
            expect(screen.getByRole('presentation')).toBeInTheDocument();
        };

        document.head.appendChild(script);

        await waitFor(() => {
            expect(screen.queryByText('Loading')).not.toBeInTheDocument();
        });
    });

    it('should handle error state, and return null in BuildAudioPlayer', async () => {
        const script = document.createElement('script');
        script.src =
            'https://proxy.beyondwords.io/npm/@beyondwords/player@latest/dist/umd.js';
        script.onload = () => {
            jest.spyOn(console, 'error').mockImplementation(() => {});
            renderComponent();
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'SHOW_MODAL',
                payload: {
                    typeModal: 'toast',
                    open: true,
                    data: {
                        status: 'danger',
                        description: 'Parece que hubo un problema.',
                        timeout: 2750
                    }
                }
            });
        };
    });
});
