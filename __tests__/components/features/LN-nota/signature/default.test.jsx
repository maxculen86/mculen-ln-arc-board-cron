import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import { useAudioPlayer } from '../../../../../components/private/common/audioNews/hooks/useAudioPlayer';
import { AudioButton } from '../../../../../components/private/common/audioNews/components/AudioButton';
import SignatureFeature from '../../../../../components/features/LN-nota/signature/default';
import AudioPlayer from '../../../../../components/private/common/audioNews/AudioPlayer';

jest.mock('../../../../../components/private/common/audioNews/AudioPlayer');

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
    Author: jest.fn(() => <div>Mariano Grondona</div>)
}));

jest.mock(
    '../../../../../components/private/common/audioNews/hooks/useAudioPlayer',
    () => ({
        useAudioPlayer: jest.fn(() => ({
            audioPlayerProps: {
                thermicalAudio: true
            }
        }))
    })
);

jest.mock(
    '../../../../../components/private/common/audioNews/components/AudioButton',
    () => ({
        AudioButton: jest.fn(() => <button>Escuchar Nota</button>)
    })
);

describe('components - feature - LN-nota - signature - default', () => {
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
                        _id: 'mariano-grondona',
                        additional_properties: {
                            original: {
                                byline: 'Mariano Grondona',
                                firstName: 'Mariano',
                                lastName: 'Grondona',
                                author_type: 'Estándar',
                                email: '',
                                image: 'https://bucket.glanacion.com/anexos/fotos/85/2089285.png',
                                status: true,
                                role: 'LA NACION',
                                longBio:
                                    'Periodista desde hace más de cuarenta años, es conductor del programa televisivo Hora Clave desde 1989 y columnistas de temas políticos en el diario LA NACION. Es abogado y realizó estudios de sociología en la Universidad de Madrid y de Ciencia Política en el Instituto de Estudios Políticos de la misma ciudad española. Profesor adjunto de Derecho Político en la UBA hasta 1987 y titular de Teoría del Estado entre ese año y 1999, fue académico y profesor visitante e investigador asociado en la Universidad de Harvard, y enseña actualmente en la Universidad CEMA. Además, es autor de varios libros, entre ellos Los pensadores de la Libertad, Bajo el imperio de las ideas morales, La Corrupción, La Argentina como vocación, y Las condiciones culturales del desarrollo económico.',
                                slug: 'mariano-grondona',
                                last_updated_date: '2019-05-06T14:22:12.055Z'
                            }
                        },
                        type: 'author',
                        url: '/autor/mariano-grondona-1/'
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

    it('renders with author signature', () => {
        const { asFragment } = render(<SignatureFeature {...defaultProps} />);

        expect(screen.getByText('Mariano Grondona')).toBeInTheDocument();
        expect(screen.getByText('Escuchar Nota')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with distributor signature', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                withFirmaDistributor: true,
                credits: {
                    by: []
                }
            }
        };

        const { asFragment } = render(<SignatureFeature {...props} />);

        expect(screen.getByText('LA NACION')).toBeInTheDocument();
        expect(screen.getByText('Escuchar Nota')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders without signature when no authors or distributor', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                credits: { by: [] },
                distributor: { name: '' },
                withFirmaDistributor: false
            }
        };
        const { asFragment } = render(<SignatureFeature {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should not render the audio player if withAudio is false', () => {
        const props = {
            ...defaultProps,
            customFields: { withAudio: false }
        };

        render(<SignatureFeature {...props} />);
        expect(AudioPlayer).not.toHaveBeenCalled();
    });
});
