import renderToastAdapter from '../../../../../../components/features/LN-10-global/common/toasts/renderToastAdapter';
import renderToastLegacy from '../../../../../../components/features/private-global/common/utils/renderToast';
import renderToastsDS from '../../../../../../components/features/ui/ln/toastsContainer/renderToast';

jest.mock(
    '../../../../../../components/features/private-global/common/utils/renderToast'
);

jest.mock(
    '../../../../../../components/features/ui/ln/toastsContainer/renderToast'
);

describe('components - features - LN-10-global - common - toasts - renderToastAdapter', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when useDesignSystem is false (legacy system)', () => {
        it('should call renderToastLegacy with correct parameters', () => {
            const toastOptions = {
                variant: 'success',
                title: 'Título de prueba',
                message: 'Mensaje de prueba',
                buttonProps: { children: 'Click aquí' },
                duration: 5000
            };

            renderToastAdapter(toastOptions, false);

            expect(renderToastLegacy).toHaveBeenCalledWith({
                duration: 5000,
                variant: 'success',
                title: 'Título de prueba',
                message: 'Mensaje de prueba',
                children: 'Click aquí'
            });

            expect(renderToastsDS).not.toHaveBeenCalled();
        });

        it('should use default duration (3000) if not provided', () => {
            const toastOptions = {
                variant: 'error',
                title: 'Error',
                message: 'Hubo un error'
            };

            renderToastAdapter(toastOptions);

            expect(renderToastLegacy).toHaveBeenCalledWith({
                duration: 3000,
                variant: 'error',
                title: 'Error',
                message: 'Hubo un error'
            });
        });
    });

    describe('when useDesignSystem is true (new DS)', () => {
        it('should call renderToastsDS with correct parameters and map variant to color', () => {
            const toastOptions = {
                variant: 'success',
                title: 'Título de éxito',
                message: 'Operación exitosa',
                buttonProps: { children: 'Ver más' },
                duration: 4000
            };

            renderToastAdapter(toastOptions, true);

            expect(renderToastsDS).toHaveBeenCalledWith({
                color: 'success',
                title: 'Título de éxito',
                description: 'Operación exitosa',
                duration: 4000,
                children: 'Ver más'
            });

            expect(renderToastLegacy).not.toHaveBeenCalled();
        });

        it('should map variant "danger" to color "error"', () => {
            const toastOptions = {
                variant: 'danger',
                title: 'Error',
                message: 'Error de conexión'
            };

            renderToastAdapter(toastOptions, true);

            expect(renderToastsDS).toHaveBeenCalledWith({
                color: 'error',
                title: 'Error',
                description: 'Error de conexión',
                duration: 3000
            });
        });

        it('should map variant "warning" to color "warning"', () => {
            const toastOptions = {
                variant: 'warning',
                title: 'Advertencia',
                message: 'Atención requerida'
            };

            renderToastAdapter(toastOptions, true);

            expect(renderToastsDS).toHaveBeenCalledWith({
                color: 'warning',
                title: 'Advertencia',
                description: 'Atención requerida',
                duration: 3000
            });
        });

        it('should map variant "info" to color "info"', () => {
            const toastOptions = {
                variant: 'info',
                title: 'Información',
                message: 'Dato importante'
            };

            renderToastAdapter(toastOptions, true);

            expect(renderToastsDS).toHaveBeenCalledWith({
                color: 'info',
                title: 'Información',
                description: 'Dato importante',
                duration: 3000
            });
        });

        it('should use "info" as default color if variant is unknown', () => {
            const toastOptions = {
                variant: 'unknown-variant',
                title: 'Título',
                message: 'Mensaje'
            };

            renderToastAdapter(toastOptions, true);

            expect(renderToastsDS).toHaveBeenCalledWith({
                color: 'info',
                title: 'Título',
                description: 'Mensaje',
                duration: 3000
            });
        });
    });

    describe('handling optional parameters', () => {
        it('should work without buttonProps', () => {
            const toastOptions = {
                variant: 'success',
                title: 'Título',
                message: 'Mensaje'
            };

            renderToastAdapter(toastOptions, false);

            expect(renderToastLegacy).toHaveBeenCalledWith({
                duration: 3000,
                variant: 'success',
                title: 'Título',
                message: 'Mensaje'
            });
        });

        it('should work with empty buttonProps', () => {
            const toastOptions = {
                variant: 'success',
                title: 'Título',
                message: 'Mensaje',
                buttonProps: {}
            };

            renderToastAdapter(toastOptions, true);

            expect(renderToastsDS).toHaveBeenCalledWith({
                color: 'success',
                title: 'Título',
                description: 'Mensaje',
                duration: 3000
            });
        });
    });
});
