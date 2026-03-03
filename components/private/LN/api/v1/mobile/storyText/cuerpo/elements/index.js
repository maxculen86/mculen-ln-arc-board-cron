import get from '../../../../../../../common/utils/get';
import defaultCuerpo from '../../../../../common/elements/story/cuerpo/templates/default';
import recetaCuerpo from '../../../../../common/elements/story/cuerpo/templates/receta';

const getStoryElementBySubtype = elements => {
    const {
        Text,
        Header,
        Image,
        Video,
        List,
        Quote,
        Gallery,
        Embed,
        Html,
        Button
    } = elements;
    return {
        1: {
            text: Text,
            header: Header,
            image: Image,
            video: Video,
            list: List,
            quote: Quote,
            gallery: Gallery,
            oembed_response: Embed,
            raw_html: Html,
            interstitial_link: Button
        },
        7: {
            text: Text,
            header: Header,
            image: Image,
            video: Video,
            list: List,
            quote: Quote,
            gallery: Gallery,
            oembed_response: Embed,
            raw_html: Html,
            interstitial_link: Button
        },
        8: { text: Text, image: Image }
    };
};

const storyBodyElements = (dataNota, elements) => {
    const { id } = dataNota;
    const subtype = get(dataNota, 'subtype', '');

    if (!subtype) throw Error('The story does not have subtype');

    const elementBySubtype = getStoryElementBySubtype(elements);
    const contentElements = get(dataNota, 'content_elements', '');

    const templates = {
        7: recetaCuerpo,
        8: defaultCuerpo
    }[subtype];

    return templates
        ? templates(contentElements, elementBySubtype[subtype], id, dataNota)
        : defaultCuerpo(contentElements, elementBySubtype[1], id, dataNota);
};

export default storyBodyElements;
