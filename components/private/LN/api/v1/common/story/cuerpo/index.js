import get from 'lodash.get';
import defaultCuerpo from './templates/default';
import recetaCuerpo from './templates/receta';
import htmlCuerpo from './templates/htmlLibre';

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

const getInfographicElement = (infographic, subtype, contentElements) => {
    if (!contentElements) throw new Error('The story does not have body');

    if (subtype === '2' && infographic) {
        contentElements.unshift(infographic);
    }
    return contentElements;
};

const storyBody = (dataNota, storyBodyElements) => {
    const { _id } = dataNota;
    const subtype = get(dataNota, 'subtype', '');
    if (!subtype) throw Error('The story does not have subtype');

    const elementBySubtype = getStoryElementBySubtype(storyBodyElements);
    const contentElements = getInfographicElement(
        get(dataNota, 'promo_items.basic', ''),
        subtype,
        get(dataNota, 'content_elements', '')
    );

    const templates = {
        '7': recetaCuerpo,
        '8': defaultCuerpo,
        '9': htmlCuerpo
    }[subtype];
    return templates
        ? templates(contentElements, elementBySubtype[subtype], _id)
        : defaultCuerpo(contentElements, elementBySubtype[1], _id);
};

export default storyBody;
