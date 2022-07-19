import {
    aperturaContenido,
    apertura
} from '../../../common/story/apertura/aperturaArticle';
import video from '../cuerpo/elements/video';
import image from '../cuerpo/elements/image';

const apertura2 = article => {
    return {
        apertura: {
            ...apertura(article),
            ...aperturaContenido(article, image, video)
        }
    };
};
export default apertura2;
