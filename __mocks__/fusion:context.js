jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        deployment: jest.fn(path => `pathDeployment/${path}`),
        contextPath: 'pf/',
        arcSite: 'ott',
        siteProperties: {}
    })),
    useComponentContext: jest.fn(() => ({
        // Agrega los valores mockeados necesarios aquí
    })),
    useFusionContext: jest.fn(() => ({
        isAdmin: false,
        siteProperties: {
            site: 'the-prophet'
        }
    }))
}));

export const useAppContext = jest.fn(() => ({
    deployment: path => `pathDeployment/${path}`,
    contextPath: 'contextPath',
    arcSite: 'ott',
    siteProperties: {} // Asegúrate de incluir cualquier otra propiedad que necesite ser mockeada
}));
export const useComponentContext = jest.fn();
export const useFusionContext = jest.fn(() => {
    return {
        isAdmin: false,
        siteProperties: {
            site: 'the-prophet'
        }
    };
});
