import { generateIconPath } from '../../../../../components/features/ui-ln/icon/helpers';

describe('generateIconPath Helper', () => {
    const mockDeployment = jest.fn(path => `https://cdn.test.com${path}`);
    const contextPath = '/pf';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Type props validation', () => {
        it('should generate path for default type', () => {
            const result = generateIconPath({
                type: 'default',
                contextPath,
                deployment: mockDeployment
            });

            expect(mockDeployment).toHaveBeenCalledWith(
                '/pf/resources/images/la-nacion-ar-sprite-default.svg'
            );
            expect(result).toBe(
                'https://cdn.test.com/pf/resources/images/la-nacion-ar-sprite-default.svg'
            );
        });

        it('should generate path for color type', () => {
            const result = generateIconPath({
                type: 'color',
                contextPath,
                deployment: mockDeployment
            });

            expect(mockDeployment).toHaveBeenCalledWith(
                '/pf/resources/images/la-nacion-ar-sprite-color.svg'
            );
            expect(result).toBe(
                'https://cdn.test.com/pf/resources/images/la-nacion-ar-sprite-color.svg'
            );
        });

        it('should use default type when not specified', () => {
            const result = generateIconPath({
                contextPath,
                deployment: mockDeployment
            });

            expect(mockDeployment).toHaveBeenCalledWith(
                '/pf/resources/images/la-nacion-ar-sprite-default.svg'
            );
            expect(result).toBe(
                'https://cdn.test.com/pf/resources/images/la-nacion-ar-sprite-default.svg'
            );
        });
    });

    describe('Path construction', () => {
        it('should construct correct path with different contextPath', () => {
            const customContextPath = '/custom-context';

            generateIconPath({
                type: 'default',
                contextPath: customContextPath,
                deployment: mockDeployment
            });

            expect(mockDeployment).toHaveBeenCalledWith(
                '/custom-context/resources/images/la-nacion-ar-sprite-default.svg'
            );
        });

        it('should handle empty contextPath', () => {
            generateIconPath({
                type: 'default',
                contextPath: '',
                deployment: mockDeployment
            });

            expect(mockDeployment).toHaveBeenCalledWith(
                '/resources/images/la-nacion-ar-sprite-default.svg'
            );
        });
    });

    describe('Deployment function integration', () => {
        it('should call deployment function with correct path', () => {
            const mockDeploymentSpy = jest.fn(path => `processed-${path}`);

            const result = generateIconPath({
                type: 'color',
                contextPath: '/test',
                deployment: mockDeploymentSpy
            });

            expect(mockDeploymentSpy).toHaveBeenCalledTimes(1);
            expect(mockDeploymentSpy).toHaveBeenCalledWith(
                '/test/resources/images/la-nacion-ar-sprite-color.svg'
            );
            expect(result).toBe(
                'processed-/test/resources/images/la-nacion-ar-sprite-color.svg'
            );
        });

        it('should return deployment function result', () => {
            const customDeployment = path =>
                `https://custom-cdn.com${path}?v=123`;

            const result = generateIconPath({
                type: 'default',
                contextPath: '/app',
                deployment: customDeployment
            });

            expect(result).toBe(
                'https://custom-cdn.com/app/resources/images/la-nacion-ar-sprite-default.svg?v=123'
            );
        });
    });

    describe('Edge Cases', () => {
        it('should handle special characters in contextPath', () => {
            const specialContextPath = '/app-test_v2';

            generateIconPath({
                type: 'default',
                contextPath: specialContextPath,
                deployment: mockDeployment
            });

            expect(mockDeployment).toHaveBeenCalledWith(
                '/app-test_v2/resources/images/la-nacion-ar-sprite-default.svg'
            );
        });
    });
});
