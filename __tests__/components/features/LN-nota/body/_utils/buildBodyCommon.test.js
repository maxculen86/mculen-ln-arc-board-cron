import { buildBodyCommon } from '../../../../../../components/features/LN-nota/body/_utils/buildBodyCommon';

jest.mock(
    '../../../../../../components/features/LN-nota/body/_utils/_bodyElementRules',
    () => ({
        bodyElementRules: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN-nota/body/_utils/_embedHelper',
    () => ({
        transformEmbedScript: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN-nota/body/_utils/helpers',
    () => ({
        setDataComponent: jest.fn(),
        setExtraProps: jest.fn()
    })
);

jest.mock('../../../../../../components/private/common/utils/get', () =>
    jest.fn()
);

import { bodyElementRules } from '../../../../../../components/features/LN-nota/body/_utils/_bodyElementRules';
import { transformEmbedScript } from '../../../../../../components/features/LN-nota/body/_utils/_embedHelper';
import {
    setDataComponent,
    setExtraProps
} from '../../../../../../components/features/LN-nota/body/_utils/helpers';
import get from '../../../../../../components/private/common/utils/get';

describe('buildBodyCommon', () => {
    const mockComponent = {
        arcType: 'text'
    };

    const mockElement = {
        type: 'text',
        content: 'test content'
    };

    const mockGlobalContent = {
        headlines: { basic: 'Test Title' },
        withSponsoredLink: false
    };

    beforeEach(() => {
        jest.clearAllMocks();

        bodyElementRules.mockReturnValue(mockComponent);
        setExtraProps.mockReturnValue({});
        setDataComponent.mockReturnValue('MockedComponent');
        get.mockReturnValue('');
        transformEmbedScript.mockImplementation(element => element);
    });

    describe('basic functionality', () => {
        it('should return empty array for empty elements', () => {
            const result = buildBodyCommon({
                elements: [],
                supportedTypes: ['text'],
                outputType: 'default',
                globalContent: mockGlobalContent
            });

            expect(result).toEqual([]);
        });

        it('should process elements without renderElement function', () => {
            const supportedTypes = ['text'];
            get.mockReturnValue('text');

            const result = buildBodyCommon({
                elements: [mockElement],
                supportedTypes,
                outputType: 'default',
                globalContent: mockGlobalContent
            });

            expect(result).toHaveLength(1);
            expect(bodyElementRules).toHaveBeenCalledWith({
                element: mockElement,
                outputType: 'default',
                subtype: ''
            });
        });

        it('should filter out unsupported component types', () => {
            const supportedTypes = ['image']; // text is not supported
            get.mockReturnValue('text');

            const result = buildBodyCommon({
                elements: [mockElement],
                supportedTypes,
                outputType: 'default',
                globalContent: mockGlobalContent
            });

            expect(result[0]).toBeNull();
        });

        it('should filter out elements with nodeType', () => {
            const supportedTypes = ['text'];
            get.mockImplementation((obj, path) => {
                if (path === 'arcType') return 'text';
                if (path === 'additional_properties.nodeType')
                    return ['some-node'];
                return '';
            });

            const result = buildBodyCommon({
                elements: [mockElement],
                supportedTypes,
                outputType: 'default',
                globalContent: mockGlobalContent
            });

            expect(result[0]).toBeNull();
        });
    });

    describe('with renderElement function', () => {
        it('should use custom renderElement when provided', () => {
            const mockRenderElement = jest
                .fn()
                .mockReturnValue('CustomRenderedComponent');
            const supportedTypes = ['text'];

            get.mockReturnValue('text');

            const result = buildBodyCommon({
                elements: [mockElement],
                supportedTypes,
                outputType: 'default',
                globalContent: mockGlobalContent,
                renderElement: mockRenderElement
            });

            expect(result).toHaveLength(1);
            expect(mockRenderElement).toHaveBeenCalledWith(
                expect.objectContaining({
                    Component: mockComponent,
                    ComponentWithProps: 'MockedComponent',
                    element: mockElement,
                    currentIndex: 0,
                    supportedTypes,
                    outputType: 'default',
                    globalContent: mockGlobalContent,
                    elements: [mockElement]
                })
            );
            expect(result[0]).toBe('CustomRenderedComponent');
        });

        it('should provide incrementCounter function to renderElement', () => {
            const mockRenderElement = jest
                .fn()
                .mockReturnValue('CustomRenderedComponent');
            const supportedTypes = ['text'];

            get.mockReturnValue('text');

            buildBodyCommon({
                elements: [mockElement, mockElement],
                supportedTypes,
                outputType: 'default',
                globalContent: mockGlobalContent,
                renderElement: mockRenderElement
            });

            expect(mockRenderElement).toHaveBeenCalledTimes(2);

            const firstCall = mockRenderElement.mock.calls[0][0];
            expect(firstCall.incrementCounter).toBeDefined();
            expect(typeof firstCall.incrementCounter).toBe('function');
        });
    });

    describe('element transformation', () => {
        it('should transform elements with subtype', () => {
            const elementWithSubtype = {
                ...mockElement,
                subtype: 'embed'
            };

            const transformedElement = {
                ...elementWithSubtype,
                transformed: true
            };
            transformEmbedScript.mockReturnValue(transformedElement);

            get.mockReturnValue('text');

            buildBodyCommon({
                elements: [elementWithSubtype],
                supportedTypes: ['text'],
                outputType: 'default',
                globalContent: mockGlobalContent
            });

            expect(transformEmbedScript).toHaveBeenCalledWith(
                elementWithSubtype
            );
            expect(bodyElementRules).toHaveBeenCalledWith({
                element: transformedElement,
                outputType: 'default',
                subtype: ''
            });
        });

        it('should not transform elements without subtype', () => {
            get.mockReturnValue('text');

            buildBodyCommon({
                elements: [mockElement],
                supportedTypes: ['text'],
                outputType: 'default',
                globalContent: mockGlobalContent
            });

            expect(transformEmbedScript).not.toHaveBeenCalled();
        });
    });

    describe('capitalIndex functionality', () => {
        it('should find capitalIndex when useCapitalIndex is true', () => {
            const elements = [
                { type: 'image' },
                { type: 'text', content: 'first text' },
                { type: 'text', content: 'second text' }
            ];

            get.mockReturnValue('text');

            buildBodyCommon({
                elements,
                supportedTypes: ['text'],
                outputType: 'default',
                globalContent: mockGlobalContent,
                extraOptions: { useCapitalIndex: true }
            });

            expect(setExtraProps).toHaveBeenCalledWith(
                expect.objectContaining({
                    capitalIndex: 1
                })
            );
        });

        it('should not set capitalIndex when useCapitalIndex is false', () => {
            const elements = [{ type: 'text', content: 'first text' }];

            get.mockReturnValue('text');

            buildBodyCommon({
                elements,
                supportedTypes: ['text'],
                outputType: 'default',
                globalContent: mockGlobalContent,
                extraOptions: { useCapitalIndex: false }
            });

            expect(setExtraProps).toHaveBeenCalledWith(
                expect.not.objectContaining({
                    capitalIndex: expect.anything()
                })
            );
        });
    });

    describe('globalContent handling', () => {
        it('should handle globalContent with subtype', () => {
            const globalContentWithSubtype = {
                ...mockGlobalContent,
                subtype: 'special'
            };

            get.mockReturnValue('text');

            buildBodyCommon({
                elements: [mockElement],
                supportedTypes: ['text'],
                outputType: 'default',
                globalContent: globalContentWithSubtype
            });

            expect(bodyElementRules).toHaveBeenCalledWith({
                element: mockElement,
                outputType: 'default',
                subtype: 'special'
            });
        });

        it('should handle missing globalContent properties', () => {
            get.mockReturnValue('text');

            buildBodyCommon({
                elements: [mockElement],
                supportedTypes: ['text'],
                outputType: 'default',
                globalContent: {}
            });

            expect(setExtraProps).toHaveBeenCalledWith(
                expect.objectContaining({
                    tituloNota: undefined,
                    withSponsoredLink: undefined
                })
            );
        });
    });
});
