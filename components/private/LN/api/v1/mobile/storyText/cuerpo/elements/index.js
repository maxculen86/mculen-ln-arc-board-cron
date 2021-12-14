import get from 'lodash.get';
import defaultCuerpo from '../../../../common/story/cuerpo/templates/default';
import recetaCuerpo from '../../../../common/story/cuerpo/templates/receta';

const getStoryElementBySubtype = storyBodyElements => {
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
    } = storyBodyElements;

    const storyElementBySubtype = {
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

    return storyElementBySubtype;
};

const storyBodyElements = (dataNota, storyBodyElements) => {
    const { id } = dataNota;
    const subtype = get(dataNota, 'subtype', '');
    if (!subtype) throw Error('The story does not have subtype');

    const elementBySubtype = getStoryElementBySubtype(storyBodyElements);
    const contentElements = get(dataNota, 'content_elements', '');

    const templates = {
        '7': recetaCuerpo,
        '8': defaultCuerpo
    }[subtype];

    return templates
        ? templates(contentElements, elementBySubtype[subtype], id)
        : defaultCuerpo(contentElements, elementBySubtype[1], id);
};

export default storyBodyElements;
