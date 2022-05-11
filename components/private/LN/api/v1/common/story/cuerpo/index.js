import get from '../../../../../../common/utils/get';
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
        Button,
        CustomEmbed
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
            interstitial_link: Button,
            custom_embed: CustomEmbed
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
            interstitial_link: Button,
            custom_embed: CustomEmbed
        },
        8: { text: Text, custom_embed: CustomEmbed, image: Image }
    };
};

const getInfographicElement = (
    infographic,
    subtypeInfographic,
    contentElements,
    aperturaMultimedia
) => {
    if (!contentElements) throw new Error('The story does not have body');

    if (subtypeInfographic && infographic) {
        contentElements.unshift(infographic);
    }
    if (subtypeInfographic && aperturaMultimedia) {
        contentElements.unshift(aperturaMultimedia);
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
        subtype === '2',
        get(dataNota, 'content_elements', ''),
        get(dataNota, 'promo_items.apertura_multimedia', null)
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
