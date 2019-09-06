import useCookie from '../../LN/common/utils/useCookie';

const apiIngresar = () => {
    const { getCookie } = useCookie();
    const urlApi = 'https://api-ingresar.lanacion.com.ar/UsuarioV1/';

    const getMe = () => {
        const token = getCookie('token');

        return fetch(`${urlApi}me`, {
            method: 'POST',
            headers: {
                'X-Token': token
            }
        }).then(res => res.json());
    };

    return {
        getMe
    };
};

export default apiIngresar();
