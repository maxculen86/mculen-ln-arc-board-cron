import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';
import { FOTOAL100 } from '../utils/subtypes/subtypeHelper';

const videosBody = contentElements =>
    contentElements &&
    contentElements.filter(element => element.type === 'video').length;

const scriptVideoValidator = globalContent => {
    const contentElements = get(globalContent, 'content_elements');
    const subtype = get(globalContent, 'subtype');
    const promoItems = get(globalContent, 'promo_items');
    const basicPromoItems = get(promoItems, 'basic');
    // const storytellingPromoItems = get(promoItems, 'storytelling');
    const typeBasic = get(basicPromoItems, 'type');
    // const typeStorytelling = get(storytellingPromoItems, 'type');

    const loadVideo =
        (videosBody(contentElements) > 0 || typeBasic === 'video') &&
        subtype !== FOTOAL100;

    return loadVideo;
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
