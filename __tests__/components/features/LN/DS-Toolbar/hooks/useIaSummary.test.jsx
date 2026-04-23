import { renderHook, act } from '@testing-library/react';
import useIaSummary from '../../../../../../components/features/LN/DS-Toolbar/hooks/useIaSummary';
import useTermica from '../../../../../../components/private/common/hooks/useTermica';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('../../../../../../components/private/common/hooks/useTermica');
jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('Components - features - LN - DS-Toolbar - hooks - useIaSummary', () => {
    const defaultProps = {
        globalContent: {
            promo_items: {
                summary: {
                    embed: {
                        config: {
                            arrayBullets: ['bullet1', 'bullet2', 'bullet3']
                        }
                    }
                }
            }
        },
        suscription: true,
        openBarrier: jest.fn(),
        hideSummary: false
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useTermica.mockReturnValue(true);
    });

    describe('initial state', () => {
        it('returns correct initial values', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            expect(result.current).toHaveProperty('shouldShowSummary');
            expect(result.current).toHaveProperty('isOpen');
            expect(result.current).toHaveProperty('summaryData');
            expect(result.current).toHaveProperty('onOpen');
            expect(result.current).toHaveProperty('onClose');
        });

        it('isOpen is false initially', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            expect(result.current.isOpen).toBe(false);
        });

        it('returns summaryData from globalContent', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            expect(result.current.summaryData).toEqual([
                'bullet1',
                'bullet2',
                'bullet3'
            ]);
        });
    });

    describe('shouldShowSummary', () => {
        it('returns true when all conditions are met', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            expect(result.current.shouldShowSummary).toBe(true);
        });

        it('returns false when termica is disabled', () => {
            useTermica.mockReturnValue(false);

            const { result } = renderHook(() => useIaSummary(defaultProps));

            expect(result.current.shouldShowSummary).toBe(false);
        });

        it('returns false when hideSummary is true', () => {
            const { result } = renderHook(() =>
                useIaSummary({ ...defaultProps, hideSummary: true })
            );

            expect(result.current.shouldShowSummary).toBe(false);
        });

        it('returns false when summaryData is empty', () => {
            const { result } = renderHook(() =>
                useIaSummary({
                    ...defaultProps,
                    globalContent: {
                        promo_items: {
                            summary: {
                                embed: {
                                    config: {
                                        arrayBullets: []
                                    }
                                }
                            }
                        }
                    }
                })
            );

            expect(result.current.shouldShowSummary).toBe(false);
        });

        it('returns false when summaryData does not exist', () => {
            const { result } = renderHook(() =>
                useIaSummary({
                    ...defaultProps,
                    globalContent: {}
                })
            );

            expect(result.current.shouldShowSummary).toBe(false);
        });

        it('calls useTermica with correct parameter', () => {
            renderHook(() => useIaSummary(defaultProps));

            expect(useTermica).toHaveBeenCalledWith('resumen_nota');
        });
    });

    describe('onOpen', () => {
        it('sets isOpen to true when user is subscribed', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            act(() => {
                result.current.onOpen();
            });

            expect(result.current.isOpen).toBe(true);
        });

        it('calls openBarrier when user is not subscribed', () => {
            const openBarrier = jest.fn();
            const { result } = renderHook(() =>
                useIaSummary({
                    ...defaultProps,
                    suscription: false,
                    openBarrier
                })
            );

            act(() => {
                result.current.onOpen();
            });

            expect(openBarrier).toHaveBeenCalled();
            expect(result.current.isOpen).toBe(false);
        });

        it('does not throw when openBarrier is undefined', () => {
            const { result } = renderHook(() =>
                useIaSummary({
                    ...defaultProps,
                    suscription: false,
                    openBarrier: undefined
                })
            );

            expect(() => {
                act(() => {
                    result.current.onOpen();
                });
            }).not.toThrow();
        });

        it('sends correct datalayer event when opening', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            act(() => {
                result.current.onOpen();
            });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'toolbar',
                category: 'nota',
                label: 'resumen_nota'
            });
        });

        it('does not send datalayer event when user is not subscribed', () => {
            const { result } = renderHook(() =>
                useIaSummary({ ...defaultProps, suscription: false })
            );

            act(() => {
                result.current.onOpen();
            });

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });
    });

    describe('onClose', () => {
        it('sets isOpen to false', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            act(() => {
                result.current.onOpen();
            });

            expect(result.current.isOpen).toBe(true);

            act(() => {
                result.current.onClose();
            });

            expect(result.current.isOpen).toBe(false);
        });

        it('sends correct datalayer event when closing', () => {
            const { result } = renderHook(() => useIaSummary(defaultProps));

            act(() => {
                result.current.onClose();
            });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'toolbar',
                category: 'nota',
                label: 'cerrar_resumen'
            });
        });
    });
});
