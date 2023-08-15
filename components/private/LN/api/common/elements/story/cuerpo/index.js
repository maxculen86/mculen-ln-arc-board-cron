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
        VideoJW,
        List,
        Summary,
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
            video_jw: VideoJW,
            list: List,
            summary: Summary,
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
            video_jw: VideoJW,
            list: List,
            summary: Summary,
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

const getElementsUnique = contentElements => {
    return contentElements.reduce((result, element) => {
        // Only search videos duplicated because exists other components with same ids repeated.
        const filtered = result
            .filter(e => ['video'].includes(e.type))
            .map(e => `${e._id}-${e.type}`);
        if (element && !filtered.includes(`${element._id}-${element.type}`)) {
            return result.concat([element]);
        }

        return result;
    }, []);
};

const getPromoItemsInContent = (contentElements, promoItem) => {
    return contentElements.filter(
        x => get(x, '_id', '-1') === get(promoItem, '_id', null)
    );
};
// This method applies to adding elements of the promoItem that are only of type html
const getElementsWithHtmlPromoItems = (
    promoItems,
    subtype,
    contentElements
) => {
    if (!contentElements) throw new Error('The story does not have body');

    const priorityPromoItems = ['apertura_multimedia', 'basic'];
    const exceptPromoHtmlForSubtypes = [4, 8]; // Exception For Types StoryTelling and Photo Al 100

    priorityPromoItems.some(key => {
        const promoItem = promoItems[key];
        if (
            promoItem &&
            promoItem.type === 'raw_html' &&
            !exceptPromoHtmlForSubtypes.includes(subtype) &&
            getPromoItemsInContent(contentElements, promoItem).length === 0
        ) {
            contentElements.unshift(promoItem);
            return true;
        }
        return false;
    });

    return contentElements;
};
export const getSummaryElements = (summary, subtype, contentElements) => {
    if (!contentElements) throw new Error('The story does not have body');

    const { length } = Object.keys(summary);
    if (length === 0) return contentElements;

    const newSummary = summaryToContentElements(summary);
    const allowedNotesTypes = ['1', '10']; // Noticias, Agencia

    if (
        getPromoItemsInContent(contentElements, newSummary).length === 0 &&
        allowedNotesTypes.includes(subtype.toString())
    ) {
        contentElements.unshift(newSummary);
    }

    return contentElements;
};

const summaryToContentElements = summary => {
    const {
        _id,
        embed: {
            config: { arrayBullets }
        }
    } = summary;

    return {
        _id,
        type: 'summary',
        items: arrayBullets
    };
};

const storyBody = (dataNota, storyBodyElements) => {
    const { _id } = dataNota || {};
    const subtype = get(dataNota, 'subtype', '');
    if (!subtype) throw Error('The story does not have subtype');

    const elementBySubtype = getStoryElementBySubtype(storyBodyElements);
    let contentElements =
        getElementsUnique(get(dataNota, 'content_elements', [])) || [];
    contentElements = getSummaryElements(
        get(dataNota, 'promo_items.summary', {}),
        subtype,
        contentElements
    );

    contentElements = getElementsWithHtmlPromoItems(
        get(dataNota, 'promo_items', {}),
        subtype,
        contentElements
    );

    const idsElements = contentElements.map(x => x && get(x, '_id', null));

    const templates = {
        '7': recetaCuerpo,
        '8': defaultCuerpo,
        '9': htmlCuerpo
    }[subtype];
    return templates
        ? {
              idsElements,
              elements: templates(
                  contentElements,
                  elementBySubtype[subtype],
                  _id
              )
          }
        : {
              idsElements,
              elements: defaultCuerpo(contentElements, elementBySubtype[1], _id)
          };
};

export default storyBody;
