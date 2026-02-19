import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import { AudioButton } from '../../../../../../components/private/common/audioNews/components/AudioButton';
import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import getToken from '../../../../../../components/private/common/utils/getToken';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../../components/private/common/utils/getToken');
jest.mock('../../../../../../components/private/common/hooks/useTermica');
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

describe('components - private - common - audioNews - components - AudioButton', () => {
    const mockDispatch = jest.fn();

    const mockGlobalContent = {
        isListenable: true
    };

    const mockGlobalContentConfig = {};

    const defaultProps = {
        variant: 'primary',
        audioPlayerProps: {
            enableButton: false,
            onOpenAudioPlayer: jest.fn(),
            isOpenAudioPlayer: false
        },
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
        useTermica.mockReturnValue(false);
    });

    it('renders without crashing and matches snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it('does not render if withAudio is false', () => {
        renderComponent({ withAudio: false, showListenButton: false });

        expect(screen.queryByText('Escuchar Nota')).toBeNull();
    });

    it('displays tooltip if showTooltipVariantIA is true and no tracking is set', () => {
        localStorage.removeItem('iaAudioAuthorTracking');

        renderComponent();

        expect(screen.getByText('Escuchar Nota')).toBeInTheDocument();
        fireEvent.mouseOver(screen.getByText('Escuchar Nota'));
        expect(screen.getByText('Con la voz de')).toBeInTheDocument();
        expect(screen.getByText('José María Costa')).toBeInTheDocument();
    });

    it('disables button when enableButton is true', () => {
        renderComponent({ audioPlayerProps: { enableButton: true } });

        expect(
            screen.getByText('Escuchar Nota').closest('button')
        ).toBeDisabled();
    });
});
