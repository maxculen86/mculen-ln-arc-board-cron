import {
    setInitialState,
    handleResponse
} from '../../../../../../../components/features/foodit-global/common/context/authContext/_helpers';
import apIngresar from '../../../../../../../components/private/common/services/apIngresar';
import { _UserClientLibs } from '../../../../../../../components/private/LN/common/utils/loginHelper';

jest.mock(
    '../../../../../../../components/private/common/services/apIngresar',
    () => ({
        getMe: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/context/authContext/_helpers',
    () => ({
        ...jest.requireActual(
            '../../../../../../../components/features/foodit-global/common/context/authContext/_helpers'
        ),
        logout: jest.fn()
    })
);

describe('Tests -helpers AuthContext Foodit', () => {
    describe('Test function handleResponse', () => {
        test('Should run callback and set cookies in case of code "0000" and successful call', async () => {
            const mockResponse = {
                code: '0000',
                message: 'mock-token',
                response:
                    '0000|mockedNewToken|mockedNewXvalue|mockedAccessToken'
            };

            apIngresar.getMe.mockResolvedValueOnce({
                response: JSON.stringify({
                    Usuario: {
                        ProductoPremiumId: 'mockedProductoPremiumId',
                        UsuarioDetalleEmail: 'mockedEmail',
                        UsuarioDetalleNombre: 'mockedNombre',
                        UsuarioDetalleApellido: 'mockedApellido'
                    }
                })
            });

            const callbackMock = jest.fn();

            await handleResponse(mockResponse, callbackMock);

            expect(callbackMock).toHaveBeenCalledWith({
                ProductoPremiumId: 'mockedProductoPremiumId',
                UsuarioDetalleEmail: 'mockedEmail',
                UsuarioDetalleNombre: 'mockedNombre',
                UsuarioDetalleApellido: 'mockedApellido'
            });
        });

        test('should handle the error if the call to apiIngresar.getMe fails', async () => {
            const mockResponse = {
                code: '0000',
                response: 'mockedResponse'
            };

            apIngresar.getMe.mockRejectedValueOnce('mockedError');

            const consoleErrorSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            const callbackMock = jest.fn();

            await handleResponse(mockResponse, callbackMock);

            expect(callbackMock).not.toHaveBeenCalled();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error during getMe:',
                'mockedError'
            );

            consoleErrorSpy.mockRestore();
        });
    });

    describe('Tests function setInitialState', () => {
        test('Should return the initial state without user data when the login token does not exist', () => {
            expect(setInitialState()).toEqual({
                ProductoPremiumId: '',
                UsuarioDetalleEmail: '',
                UsuarioDetalleNombre: '',
                UsuarioDetalleApellido: ''
            });
        });

        test('Should return initial state with user data when cookie token exists', () => {
            document.cookie =
                'token=miToken; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;';
            document.cookie = 'ProductoPremiumId=2,3,4,5';
            document.cookie = 'usuario%5Fdetalle%5Fnombre=Hola';
            document.cookie = 'usuario%5Fdetalle%5Fapellido=Mundo';
            document.cookie = 'usuarioemail=hola@mundo.com';

            expect(setInitialState()).toEqual({
                UsuarioDetalleNombre: 'Hola',
                UsuarioDetalleApellido: 'Mundo',
                UsuarioDetalleEmail: 'hola@mundo.com',
                ProductoPremiumId: '2,3,4,5'
            });
        });
    });
});
