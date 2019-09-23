import useCookie from '../../LN/common/utils/useCookie';

const apiIngresar = () => {
    const { getCookie } = useCookie();
    const urlApi = 'https://api-ingresar.lanacion.com.ar/UsuarioV1/';

    const reLogin = (token, xvalue) =>
        fetch(`${urlApi}relogin`, {
            method: 'POST',
            body: JSON.stringify({
                Token: token,
                Xvalue: xvalue,
                AutenticacionTipoId: '14',
                IsRelogin: '1'
            })
        }).then(res => res.json());

    const getMe = (isRelogin = false) => {
        if (
            getCookie('shouldrelogin') &&
            getCookie('usuariodata') &&
            !isRelogin
        ) {
            return new Promise(resolve =>
                resolve({ response: getCookie('usuariodata') })
            );
        }

        return fetch(`${urlApi}me`, {
            method: 'POST',
            headers: {
                'X-Token': getCookie('token')
            }
        }).then(res => res.json());
    };

    return {
        getMe,
        reLogin
    };
};

export default apiIngresar();
