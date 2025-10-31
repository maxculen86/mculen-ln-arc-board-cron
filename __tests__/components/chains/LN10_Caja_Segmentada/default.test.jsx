import React from 'react';
import { render, screen } from '@testing-library/react';
import CajaSegmentada from '../../../../components/chains/LN10_Caja_Segmentada/default';

jest.mock('fusion:consumer', () => component => component);

jest.mock('../../../../components/private/common/auth/hooks/useAuthManager');

jest.mock(
    '../../../../components/chains/LN10_Caja_Segmentada/_helpers',
    () => ({
        isTodayEnabled: jest.fn(),
        hasValidationFailed: jest.fn(),
        shouldFetchContent: jest.fn(),
        shouldHideComponent: jest.fn(),
        shouldShowComponent: jest.fn(),
        shouldShowPlaceholder: jest.fn()
    })
);

jest.mock(
    '../../../../components/chains/LN10_Caja_Segmentada/common/_helper-WebApi',
    () => ({
        validateChain: jest.fn()
    })
);

jest.mock('../../../../components/chains/utils/setRender', () => jest.fn());

jest.mock('../../../../components/common/LazyLoad/LazyLoad', () => ({
    __esModule: true,
    default: ({ children, onViewport, showComponent }) => (
        <div data-testid="lazy-load" onClick={onViewport}>
            {showComponent && children}
        </div>
    )
}));

jest.mock(
    '../../../../components/private/LN10/home/components/CommonCollection/default',
    () => {
        return function CommonCollection() {
            return <div data-testid="common-collection">Common Collection</div>;
        };
    }
);

jest.mock('../../../../components/private/common/utils/diagramationRules', () =>
    jest.fn()
);
jest.mock('../../../../components/chains/utils/_helpers', () => ({
    useRoofData: jest.fn()
}));
jest.mock(
    '../../../../components/private/LN/common/utils/cajaTemasHelper',
    () => ({
        getCommonProps: jest.fn(),
        getMarkupForDatalayer: jest.fn()
    })
);
jest.mock('../../../../components/chains/utils/getComponent', () => jest.fn());
jest.mock(
    '../../../../components/private/LN/common/hooks/useGetArticlesForSegment',
    () => jest.fn()
);
jest.mock(
    '../../../../components/chains/LN10_Caja_Segmentada/common/hooks/useSegmentMatch',
    () => ({
        useSegmentMatch: jest.fn()
    })
);
jest.mock('../../../../components/chains/utils/setCommonCustomFields', () => ({
    typesButtonStyle: { generic: 'Generic' }
}));
jest.mock('../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock(
    '../../../../components/chains/LN10_Caja_Segmentada/common/hooks/useProductClickTracker',
    () => jest.fn()
);

describe('CajaSegmentada', () => {
    const useAuthManager =
        require('../../../../components/private/common/auth/hooks/useAuthManager').default;
    const {
        isTodayEnabled,
        hasValidationFailed,
        shouldFetchContent,
        shouldHideComponent,
        shouldShowComponent,
        shouldShowPlaceholder
    } = require('../../../../components/chains/LN10_Caja_Segmentada/_helpers');
    const {
        validateChain
    } = require('../../../../components/chains/LN10_Caja_Segmentada/common/_helper-WebApi');
    const setRender = require('../../../../components/chains/utils/setRender');
    const diagramationRules = require('../../../../components/private/common/utils/diagramationRules');
    const {
        useRoofData
    } = require('../../../../components/chains/utils/_helpers');
    const {
        getCommonProps,
        getMarkupForDatalayer
    } = require('../../../../components/private/LN/common/utils/cajaTemasHelper');
    const getComponent = require('../../../../components/chains/utils/getComponent');
    const useGetArticlesForSegment = require('../../../../components/private/LN/common/hooks/useGetArticlesForSegment');
    const {
        useSegmentMatch
    } = require('../../../../components/chains/LN10_Caja_Segmentada/common/hooks/useSegmentMatch');
    const useTermica = require('../../../../components/private/common/hooks/useTermica');
    const useProductClickTracker = require('../../../../components/chains/LN10_Caja_Segmentada/common/hooks/useProductClickTracker');

    const defaultProps = {
        id: 'test-chain-id',
        isAdmin: false,
        renderables: [],
        customFields: {
            idCollection: 'test-collection',
            segment: 1,
            enabledDays: ['lunes', 'martes'],
            hideCaja: false,
            initialPosition: 1
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();

        // Setup happy path por defecto
        useTermica.mockReturnValue(true);
        useAuthManager.mockReturnValue({ token: 'mock-token' });
        isTodayEnabled.mockReturnValue(true);
        hasValidationFailed.mockReturnValue(false);
        shouldFetchContent.mockReturnValue(true);
        shouldHideComponent.mockReturnValue(false);
        shouldShowComponent.mockReturnValue(true);
        shouldShowPlaceholder.mockReturnValue(false);
        validateChain.mockReturnValue(null);
        getCommonProps.mockReturnValue({
            notesQuantity: 5,
            position: 1,
            positionInsideSection: 1
        });
        useSegmentMatch.mockReturnValue({
            loading: false,
            segmentMatches: true,
            attemptedLoad: true
        });
        useGetArticlesForSegment.mockReturnValue([{ id: 1 }, { id: 2 }]);
        diagramationRules.mockReturnValue([]);
        useRoofData.mockReturnValue({});
        getComponent.mockReturnValue(() => (
            <div data-testid="container-cards" />
        ));
        getMarkupForDatalayer.mockReturnValue({
            extraOptsDiv: { 'data-testid': 'container' },
            extraOpts: { position: 1 }
        });
        setRender.mockImplementation(
            ({ extraOptions }) => extraOptions.default
        );
        useProductClickTracker.mockReturnValue();
    });

    it('should render successfully when all validations pass', () => {
        render(<CajaSegmentada {...defaultProps} />);

        expect(setRender).toHaveBeenCalledWith({
            chainId: 'test-chain-id',
            isAdmin: false,
            error: null,
            hideBox: false,
            viewabilityData: {
                position: 1,
                Segmento_ID: 1
            },
            extraOptions: {
                default: expect.any(Object)
            }
        });

        expect(screen.getByTestId('lazy-load')).toBeInTheDocument();
    });

    it('should hide component when config validation fails', () => {
        const configError = 'Se requiere el id de la colección';
        validateChain.mockReturnValue(configError);
        hasValidationFailed.mockReturnValue(true);
        shouldHideComponent.mockReturnValue(true);

        render(<CajaSegmentada {...defaultProps} />);

        expect(setRender).toHaveBeenCalledWith({
            chainId: 'test-chain-id',
            isAdmin: false,
            error: configError,
            hideBox: true,
            viewabilityData: {
                position: 1,
                Segmento_ID: 1
            },
            extraOptions: {
                default: expect.any(Object)
            }
        });
    });

    // Test parametrizado para múltiples condiciones de validación
    describe.each([
        {
            description: 'termica is false',
            setup: () => {
                useTermica.mockReturnValue(false);
                hasValidationFailed.mockReturnValue(true);
                shouldHideComponent.mockReturnValue(true);
            }
        },
        {
            description: 'no token available',
            setup: () => {
                useAuthManager.mockReturnValue({ token: null });
                hasValidationFailed.mockReturnValue(true);
                shouldHideComponent.mockReturnValue(true);
            }
        },
        {
            description: 'today is not enabled',
            setup: () => {
                isTodayEnabled.mockReturnValue(false);
                hasValidationFailed.mockReturnValue(true);
                shouldHideComponent.mockReturnValue(true);
            }
        },
        {
            description: 'hideCaja is true',
            setup: () => {
                defaultProps.customFields.hideCaja = true;
                hasValidationFailed.mockReturnValue(true);
                shouldHideComponent.mockReturnValue(true);
            }
        },
        {
            description: 'enabledDays is empty',
            setup: () => {
                defaultProps.customFields.enabledDays = [];
                hasValidationFailed.mockReturnValue(true);
                shouldHideComponent.mockReturnValue(true);
            }
        }
    ])('should hide component when $description', ({ setup }) => {
        beforeEach(() => {
            setup();
            useSegmentMatch.mockReturnValue({
                loading: false,
                segmentMatches: false,
                attemptedLoad: true
            });
        });

        it('hides the component', () => {
            render(<CajaSegmentada {...defaultProps} />);

            expect(setRender).toHaveBeenCalledWith(
                expect.objectContaining({
                    hideBox: true,
                    viewabilityData: expect.objectContaining({
                        Segmento_ID: 1
                    })
                })
            );
        });
    });

    it('should hide component when user does not match segment', () => {
        useSegmentMatch.mockReturnValue({
            loading: false,
            segmentMatches: false,
            attemptedLoad: true
        });
        shouldFetchContent.mockReturnValue(false);
        shouldHideComponent.mockReturnValue(true);

        render(<CajaSegmentada {...defaultProps} />);

        expect(setRender).toHaveBeenCalledWith(
            expect.objectContaining({
                hideBox: true,
                viewabilityData: expect.objectContaining({
                    Segmento_ID: 1
                })
            })
        );
    });

    it('should hide component when no articles are fetched', () => {
        useGetArticlesForSegment.mockReturnValue([]);
        shouldHideComponent.mockReturnValue(true);

        render(<CajaSegmentada {...defaultProps} />);

        expect(setRender).toHaveBeenCalledWith(
            expect.objectContaining({
                hideBox: true,
                viewabilityData: expect.objectContaining({
                    Segmento_ID: 1
                })
            })
        );
    });

    it('should not fetch articles when validation fails', () => {
        useTermica.mockReturnValue(false);
        hasValidationFailed.mockReturnValue(true);
        shouldFetchContent.mockReturnValue(false);

        render(<CajaSegmentada {...defaultProps} />);

        expect(useGetArticlesForSegment).toHaveBeenCalledWith({
            shouldFetch: false,
            idCollection: 'test-collection',
            initialPosition: 1,
            notesQuantity: 5,
            layout: 'logo_3_grid'
        });
    });

    it('should show loading state when segmentation is loading', () => {
        useSegmentMatch.mockReturnValue({
            loading: true,
            segmentMatches: false,
            attemptedLoad: false
        });

        render(<CajaSegmentada {...defaultProps} />);

        expect(setRender).toHaveBeenCalledWith(
            expect.objectContaining({
                hideBox: false, // No oculta mientras está cargando
                viewabilityData: expect.objectContaining({
                    Segmento_ID: 1
                })
            })
        );
    });

    it('passes scheduling flag to validation helpers', () => {
        const props = {
            ...defaultProps,
            customFields: {
                ...defaultProps.customFields,
                shouldSchedule: true
            }
        };

        render(<CajaSegmentada {...props} />);

        expect(hasValidationFailed).toHaveBeenCalledWith(
            expect.objectContaining({ shouldSchedule: true })
        );
    });
});
