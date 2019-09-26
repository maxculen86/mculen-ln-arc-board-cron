import useCookie from '../../LN/common/utils/useCookie';

const apiIngresar = () => {
    const { getCookie } = useCookie();
    const urlApi = 'https://api-ingresar.lanacion.com.ar/UsuarioV1/';

    const reLogin = (token, xvalue) =>
        fetch(`${urlApi}ReLogin`, {
            method: 'POST',
            body: JSON.stringify({
                Token: token,
                Xvalue: xvalue,
                AutenticacionTipoId: '1',
                OrigenLoginTipoId: '1',
                IsRelogin: 1
            })
        }).then(res => res.json());

    const getMe = (isRelogin = false, token, xvalue) => {
        if (
            getCookie('shouldrelogin') &&
            getCookie('usuariodata') &&
            !isRelogin
        ) {
            return new Promise(resolve =>
                resolve({ response: getCookie('usuariodata') })
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
