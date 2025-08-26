import React from 'react';
import { render, screen } from '@testing-library/react';
import PowerUpEmbedCard from '../../../../../../components/features/private-global/body/powerUpEmbedCard/foodit';
import {
    getFooditAuthor,
    getHighestPriorityTag
} from '../../../../../../components/features/foodit-global/common/utils/notaFooditHelper';
import { getShortestImage } from '../../../../../../components/private/LN/common/utils/mediaHelper';

jest.mock(
    '../../../../../../components/features/foodit-global/common/CommonCardFoodit/foodit',
    () => {
        return function MockCommonCardFoodit(props) {
            return (
                <article
                    data-testid="foodit-card"
                    onClick={() => {}}
                    data-href={props.linksProps?.href}
                >
                    <h2>{props.title}</h2>
                    <img src={props.src} alt={props.alt} />
                    <div className="author">{props.author}</div>
                    <div className="time">
                        {props.showTime ? `${props.time} min` : ''}
                    </div>
                    <div className="tag">{props.tag}</div>
                    <div className="video-indicator">
                        {props.hasVideo ? 'Has Video' : 'No Video'}
                    </div>
                    <div className="article-id">{props.articleId}</div>
                </article>
            );
        };
    }
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/notaFooditHelper',
    () => ({
        getFooditAuthor: jest.fn(),
        getHighestPriorityTag: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        getShortestImage: jest.fn()
    })
);

describe('PowerUpEmbedCard', () => {
    const mockCompleteData = {
        _id: 'JMSCEZBUUNC4JFJCZEYX7IG4H4',
        embed: {
            config: {
                altTextImage: 'Probá esta versión vegetariana de la pizza',
                arcData: {
                    _id: 'FJ5UOR2HONA5RGOM226UQF24MI',
                    canonical_url:
                        '/recetas/pizza-estilo-tortugas-ninja-la-receta-definitiva-nid03012024/',
                    content_restrictions: {
                        content_code: 'abierta'
                    },
                    credits: {
                        by: [
                            {
                                name: 'Juan Pravata',
                                type: 'author'
                            }
                        ]
                    },
                    headlines: {
                        basic: 'Pizza estilo Tortugas Ninja: La Receta Definitiva!'
                    },
                    label: {
                        autor: {
                            text: 'Usuario'
                        }
                    },
                    promo_items: {
                        basic: {
                            alt_text:
                                'Probá esta versión vegetariana de la pizza',
                            url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/6E3ED45ARFBZ3ADKYOXZVZDP2A.jpg'
                        },
                        receta: {
                            embed: {
                                config: {
                                    counterTime: 30,
                                    counterPortion: 8
                                }
                            }
                        }
                    },
                    taxonomy: {
                        sections: [
                            {
                                _id: '/recetas/saladas/pizza-y-empanadas',
                                name: 'Pizzas y empanadas',
                                path: '/recetas/saladas/pizza-y-empanadas'
                            },
                            {
                                _id: '/recetas/que-cocinar-hoy/facil',
                                name: 'Fácil',
                                path: '/recetas/que-cocinar-hoy/facil'
                            }
                        ]
                    }
                },
                author: 'Juan Pravata',
                category: 'Pizzas y empanadas',
                description: '¡Cowabunga, amantes de la pizza!',
                hasVideo: {
                    _id: 'JYYZL4LYNZFAHBTRKATQ5L5MBM'
                },
                image: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/6E3ED45ARFBZ3ADKYOXZVZDP2A.jpg',
                noteId: 'FJ5UOR2HONA5RGOM226UQF24MI',
                preparationTime: 30,
                publishDate: '2025-07-11T02:10:14.604Z',
                resizedImages: [],
                sections: [
                    {
                        _id: '/recetas/saladas/pizza-y-empanadas',
                        name: 'Pizzas y empanadas',
                        path: '/recetas/saladas/pizza-y-empanadas'
                    }
                ],
                title: 'Pizza estilo Tortugas Ninja: La Receta Definitiva!',
                url: '/recetas/pizza-estilo-tortugas-ninja-la-receta-definitiva-nid03012024/'
            }
        },
        subtype: 'custom-card-embebida',
        type: 'custom_embed'
    };

    beforeEach(() => {
        jest.clearAllMocks();

        getFooditAuthor.mockReturnValue('Juan Pravata');
        getHighestPriorityTag.mockReturnValue('Fácil');
        getShortestImage.mockReturnValue({
            resizedUrl: 'https://example.com/resized.jpg'
        });

        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Successful rendering', () => {
        it('renders with complete data', () => {
            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(screen.getByTestId('foodit-card')).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Pizza estilo Tortugas Ninja: La Receta Definitiva!'
                )
            ).toBeInTheDocument();
            expect(screen.getByText('Juan Pravata')).toBeInTheDocument();
        });

        it('passes correct props to CommonCardFoodit', () => {
            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(
                screen.getByText(
                    'Pizza estilo Tortugas Ninja: La Receta Definitiva!'
                )
            ).toBeInTheDocument();
            expect(screen.getByText('Juan Pravata')).toBeInTheDocument();
            expect(screen.getByText('30 min')).toBeInTheDocument();
            expect(screen.getByText('Fácil')).toBeInTheDocument();
            expect(screen.getByText('Has Video')).toBeInTheDocument();
            expect(
                screen.getByText('FJ5UOR2HONA5RGOM226UQF24MI')
            ).toBeInTheDocument();

            const image = screen.getByRole('img');
            expect(image).toHaveAttribute(
                'src',
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/6E3ED45ARFBZ3ADKYOXZVZDP2A.jpg'
            );
            expect(image).toHaveAttribute(
                'alt',
                'Probá esta versión vegetariana de la pizza'
            );
        });
    });

    describe('Error handling', () => {
        it('returns null when noteId and title are missing', () => {
            const invalidData = {
                embed: {
                    config: {
                        image: 'https://example.com/image.jpg'
                    }
                }
            };

            const { container } = render(
                <PowerUpEmbedCard data={invalidData} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('handles getFooditAuthor error gracefully', () => {
            getFooditAuthor.mockImplementation(() => {
                throw new Error('Author fetch failed');
            });

            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(console.warn).toHaveBeenCalledWith(
                'Error getting author from arcData:',
                expect.any(Error)
            );
            expect(screen.getByTestId('foodit-card')).toBeInTheDocument();
        });

        it('handles getHighestPriorityTag error gracefully', () => {
            getHighestPriorityTag.mockImplementation(() => {
                throw new Error('Priority tag failed');
            });

            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(console.warn).toHaveBeenCalledWith(
                'Error getting priority tag:',
                expect.any(Error)
            );
            expect(screen.getByTestId('foodit-card')).toBeInTheDocument();
        });

        it('handles getShortestImage error gracefully', () => {
            getShortestImage.mockImplementation(() => {
                throw new Error('Image processing failed');
            });

            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(screen.getByTestId('foodit-card')).toBeInTheDocument();
        });
    });

    describe('Data extraction and processing', () => {
        it('correctly processes hasVideo boolean', () => {
            const dataWithVideo = {
                embed: {
                    config: {
                        noteId: 'RECIPE_VIDEO',
                        title: 'Recipe with video',
                        hasVideo: { _id: 'VIDEO_123' }
                    }
                }
            };

            render(<PowerUpEmbedCard data={dataWithVideo} />);

            expect(screen.getByText('Has Video')).toBeInTheDocument();
        });

        it('correctly processes hasVideo when null', () => {
            const dataWithNullVideo = {
                embed: {
                    config: {
                        noteId: 'RECIPE_NULL_VIDEO',
                        title: 'Recipe with null video',
                        hasVideo: null
                    }
                }
            };

            render(<PowerUpEmbedCard data={dataWithNullVideo} />);

            expect(screen.getByText('No Video')).toBeInTheDocument();
        });

        it('processes preparationTime correctly', () => {
            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(screen.getByText('30 min')).toBeInTheDocument();
        });

        it('handles zero preparationTime', () => {
            const dataWithZeroTime = {
                embed: {
                    config: {
                        noteId: 'RECIPE_ZERO_TIME',
                        title: 'Quick recipe',
                        preparationTime: 0
                    }
                }
            };

            render(<PowerUpEmbedCard data={dataWithZeroTime} />);

            expect(screen.queryByText(/min/)).not.toBeInTheDocument();
        });

        it('extracts noteId correctly', () => {
            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(
                screen.getByText('FJ5UOR2HONA5RGOM226UQF24MI')
            ).toBeInTheDocument();
        });

        it('extracts title correctly', () => {
            render(<PowerUpEmbedCard data={mockCompleteData} />);

            expect(
                screen.getByText(
                    'Pizza estilo Tortugas Ninja: La Receta Definitiva!'
                )
            ).toBeInTheDocument();
        });

        it('extracts alt text correctly', () => {
            render(<PowerUpEmbedCard data={mockCompleteData} />);

            const image = screen.getByRole('img');
            expect(image).toHaveAttribute(
                'alt',
                'Probá esta versión vegetariana de la pizza'
            );
        });

        it('should have the correct href for navigation', () => {
            render(<PowerUpEmbedCard data={mockCompleteData} />);

            const card = screen.getByTestId('foodit-card');
            expect(card).toHaveAttribute(
                'data-href',
                '/recetas/pizza-estilo-tortugas-ninja-la-receta-definitiva-nid03012024/'
            );
        });
    });

    describe('Edge cases', () => {
        it('handles empty data object', () => {
            const { container } = render(<PowerUpEmbedCard data={{}} />);
            expect(container.firstChild).toBeNull();
        });

        it('handles null data', () => {
            const { container } = render(<PowerUpEmbedCard data={null} />);
            expect(container.firstChild).toBeNull();
        });

        it('handles undefined data', () => {
            const { container } = render(<PowerUpEmbedCard />);
            expect(container.firstChild).toBeNull();
        });

        it('handles malformed embed structure', () => {
            const malformedData = {
                embed: 'not an object'
            };

            const { container } = render(
                <PowerUpEmbedCard data={malformedData} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('handles non-array sections', () => {
            const dataWithNonArraySections = {
                embed: {
                    config: {
                        noteId: 'RECIPE_BAD_SECTIONS',
                        title: 'Recipe with bad sections',
                        sections: 'not an array'
                    }
                }
            };

            render(<PowerUpEmbedCard data={dataWithNonArraySections} />);

            expect(getHighestPriorityTag).not.toHaveBeenCalled();
        });

        it('handles empty sections array', () => {
            const dataWithEmptySections = {
                embed: {
                    config: {
                        noteId: 'RECIPE_EMPTY_SECTIONS',
                        title: 'Recipe with empty sections',
                        sections: []
                    }
                }
            };

            render(<PowerUpEmbedCard data={dataWithEmptySections} />);

            expect(getHighestPriorityTag).not.toHaveBeenCalled();
        });
    });

    describe('Match snapshot', () => {
        it('matches snapshot with complete data', () => {
            const { asFragment } = render(
                <PowerUpEmbedCard data={mockCompleteData} />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
