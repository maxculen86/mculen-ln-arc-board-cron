import { getAuthTokens } from '../../../../../auth/helper/loginHelper';

export const generateUrlWithToken = async (url = '') => {
    const { token } = await getAuthTokens();
    if (!token) {
        console.error('No se pudo obtener el token JWT');
        return url;
    }
    return `${url}?jwt=${token}`;
};

export const handleIframeProps = async (
    id = '',
    url = '',
    addToken = false
) => {
    const iframeAnexo = document.getElementById(`anexo-${id}`);
    if (!iframeAnexo) return;

    iframeAnexo.parentElement.classList.remove('skeleton-box');

    const finalUrl = addToken ? await generateUrlWithToken(url) : url;

    iframeAnexo.src = finalUrl;
};
