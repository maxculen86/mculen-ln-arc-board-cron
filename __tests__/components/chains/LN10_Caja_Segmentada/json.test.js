jest.mock('fusion:consumer', () => component => component);
jest.mock('../../../../components/chains/utils/getViewabilityRoof', () =>
    jest.fn(() => 'mock-roof')
);
jest.mock(
    '../../../../components/chains/LN10_Caja_Segmentada/common/_helper-WebApi',
    () => ({
        validateChain: jest.fn()
    })
);

jest.mock('../../../../components/chains/utils/isTodayEnabled', () =>
    jest.fn()
);

jest.mock('fusion:consumer', component => {
    return function (component) {
        const newComponent = component;
        // Mock fetchContent
        newComponent.prototype.fetchContent = jest.fn(() =>
            Promise.resolve({
                content_elements: [
                    { _id: '1', website_url: 'url_1' },
                    { _id: '2', website_url: 'url_2' },
                    { _id: '3', website_url: 'url_4' }
                ]
            })
        );

        return newComponent;
    };
});

import CajaSegmentada from '../../../../components/chains/LN10_Caja_Segmentada/json';
import { validateChain } from '../../../../components/chains/LN10_Caja_Segmentada/common/_helper-WebApi';
import isTodayEnabled from '../../../../components/chains/utils/isTodayEnabled';

describe('components - chains - LN10_Caja_Segmentada - json', () => {
    let component;
    let mockProps;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'warn').mockImplementation(() => null);
        jest.spyOn(console, 'error').mockImplementation(() => null);

        mockProps = {
            id: 'test-chain-id',
            requestUri: '',
            customFields: {
                idCollection: 'test-collection',
                segment: 'test-segment',
                initialPosition: 1,
                title: 'Test Title',
                hideTitle: false
            },
            renderables: [
                {
                    collection: 'chains',
                    props: {
                        id: 'test-chain-id',
                        customFields: {
                            hideCaja: false
                        }
                    }
                }
            ]
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('shouldSkipRender', () => {
        it('should return null when hideCaja is true', () => {
            mockProps.customFields.hideCaja = true;
            component = new CajaSegmentada(mockProps);

            const result = component.render();

            expect(result).toBeNull();
        });

        it('should return null when enabledDays is empty', () => {
            mockProps.customFields.enabledDays = [];
            component = new CajaSegmentada(mockProps);

            const result = component.render();

            expect(result).toBeNull();
        });

        it('should return null when isTodayEnabled returns false', () => {
            mockProps.customFields.enabledDays = ['lunes', 'martes'];
            mockProps.customFields.shouldSchedule = true;
            mockProps.customFields.hideCaja = false;
            isTodayEnabled.mockReturnValue(false);
            component = new CajaSegmentada(mockProps);
            component.state.navigationTreeSource = {
                Termicas: {
                    caja_segmentada: 'true'
                }
            };
            const result = component.render();

            expect(result).toBeNull();
            expect(isTodayEnabled).toHaveBeenCalledWith(['lunes', 'martes']);
        });

        it('should return null when termica is false', () => {
            mockProps.customFields.enabledDays = ['lunes', 'martes'];
            isTodayEnabled.mockReturnValue(true);
            component = new CajaSegmentada(mockProps);
            component.state.navigationTreeSource = {
                Termicas: {
                    caja_segmentada: 'false'
                }
            };
            const result = component.render();

            expect(result).toBeNull();
        });

        it('should return null when validation fails', () => {
            mockProps.customFields.enabledDays = ['lunes', 'martes'];
            const validationError = {
                validation: true,
                message: 'Validation failed'
            };
            validateChain.mockReturnValue(validationError);
            isTodayEnabled.mockReturnValue(true);

            component = new CajaSegmentada(mockProps);
            component.state.navigationTreeSource = {
                Termicas: {
                    caja_segmentada: 'true'
                }
            };
            const result = component.render();

            expect(result).toBeNull();
            expect(validateChain).toHaveBeenCalledWith(
                {
                    idCollection: 'test-collection',
                    segment: 'test-segment',
                    articles: []
                },
                true
            );
            expect(console.warn).toHaveBeenCalled();
        });
    });

    describe('successful rendering', () => {
        it('should continue rendering when all conditions are met', () => {
            mockProps.customFields.enabledDays = ['lunes', 'martes'];
            mockProps.customFields.shouldSchedule = true;
            isTodayEnabled.mockReturnValue(true);
            validateChain.mockReturnValue(null);
            component = new CajaSegmentada(mockProps);
            component.state.navigationTreeSource = {
                Termicas: {
                    caja_segmentada: 'true'
                }
            };
            const result = component.render();

            expect(result).not.toBeNull();
            expect(isTodayEnabled).toHaveBeenCalledWith(['lunes', 'martes']);
        });

        it('should continue rendering when validation passes', () => {
            mockProps.customFields.enabledDays = ['lunes', 'martes'];
            validateChain.mockReturnValue(null);
            isTodayEnabled.mockReturnValue(true);
            component = new CajaSegmentada(mockProps);
            component.state.navigationTreeSource = {
                Termicas: {
                    caja_segmentada: 'true'
                }
            };
            const result = component.render();

            expect(result).not.toBeNull();
            expect(validateChain).toHaveBeenCalledWith(
                {
                    idCollection: 'test-collection',
                    segment: 'test-segment',
                    articles: []
                },
                true
            );
        });

        it('should return correct structure when all conditions are met', () => {
            mockProps.customFields.enabledDays = ['lunes', 'martes'];
            validateChain.mockReturnValue(null);
            isTodayEnabled.mockReturnValue(true);
            component = new CajaSegmentada(mockProps);
            component.state.articleList = {
                content_elements: [
                    { _id: '1', website_url: 'url_1' },
                    { _id: '2', website_url: 'url_2' },
                    { _id: '3', website_url: 'url_3' }
                ]
            };
            component.state.navigationTreeSource = {
                Termicas: {
                    caja_segmentada: 'true'
                }
            };
            const result = component.render();

            expect(result).toEqual({
                information: {
                    idCollection: 'test-collection',
                    segment: 'test-segment',
                    layout: 'bn_3_grid',
                    noteCount: 3,
                    initialPosition: 0,
                    title: 'Test Title',
                    hideTitle: false,
                    viewabilityRoof: 'mock-roof',
                    enabledDays: ['lunes', 'martes']
                },
                articles: [
                    { _id: '1', website_url: 'url_1' },
                    { _id: '2', website_url: 'url_2' },
                    { _id: '3', website_url: 'url_3' }
                ]
            });
        });

        it('should handle missing optional properties', () => {
            mockProps.customFields = {
                idCollection: 'test-collection',
                segment: 'test-segment',
                enabledDays: ['lunes', 'martes']
            };
            validateChain.mockReturnValue(null);
            isTodayEnabled.mockReturnValue(true);
            component = new CajaSegmentada(mockProps);
            component.state.articleList = {
                content_elements: [
                    { _id: '1', website_url: 'url_1' },
                    { _id: '2', website_url: 'url_2' },
                    { _id: '3', website_url: 'url_3' }
                ]
            };
            component.state.navigationTreeSource = {
                Termicas: {
                    caja_segmentada: 'true'
                }
            };
            const result = component.render();

            expect(result).toEqual({
                information: {
                    idCollection: 'test-collection',
                    segment: 'test-segment',
                    layout: 'bn_3_grid',
                    noteCount: 3,
                    initialPosition: 0,
                    viewabilityRoof: 'mock-roof',
                    enabledDays: ['lunes', 'martes']
                },
                articles: [
                    { _id: '1', website_url: 'url_1' },
                    { _id: '2', website_url: 'url_2' },
                    { _id: '3', website_url: 'url_3' }
                ]
            });
        });
    });
});
