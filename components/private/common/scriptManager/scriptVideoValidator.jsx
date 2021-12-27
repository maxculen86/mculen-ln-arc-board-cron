import PropTypes from 'fusion:prop-types';
import get from '../utils/get';
import { FOTOAL100 } from '../utils/subtypes/subtypeHelper';

const videosBody = contentElements =>
    contentElements &&
    contentElements.filter(element => element.type === 'video').length;

const scriptVideoValidator = (globalContent, hasBanner) => {
    const contentElements = get(globalContent, 'content_elements');
    const subtype = get(globalContent, 'subtype');
    const promoItems = get(globalContent, 'promo_items');
    const label = get(globalContent, 'label');
    const basicPromoItems = get(promoItems, 'basic');
    const aperturaMultimediaPromoItems = get(promoItems, 'apertura_multimedia');
    const typeBasic = get(basicPromoItems, 'type');
    const typeMultimedia = get(aperturaMultimediaPromoItems, 'type');
    const showBanners = get(label, 'mostrar_banners');
    const text = get(showBanners, 'text');

    return (
        (videosBody(contentElements) > 0 ||
            typeMultimedia === 'video' ||
            typeBasic === 'video') &&
        subtype !== FOTOAL100 &&
        text === hasBanner
    );
};

scriptVideoValidator.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired,
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({
                type: PropTypes.string
            }),
            storytelling: PropTypes.shape({
                type: PropTypes.string
            })
        })
    }).isRequired
};

export default scriptVideoValidator;
