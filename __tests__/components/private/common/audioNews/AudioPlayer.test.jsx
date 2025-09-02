import React from 'react';
import { render, screen } from '@testing-library/react';
import AudioPlayer from '../../../../../components/private/common/audioNews/AudioPlayer';
import hooks, { useDisclosure, useMergeRefs } from '@ln/hooks';
import isSSR from '../../../../../components/private/LN/common/utils/isSSR';

jest.mock('../../../../../components/private/LN/common/utils/isSSR', () => {
    return jest.fn();
});

jest.mock('@ln/hooks', () => {
    return {
        useWindowSize: jest.fn(),
        useOnClickOutside: jest.fn(),
        useDisclosure: jest.fn(),
        useMergeRefs: jest.fn()
    };
});

jest.mock(
    '../../../../../components/private/common/audioNews/BuildAudioPlayer',
    () => {
        return jest.fn(() => (
            <div id="build-audio-player">BuildAudioPlayerMock</div>
        ));
    }
);

describe('components - private - common - audioNews - AudioPlayer', () => {
    const props = {
        noteId: 'CV2AWECQORF4HLDVMFFJCLQ234',
        audioPlayerProps: {
            onCloseAudioPlayer: jest.fn(),
            isOpenAudioPlayer: true,
            setEnableButton: jest.fn()
        },
        showVariantIa: true
    };
    const useDisclosureMock = {
        onOpen: jest.fn(),
        onClose: jest.fn(),
        isOpen: false
    };
    useDisclosure.mockReturnValue({
        ...useDisclosureMock
    });
    beforeAll(() => {
        HTMLDialogElement.prototype.show = jest.fn();
        HTMLDialogElement.prototype.showModal = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    hooks.useWindowSize.mockReturnValue({ width: 1279 });
    isSSR.mockReturnValue(false);

    it('should return empty dom element when component is render in server side', () => {
        isSSR.mockReturnValueOnce(true);
        const { baseElement } = render(<AudioPlayer {...props} />);

        expect(baseElement.firstChild).toBeEmptyDOMElement();
    });

    it('should return AudioPlayer when component is client side', () => {
        render(<AudioPlayer {...props} />);

        expect(screen.getByText('BuildAudioPlayerMock')).toBeInTheDocument();
    });

    it('should not render BuildAudioPlayer when isOpenAudioPlayer is false', () => {
        const mockPropsModified = {
            ...props,
            audioPlayerProps: {
                ...props.audioPlayerProps,
                isOpenAudioPlayer: false
            }
        };
        const { container } = render(<AudioPlayer {...mockPropsModified} />);
        const buildAudioPlayer = container.querySelector('#build-audio-player');
        expect(buildAudioPlayer).toBeNull();
    });

    it('should render the dialog on mobile and tablet viewport < 1280px with buildAudioPlayer inside', () => {
        render(<AudioPlayer {...props} />);
        const dialog = screen.queryByRole('dialog', { hidden: true });
        expect(dialog).toBeInTheDocument();
    });
    it('should match snapshot in mobile/desktop', () => {
        const { baseElement } = render(<AudioPlayer {...props} />);
        expect(baseElement).toMatchSnapshot();
    });

    it('should render only buildAudioPlayer on desktop viewport >= 1280px', () => {
        hooks.useWindowSize.mockReturnValue({ width: 1280 });
        render(<AudioPlayer {...props} />);
        const dialog = screen.queryByRole('dialog', { hidden: true });
        expect(dialog).toBeNull();
        expect(screen.getByText('BuildAudioPlayerMock')).toBeInTheDocument();
    });
    it('should match snapshot in desktop', () => {
        hooks.useWindowSize.mockReturnValue({ width: 1280 });
        const { baseElement } = render(<AudioPlayer {...props} />);
        expect(baseElement).toMatchSnapshot();
    });
});
