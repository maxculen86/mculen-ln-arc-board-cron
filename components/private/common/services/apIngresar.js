import handleCookie from '../../LN/common/utils/handleCookie';
import { API_INGRESAR } from 'fusion:environment';

const apiIngresar = () => {
    const { getCookie, eraseCookie } = handleCookie();
    const urlApi = `${API_INGRESAR}/UsuarioV1/`;

    const reLogin = (token, xvalue) =>
        fetch(`${urlApi}ReLogin`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getCookie('access-token')}`,
                'X-Token': token,
                'X-Value': xvalue,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                AutenticacionTipoId: '1',
                OrigenLoginTipoId: '1',
                IsRelogin: 1
            })
        }).then(res => {
            eraseCookie('ProductoPremiumId');
            return res.json();
        });

    const getMe = (token, xvalue, accessToken, isRelogin = false) => {
        const ProductoPremiumId = getCookie('ProductoPremiumId') || '';
        const UsuarioDetalleEmail = getCookie('usuarioemail') || '';

        if (
            getCookie('shouldrelogin') &&
            ProductoPremiumId &&
            UsuarioDetalleEmail &&
            !isRelogin
        ) {
            return new Promise(resolve =>
                resolve({
                    response: JSON.stringify({
                        Usuario: {
                            ProductoPremiumId,
                            UsuarioDetalleEmail
                        }
                    })
                })
            );
        }

        const headers = {};
        headers.Authorization =
            `Bearer ${accessToken}` || `Bearer ${getCookie('access-token')}`;
        headers['X-Token'] = token || getCookie('token');

        if (xvalue) headers['X-Value'] = xvalue;

        return fetch(`${urlApi}me`, {
            method: 'POST',
            headers
        }).then(res => res.json());
    };

    return {
        getMe,
        reLogin
    };
};

export default apiIngresar();
