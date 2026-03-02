import React from 'react';
import { render, screen } from '@testing-library/react';
import DsSignature from '../../../../../components/features/LN/DS-Signature/default';

jest.mock('fusion:context', () => {
    const useAppContext = jest.fn();
    return {
        __esModule: true,
        default: Component => Component,
        useAppContext
    };
});

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock(
    '../../../../../components/features/ui/ln/image/default',
    () =>
        ({ src = '', alt = '' }) => (
            <img data-testid="signature-photo" src={src} alt={alt} />
        )
);

jest.mock(
    '../../../../../components/features/ui/ln/link/default',
    () =>
        ({ children, href, ...props }) => (
            <a href={href} {...props}>
                {children}
            </a>
        )
);

jest.mock(
    '../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () =>
        ({ name }) => <i data-testid={`icon-${name}`} />
);

const { useAppContext } = require('fusion:context');

describe('DS-Signature', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue({
            layout: 'LN-nota-storytelling-v2',
            siteProperties: {
                layoutsName: {
                    StoryTellingV2: 'LN-nota-storytelling-v2',
                    NotaOpinion: 'LN-Nota-Opinion'
                }
            }
        });
    });

    it('should render storytelling-v2 signature without photo and with date, time, reading time and author links', () => {
        const globalContent = {
            display_date: '2026-01-15T12:30:00.000Z',
            withFirmaDistributor: true,
            distributor: {
                name: 'Agencia Test',
                mode: 'custom',
                subcategory: '',
                category: ''
            },
            credits: {
                by: [
                    {
                        _id: 'juan-perez-123',
                        type: 'author',
                        name: 'Juan Pérez',
                        additional_properties: {
                            original: {
                                author_type: '',
                                byline: 'Juan Pérez',
                                image: 'https://cdn.test/juan.jpg',
                                role: 'Editor',
                                gplus: 'Editor'
                            }
                        }
                    }
                ]
            },
            subheadlines: { basic: 'Subtitulo de prueba' },
            headlines: { basic: 'Titulo de prueba' },
            planning: { story_length: { word_count_actual: 400 } },
            subtype: 'story'
        };

        render(
            <DsSignature
                customFields={{ position: 'Top' }}
                globalContent={globalContent}
                ignoreDistributor
                showDateTimeAndReadingTime
                showPhoto={false}
            />
        );

        expect(screen.queryByTestId('signature-photo')).not.toBeInTheDocument();
        expect(screen.queryByText('Agencia Test')).not.toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Juan Pérez' })
        ).toHaveAttribute('href', '/autor/juan-perez-123/');
        expect(
            screen.getByText(/\d{1,2} de [a-z]+ de \d{4}/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
        expect(screen.getByText(/minutos? de lectura/i)).toBeInTheDocument();
    });

    it('should render opinion bottom extras with photo, role, bio and socials', () => {
        useAppContext.mockReturnValue({
            layout: 'LN-Nota-Opinion',
            siteProperties: {
                layoutsName: {
                    StoryTellingV2: 'LN-nota-storytelling-v2',
                    NotaOpinion: 'LN-Nota-Opinion'
                }
            }
        });

        const globalContent = {
            distributor: {
                name: 'LA NACION',
                mode: '',
                subcategory: '',
                category: ''
            },
            credits: {
                by: [
                    {
                        _id: 'ana-gomez-456',
                        type: 'author',
                        name: 'Ana Gómez',
                        social_links: [{ site: 'twitter', url: 'anagomez' }],
                        additional_properties: {
                            original: {
                                author_type: '',
                                byline: 'Ana Gómez',
                                image: 'https://cdn.test/ana.jpg',
                                role: 'Editora',
                                gplus: 'Columnista',
                                longBio: 'Bio larga de Ana'
                            }
                        }
                    }
                ]
            }
        };

        render(
            <DsSignature
                customFields={{ position: 'Bottom' }}
                globalContent={globalContent}
            />
        );

        expect(screen.getByTestId('signature-photo')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Ana Gómez' })).toHaveAttribute(
            'href',
            '/autor/ana-gomez-456/'
        );
        expect(screen.getByText('Columnista')).toBeInTheDocument();
        expect(screen.getByText('Bio larga de Ana')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Ir a @anagomez' })
        ).toHaveAttribute('href', 'https://twitter.com/anagomez/');
    });
});
