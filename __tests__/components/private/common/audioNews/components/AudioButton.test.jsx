import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import { AudioButton } from '../../../../../../components/private/common/audioNews/components/AudioButton';
import getToken from '../../../../../../components/private/common/utils/getToken';
import { useAudioPlayerState } from '../../../../../../components/features/LN/common/audioPlayer/hooks/useAudioPlayerState';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../../components/private/common/utils/getToken');

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer'
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/handleCookie',
    () =>
        jest.fn(() => ({
            getCookie: jest.fn().mockReturnValue('article'),
            setCookie: jest.fn()
        }))
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
        getTextAndIconColor: jest.fn(() => ({
            text: 'Escuchando',
            iconColor: '#808080'
        })),
        handleClickAudioNews: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        isSubscribed: jest.fn(() => true),
        SUBSCRIBED_HELPER: { LN: 'LN' }
    })
);

const defaultPlayerState = {
    isOpen: false,
    isPlaying: false,
    isSummary: false,
    hasError: false,
    showVariantIa: false,
    noteId: null
};

describe('components - private - common - audioNews - components - AudioButton', () => {
    const mockGlobalContent = { isListenable: true };
    const mockGlobalContentConfig = {};

    const defaultProps = {
        noteId: 'test-note-id',
        variant: 'primary',
        withAudio: true,
        showListenButton: true,
        authorNames: ['José María Costa'],
        showTooltipVariantIA: true
    };

    const renderComponent = (props = {}) =>
        render(<AudioButton {...defaultProps} {...props} />);

    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({
            globalContent: mockGlobalContent,
            globalContentConfig: mockGlobalContentConfig
        });

        getToken.mockReturnValue('mock-token');
        useAudioPlayerState.mockReturnValue(defaultPlayerState);
    });

    it('renders without crashing and matches snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it('does not render if withAudio is false', () => {
        renderComponent({ withAudio: false, showListenButton: false });
        expect(screen.queryByText('Escuchar Nota')).toBeNull();
    });

    it('displays tooltip if showTooltipVariantIA is true', () => {
        renderComponent();
        expect(screen.getByText('Escuchar Nota')).toBeInTheDocument();
        fireEvent.mouseOver(screen.getByText('Escuchar Nota'));
        expect(screen.getByText('Con la voz de')).toBeInTheDocument();
        expect(screen.getByText('José María Costa')).toBeInTheDocument();
    });

    it('disables button when hasError is true', () => {
        useAudioPlayerState.mockReturnValue({
            ...defaultPlayerState,
            hasError: true
        });
        renderComponent();
        expect(
            screen.getByText('Escuchar Nota').closest('button')
        ).toBeDisabled();
    });
});
