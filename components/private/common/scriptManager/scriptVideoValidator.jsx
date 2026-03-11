import get from '../utils/get';
import { FOTOAL100 } from '../utils/subtypes/subtypeHelper';

const videosBody = contentElements =>
    contentElements &&
    contentElements.filter(element => element.type === 'video').length;

function scriptVideoValidator(globalContent) {
    const contentElements = get(globalContent, 'content_elements');
    const subtype = get(globalContent, 'subtype');
    const promoItems = get(globalContent, 'promo_items');
    const basicPromoItems = get(promoItems, 'basic');
    const aperturaMultimediaPromoItems = get(promoItems, 'apertura_multimedia');
    const typeBasic = get(basicPromoItems, 'type', '');
    const typeMultimedia = get(aperturaMultimediaPromoItems, 'type', '');

    return (
        (videosBody(contentElements) > 0 ||
            typeMultimedia === 'video' ||
            typeBasic === 'video') &&
        subtype !== FOTOAL100
    );
}

export default scriptVideoValidator;
