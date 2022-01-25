import handleCookie from '../../LN/common/utils/handleCookie';

const apiIngresar = () => {
    const { getCookie, eraseCookie } = handleCookie();
    const urlApi = 'https://api-ingresar.lanacion.com.ar/UsuarioV1/';

    const reLogin = (token, xvalue) =>
        fetch(`${urlApi}ReLogin`, {
            method: 'POST',
            headers: {
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

    const getMe = (token, xvalue, isRelogin = false) => {
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
