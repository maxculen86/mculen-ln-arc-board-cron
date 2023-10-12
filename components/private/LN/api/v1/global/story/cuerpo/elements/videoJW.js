import { videoJWNota } from '../../../../../common/elements/story/videoJW';

const videoJW = nodo => {
    if (!nodo) return null;
    const valorNodo = videoJWNota(nodo);
    if (valorNodo) {
        return {
            _t: 'p',
            valor: valorNodo
        };
    }
    return null;
};
export default videoJW;
