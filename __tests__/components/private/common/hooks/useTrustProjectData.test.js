import { renderHook } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import useTrustProjectData from '../../../../../components/private/common/hooks/useTrustProjectData';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

const TRUST_PROJECT_URL =
    'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/';

describe('useTrustProjectData', () => {
    const mockDeployment = jest.fn(path => `https://lanacion.com.ar${path}`);

    beforeEach(() => {
        jest.clearAllMocks();
        mockDeployment.mockImplementation(
            path => `https://lanacion.com.ar${path}`
        );
    });

    it('returns an object with image and link properties', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/fusion/components/trust'
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(result.current).toHaveProperty('image');
        expect(result.current).toHaveProperty('link');
    });

    it('calls deployment with the correct path using contextPath', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/fusion/components/trust'
        });

        renderHook(() => useTrustProjectData());

        expect(mockDeployment).toHaveBeenCalledWith(
            '/fusion/components/trust/resources/images/the-trust-project.webp'
        );
    });

    it('sets image.src to the value returned by deployment', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/fusion/components/trust'
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(result.current.image.src).toBe(
            'https://lanacion.com.ar/fusion/components/trust/resources/images/the-trust-project.webp'
        );
    });

    it('always returns image.height as 20', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/any/path'
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(result.current.image.height).toBe(20);
    });

    it('always returns image.alt as "The Trust Project"', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/any/path'
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(result.current.image.alt).toBe('The Trust Project');
    });

    it('always returns link.href as the Trust Project URL', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/any/path'
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(result.current.link.href).toBe(TRUST_PROJECT_URL);
    });

    it('always returns link.title as "Ir a Proyecto Trust"', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/any/path'
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(result.current.link.title).toBe('Ir a Proyecto Trust');
    });

    it('handles empty string contextPath correctly', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: ''
        });

        renderHook(() => useTrustProjectData());

        expect(mockDeployment).toHaveBeenCalledWith(
            '/resources/images/the-trust-project.webp'
        );
    });

    it('handles undefined contextPath without throwing', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: undefined
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(mockDeployment).toHaveBeenCalledWith(
            'undefined/resources/images/the-trust-project.webp'
        );
        expect(result.current.image.src).toBe(
            'https://lanacion.com.arundefined/resources/images/the-trust-project.webp'
        );
    });

    it('returns the full expected object structure', () => {
        useAppContext.mockReturnValue({
            deployment: mockDeployment,
            contextPath: '/fusion/components/trust'
        });

        const { result } = renderHook(() => useTrustProjectData());

        expect(result.current).toEqual({
            image: {
                height: 20,
                src: 'https://lanacion.com.ar/fusion/components/trust/resources/images/the-trust-project.webp',
                alt: 'The Trust Project'
            },
            link: {
                href: TRUST_PROJECT_URL,
                title: 'Ir a Proyecto Trust'
            }
        });
    });
});
