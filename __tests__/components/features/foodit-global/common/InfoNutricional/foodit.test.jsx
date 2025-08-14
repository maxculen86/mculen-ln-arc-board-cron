import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigationData } from '../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData';
import { NutritionalInfo } from '../../../../../../components/features/foodit-global/common/nutritionalInfo/foodit';

jest.mock(
    '../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData'
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/nutritionalInfo/component/cardInfo.jsx',
    () => ({
        NutritionalInfoCard: ({ title, cant, udm }) => (
            <div data-testid={`card-${title.toLowerCase()}`}>
                {title}: {cant} {udm}
            </div>
        )
    })
);

jest.mock(
    '../../../../../../components/chains/foodit-global/common/Carousel/foodit.jsx',
    () => ({
        Carousel: ({ children }) => <div data-testid="carousel">{children}</div>
    })
);

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

describe('InfoNutricional', () => {
    const mockUseNavigationData = useNavigationData;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const validNutritionalData = {
        promo_items: {
            nutritional_information: {
                embed: {
                    config: {
                        items: {
                            calories: 116,
                            carbohydrates: 24.3,
                            totalFat: 0.4,
                            protein: 2.6,
                            sodium: 0.2,
                            fiber: 1.6
                        }
                    }
                }
            }
        },
        label: {
            info_nutricional: {
                text: ''
            }
        }
    };

    const emptyNutritionalData = {
        promo_items: {
            nutritional_information: {
                embed: {
                    config: {
                        items: {
                            calories: 0,
                            carbohydrates: 0,
                            totalFat: 0,
                            protein: 0,
                            sodium: 0,
                            fiber: 0
                        }
                    }
                }
            }
        },
        label: {
            info_nutricional: {
                text: ''
            }
        }
    };

    const partialNutritionalData = {
        promo_items: {
            nutritional_information: {
                embed: {
                    config: {
                        items: {
                            calories: 150,
                            carbohydrates: 0,
                            totalFat: 5.2,
                            protein: 0,
                            sodium: 200,
                            fiber: 0
                        }
                    }
                }
            }
        },
        label: {
            info_nutricional: {
                text: ''
            }
        }
    };

    describe('Rendering Logic', () => {
        it('should render nutritional information when termicas is true and has valid data', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });

            render(<NutritionalInfo globalContent={validNutritionalData} />);

            expect(
                screen.getByText('Información nutricional')
            ).toBeInTheDocument();
            expect(screen.getByTestId('carousel')).toBeInTheDocument();
            expect(screen.getByTestId('card-calorías')).toBeInTheDocument();
            expect(
                screen.getByTestId('card-carbohidratos')
            ).toBeInTheDocument();
        });

        it('should not render when termicas is false', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'false' }
            });

            render(<NutritionalInfo globalContent={validNutritionalData} />);

            expect(
                screen.queryByText('Información nutricional')
            ).not.toBeInTheDocument();
        });

        it('should not render when there is no valid nutritional data', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });

            render(<NutritionalInfo globalContent={emptyNutritionalData} />);

            expect(
                screen.queryByText('Información nutricional')
            ).not.toBeInTheDocument();
        });

        it('should not render when termicas is undefined and text is "ocultar"', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: {}
            });

            const dataWithHideText = {
                ...validNutritionalData,
                label: {
                    info_nutricional: {
                        text: 'Ocultar'
                    }
                }
            };

            render(<NutritionalInfo globalContent={dataWithHideText} />);

            expect(
                screen.queryByText('Información nutricional')
            ).not.toBeInTheDocument();
        });
    });

    describe('Termicas vs Label Priority Logic', () => {
        it('should show when termicas is true regardless of label text', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });

            const dataWithHideText = {
                ...validNutritionalData,
                label: {
                    info_nutricional: {
                        text: 'Ocultar'
                    }
                }
            };

            render(<NutritionalInfo globalContent={dataWithHideText} />);

            expect(
                screen.getByText('Información nutricional')
            ).toBeInTheDocument();
        });

        it('should not show when termicas is false regardless of label text', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'false' }
            });

            const dataWithShowText = {
                ...validNutritionalData,
                label: {
                    info_nutricional: {
                        text: 'No Generar'
                    }
                }
            };

            render(<NutritionalInfo globalContent={dataWithShowText} />);

            expect(
                screen.queryByText('Información nutricional')
            ).not.toBeInTheDocument();
        });

        it('should use label as fallback when termicas is undefined', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: {}
            });

            const dataWithShowText = {
                ...validNutritionalData,
                label: {
                    info_nutricional: {
                        text: 'No Generar'
                    }
                }
            };

            render(<NutritionalInfo globalContent={dataWithShowText} />);

            expect(
                screen.getByText('Información nutricional')
            ).toBeInTheDocument();
        });
    });

    describe('Data Filtering', () => {
        it('should only render cards with valid nutritional values', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });

            render(<NutritionalInfo globalContent={partialNutritionalData} />);

            expect(screen.getByTestId('card-calorías')).toBeInTheDocument();
            expect(screen.getByTestId('card-grasa total')).toBeInTheDocument();
            expect(screen.getByTestId('card-sodio')).toBeInTheDocument();

            expect(
                screen.queryByTestId('card-carbohidratos')
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId('card-proteína')
            ).not.toBeInTheDocument();
            expect(screen.queryByTestId('card-fibra')).not.toBeInTheDocument();
        });

        it('should handle null values correctly', () => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });

            const dataWithNulls = {
                promo_items: {
                    nutritional_information: {
                        embed: {
                            config: {
                                items: {
                                    calories: 100,
                                    carbohydrates: null,
                                    totalFat: undefined,
                                    protein: 0,
                                    sodium: 150,
                                    fiber: ''
                                }
                            }
                        }
                    }
                },
                label: {
                    info_nutricional: {
                        text: ''
                    }
                }
            };

            render(<NutritionalInfo globalContent={dataWithNulls} />);

            expect(screen.getByTestId('card-calorías')).toBeInTheDocument();
            expect(screen.getByTestId('card-sodio')).toBeInTheDocument();
            expect(
                screen.queryByTestId('card-carbohidratos')
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId('card-grasa total')
            ).not.toBeInTheDocument();
        });
    });

    describe('Tooltip Functionality', () => {
        beforeEach(() => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });
        });

        it('should show tooltip text on click', () => {
            render(<NutritionalInfo globalContent={validNutritionalData} />);

            fireEvent.click(screen.getByTitle('Mostrar tooltip'));

            expect(
                screen.getByText(
                    'La información mostrada es una estimación en base a los ingredientes y la preparación disponibles. No debe considerarse un sustituto del consejo de un nutricionista profesional.'
                )
            ).toBeInTheDocument();
        });

        it('should have tooltip button with correct accessibility attributes', () => {
            render(<NutritionalInfo globalContent={validNutritionalData} />);

            const tooltipButton = screen.getByTitle('Mostrar tooltip');
            expect(tooltipButton).toBeInTheDocument();
            expect(tooltipButton).toHaveAttribute('title', 'Mostrar tooltip');
        });
    });

    describe('Card Content Validation', () => {
        beforeEach(() => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });
        });

        it('should render correct nutritional values in cards', () => {
            render(<NutritionalInfo globalContent={validNutritionalData} />);

            expect(screen.getByText('Calorías: 116 kcal')).toBeInTheDocument();
            expect(
                screen.getByText('Carbohidratos: 24.3 g')
            ).toBeInTheDocument();
            expect(screen.getByText('Grasa total: 0.4 g')).toBeInTheDocument();
            expect(screen.getByText('Proteína: 2.6 g')).toBeInTheDocument();
            expect(screen.getByText('Sodio: 0.2 mg')).toBeInTheDocument();
            expect(screen.getByText('Fibra: 1.6 g')).toBeInTheDocument();
        });

        it('should use correct units for each nutrient', () => {
            render(<NutritionalInfo globalContent={validNutritionalData} />);

            expect(screen.getByText(/kcal/)).toBeInTheDocument();

            expect(screen.getAllByText(/\bg\b/)).toHaveLength(4); // carbs, fat, protein, fiber

            expect(screen.getByText(/mg/)).toBeInTheDocument();
        });
    });

    describe('Component Integration', () => {
        beforeEach(() => {
            mockUseNavigationData.mockReturnValue({
                termicasData: { show_nutritional_info: 'true' }
            });
        });

        it('should render all required UI components', () => {
            render(<NutritionalInfo globalContent={validNutritionalData} />);

            expect(
                screen.getByText('Información nutricional')
            ).toBeInTheDocument();

            expect(screen.getByTitle('Mostrar tooltip')).toBeInTheDocument();

            expect(screen.getByTestId('carousel')).toBeInTheDocument();

            expect(screen.getAllByTestId(/^card-/)).toHaveLength(6);
        });
    });
});
