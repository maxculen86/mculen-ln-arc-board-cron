import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import SignatureFeature from '../../../../../components/features/LN-nota/signature/default';
import AudioPlayer from '../../../../../components/features/LN/common/audioPlayer/default';

jest.mock(
    '../../../../../components/features/LN/common/audioPlayer/default',
    () => jest.fn(() => null)
);

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

jest.mock(
    '../../../../../components/private/common/audioNews/components/AudioButton',
    () => ({
        AudioButton: jest.fn(() => <button>Escuchar Nota</button>)
    })
);

jest.mock(
    '../../../../../components/features/LN-10-global/common/googleButton/default',
    () => ({
        __esModule: true,
        default: jest.fn(({ className }) => (
            <div data-testid="google-button" className={className} />
        ))
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

    it('should not render custom voice when there are multiple authors', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                credits: {
                    by: [
                        {
                            _id: 'paz-rodriguez-niell-160',
                            additional_properties: {
                                original: {
                                    author_type: 'Estándar',
                                    bio_page: '/autor/paz-rodriguez-niell-160/',
                                    byline: 'Paz Rodríguez Niell',
                                    image: 'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F2166339.png?auth=96e4ce5ca889925d6314c78aebcc719bd10a1c2c76150d8e86323936349c7e31&width=80&quality=70&smart=false',
                                    role: 'LA NACION',
                                    voice: '4081'
                                }
                            },
                            name: 'Paz Rodríguez Niell',
                            type: 'author',
                            url: '/autor/paz-rodriguez-niell-160/'
                        },
                        {
                            _id: 'paz-rodriguez-niell-160',
                            additional_properties: {
                                original: {
                                    author_type: 'Estándar',
                                    bio_page: '/autor/paz-rodriguez-niell-160/',
                                    byline: 'Paz Rodríguez Niell',
                                    image: 'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F2166339.png?auth=96e4ce5ca889925d6314c78aebcc719bd10a1c2c76150d8e86323936349c7e31&width=80&quality=70&smart=false',
                                    role: 'LA NACION',
                                    voice: '4081'
                                }
                            },
                            name: 'Paz Rodríguez Niell',
                            type: 'author',
                            url: '/autor/paz-rodriguez-niell-160/'
                        },
                        {
                            _id: 'maia-jastreblansky-5',
                            additional_properties: {
                                original: {
                                    author_type: 'Estándar',
                                    bio_page: '/autor/maia-jastreblansky-5/',
                                    byline: 'Maia Jastreblansky',
                                    image: 'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-prod-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F2531113.png?auth=12f64f3706fd89b24569a9e17d1c0f32f5a6c4a1b37b4ada55c8735d858589b7&width=80&quality=70&smart=false',
                                    role: 'LA NACION',
                                    voice: '4088'
                                }
                            },
                            name: 'Maia Jastreblansky',
                            type: 'author',
                            url: '/autor/maia-jastreblansky-5/'
                        }
                    ]
                }
            }
        };

        const { asFragment } = render(<SignatureFeature {...props} />);
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

    it('renders with storytelling layout adds margin classes', () => {
        const props = {
            ...defaultProps,
            layout: 'LN-nota-storytelling'
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

    it('renders google button with mb-16 when there is an author, position is Top and subtype is noticia', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                subtype: '1'
            }
        };

        const { container } = render(<SignatureFeature {...props} />);
        const googleButton = container.querySelector(
            '[data-testid="google-button"]'
        );

        expect(googleButton).not.toBeNull();
        expect(googleButton.className).toContain('mb-16');
    });

    it('renders google button with md:mb-24 when there is no visible content and subtype is noticia', () => {
        const props = {
            ...defaultProps,
            globalContent: {
                ...defaultProps.globalContent,
                subtype: '1',
                credits: { by: [] },
                distributor: { name: '' },
                withFirmaDistributor: false,
                isListenable: false
            }
        };

        const { container } = render(<SignatureFeature {...props} />);
        const googleButton = container.querySelector(
            '[data-testid="google-button"]'
        );

        expect(googleButton).not.toBeNull();
        expect(googleButton.className).toContain('md:mb-24');
    });
});
