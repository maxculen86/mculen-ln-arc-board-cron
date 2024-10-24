import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FirmaFeature from '../../../../components/features/LN-nota/firma';
import Context from 'fusion:context';
import AudioPlayer from '../../../../components/private/common/audioNews/AudioPlayer';
import isSSR from '../../../../components/private/LN/common/utils/isSSR';
import { useAudioPlayer } from '../../../../components/private/common/audioNews/hooks/useAudioPlayer';
import { AudioButton } from '../../../../components/private/common/audioNews/components/AudioButton';

jest.mock('../../../../components/private/common/audioNews/AudioPlayer');

jest.mock('../../../../components/private/LN/common/utils/isSSR');

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

jest.mock('fusion:context', () => {
    return jest.fn(component => component);
});

jest.mock('@ln/contenidos-ui-author', () => ({
    Author: jest.fn(() => <div>Author Component</div>)
}));

jest.mock(
    '../../../../components/private/common/audioNews/hooks/useAudioPlayer',
    () => ({
        useAudioPlayer: jest.fn(() => ({
            audioPlayerProps: {
                thermicalAudio: true
            }
        }))
    })
);

jest.mock(
    '../../../../components/private/common/audioNews/components/AudioButton',
    () => ({
        AudioButton: jest.fn(() => <button>Audio Button</button>)
    })
);

describe('components - feature - LN-nota - firma', () => {
    const defaultProps = {
        customFields: {
            position: 'Top',
            withAudio: true
        },
        globalContent: {
            _id: 'DZWJ2VUZDBGM3LTZPSPTHCMJ2A',
            isListenable: true,
            credits: {
                by: [
                    {
                        name: 'Mariano Grondona',
                        additional_properties: {
                            original: {}
                        }
                    }
                ]
            },
            withFirmaDistributor: false,
            distributor: {
                name: 'LA NACION'
            },
            content_elements: []
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default'
        }));
    });

    it('renders correctly with default props', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                withFirmaDistributor: true
            }
        };

        render(<FirmaFeature {...props} />);

        expect(screen.getByText('LA NACION')).toBeInTheDocument();
        expect(screen.getByText('Audio Button')).toBeInTheDocument();
    });

    it('does not render for the distributor "lanacionar"', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                distributor: { name: 'lanacionar' }
            }
        };

        const { container } = render(<FirmaFeature {...props} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the distributor as a partner link when distributor is not LA NACION', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                distributor: { name: 'reuters' },
                withFirmaDistributor: true
            }
        };

        const { container } = render(<FirmaFeature {...props} />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should not render the audio player if withAudio is false', () => {
        const props = {
            ...defaultProps,
            customFields: { withAudio: false }
        };
        render(<FirmaFeature {...props} />);
        expect(AudioPlayer).not.toHaveBeenCalled();
    });
});
