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
        CustomEmbed,
        Table,
        Numeric_rating
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
            custom_embed: CustomEmbed,
            table: Table,
            numeric_rating: Numeric_rating
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
        8: {
            text: Text,
            header: Header,
            custom_embed: CustomEmbed,
            image: Image,
            table: Table,
            raw_html: Html
        }
    };
};
const getElementsUnique = contentElements =>
    contentElements.reduce((result, element) => {
        // Only search videos duplicated because exists other components with same ids repeated.
        const filtered = result
            .filter(e => ['video'].includes(e.type))
            // eslint-disable-next-line no-underscore-dangle
            .map(e => `${e._id}-${e.type}`);
        // eslint-disable-next-line no-underscore-dangle
        if (element && !filtered.includes(`${element._id}-${element.type}`)) {
            return result.concat([element]);
        }

        return result;
    }, []);

const getPromoItemsInContent = (contentElements, promoItem) =>
    contentElements.filter(
        x => get(x, '_id', '-1') === get(promoItem, '_id', null)
    );
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

const storyBody = (dataNota, storyBodyElements) => {
    const { _id } = dataNota || {};
    const subtype = get(dataNota, 'subtype', '');
    if (!subtype) throw Error('The story does not have subtype');

    const elementBySubtype = getStoryElementBySubtype(storyBodyElements);
    let contentElements =
        getElementsUnique(get(dataNota, 'content_elements', [])) || [];

    contentElements = getElementsWithHtmlPromoItems(
        get(dataNota, 'promo_items', {}),
        subtype,
        contentElements
    );

    const ratingIndex = contentElements.findIndex(el => el?.type === 'numeric_rating');
    if (ratingIndex > 0) {
        const [ratingElement] = contentElements.splice(ratingIndex, 1);
        contentElements.unshift(ratingElement);
    }

    const idsElements = contentElements.map(x => x && get(x, '_id', null));

    const templates = {
        7: recetaCuerpo,
        8: defaultCuerpo,
        9: htmlCuerpo
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
            elements: defaultCuerpo(
                contentElements,
                elementBySubtype[1],
                _id,
                dataNota
            )
        };
};

export default storyBody;
