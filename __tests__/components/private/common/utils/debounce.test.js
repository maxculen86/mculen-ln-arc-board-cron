import debounce from '../../../../../components/private/common/utils/debounce';

beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout'); // Asegúrate de espiar setTimeout
});

afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks(); // Restaura los mocks para evitar interferencias entre pruebas
});

describe('Common - Debounce Utils', () => {
    test('la funcion debounce es llamada una vez', () => {
        const callback = jest.fn();
        const debounceFun = debounce(callback, 1000);

        expect(callback).toHaveBeenCalledTimes(0);
        debounceFun();
        jest.runAllTimers(); // Avanza todos los temporizadores para ejecutar debounces pendientes
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('la función debounce es llamada 10 veces', () => {
        const callback = jest.fn();
        const debounceFun = debounce(callback, 1000);

        for (let i = 0; i < 10; i++) {
            jest.advanceTimersByTime(500);
            debounceFun();
            jest.runOnlyPendingTimers();
        }
        expect(setTimeout).toHaveBeenCalledTimes(10);
    });
});
