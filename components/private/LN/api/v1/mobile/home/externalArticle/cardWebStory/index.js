import { getVolanta } from '../../../../../common/article/elements/volanta/index';
import { getExternalArticleId } from '../elements/id';
import { getExternalArticleLink } from '../elements/link';
import { getArticleTitle } from '../../../../../common/article/elements/title';
import { getExternalArticleImage } from '../elements/image';

export const CardWebStory = article => {
    // "id":"webstory1"
    // "url": "https://lanota.com/xxxxxx",
    // "titulo": "Es de Mar del Plata, \"argentinizó\" a su novia sueca y se volvieron furor en TikTok con sus desopilantes videos",
    // "volanta": "Santiago emigró al país europeo y conoció a Isa, con quien en pocos meses tendrá una hija; con sus diferencias crearon su imagen en las redes y comparten divertidas filmaciones ",
    // "imagen": {....muy parecido al de articulo}
    return {
        titulo: getArticleTitle(article),
        id: getExternalArticleId(article),
        url: getExternalArticleLink(article),
        volanta: getVolanta(article),
        imagen: getExternalArticleImage(article)
    };
};

export default CardWebStory;
