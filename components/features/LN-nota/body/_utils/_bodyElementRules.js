// Components
import Paragraph from '../../../../private/LN/nota/cuerpo/parrafo';
import Tags from '../../../../private/LN/nota/cuerpo/tags';
import Subtitle from '../../../../private/LN/nota/cuerpo/subtitle';
import Gallery from '../../../../private/LN/common/carrousell';
import ListOrderedOrUnordered from '../../../../private/LN/nota/cuerpo/listOrderedOrUnordered';
import Image from '../../../../private/LN/nota/cuerpo/image';
import Video from '../../../../private/LN/nota/cuerpo/video';
import VideoJW from '../../../../private/common/videoPlayerJw/index';
import RawHTML from '../../../../private/LN/common/rawHTML';
import Html from '../../../../private/LN/nota/cuerpo/html';
import powerUpsReceta from '../../../../private/LN/nota/cuerpo/powerUpsReceta';
import Divider from '../../../../private/LN/nota/cuerpo/divider';
import Parallax from '../../../../private/LN/nota/cuerpo/powerUpParallax';
import PowerUpLiveBlog from '../../../../private/LN/nota/cuerpo/powerUpLiveBlog';
import EmbedCll from '../../../../private/LN/nota/cuerpo/EmbedCll';
import Interstitial from '../../../LN-10-global/common/body/interstitial/default';
import PullQuote from '../../../LN-10-global/common/body/pullQuote/default';
import BlockQuote from '../../../LN-10-global/common/body/blockQuote/default';
import HowToBody from '../../howTo/body';
import imageGalleryEmbed from '../../private/body/imageGalleryEmbed/default';
// utils
import { selectRule } from './_bodyRules';
import TableV2 from '../../tableV2/default';

const bodyComponents = [
    Paragraph,
    PullQuote,
    BlockQuote,
    Tags,
    Subtitle,
    Gallery,
    ListOrderedOrUnordered,
    Image,
    Video,
    VideoJW,
    RawHTML,
    Interstitial,
    Html,
    TableV2,
    powerUpsReceta,
    Parallax,
    Divider,
    PowerUpLiveBlog,
    EmbedCll,
    HowToBody,
    imageGalleryEmbed
];

export const bodyElementRules = (props = {}) => {
    const { element = {}, subtype } = props;
    const { type, subtype: subtypeElement, content } = element;

    const selectedComponent = bodyComponents.find(componentElement => {
        const componentSelected = selectRule({
            subtype,
            type,
            subtypeElement,
            componentElement
        });
        return componentSelected({
            subtype,
            subtypeElement,
            content,
            componentElement,
            type
        });
    });

    return selectedComponent || undefined;
};

export default bodyElementRules;
