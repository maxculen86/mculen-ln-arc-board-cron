import { videoJWNota } from '../../../../../common/elements/story/videoJW';

const videoJW = nodo => {
    if (!nodo) return null;

    return {
        _t: 'p',
        valor: videoJWNota(nodo)
    };
};
export default videoJW;
