// Components
import Paragraph from '../../../../private/LN/nota/cuerpo/parrafo';
import PullQuote from '../../../../private/LN/nota/cuerpo/pullQuote';
import BlockQuote from '../../../../private/LN/nota/cuerpo/blockQuote';
import Tags from '../../../../private/LN/nota/cuerpo/tags';
import Subtitle from '../../../../private/LN/nota/cuerpo/subtitle';
import Gallery from '../../../../private/LN/common/carrousell';
import ListOrderedOrUnordered from '../../../../private/LN/nota/cuerpo/listOrderedOrUnordered';
import Image from '../../../../private/LN/nota/cuerpo/image';
import Video from '../../../../private/LN/nota/cuerpo/video';
import VideoJW from '../../../../private/common/videoPlayerJw/index';
import RawHTML from '../../../../private/LN/common/rawHTML';
import BotonLink from '../../../../private/LN/nota/cuerpo/botonLink';
import Html from '../../../../private/LN/nota/cuerpo/html';
import Table from '../../../../private/LN/nota/cuerpo/table';
import powerUpsReceta from '../../../../private/LN/nota/cuerpo/powerUpsReceta';
import Divider from '../../../../private/LN/nota/cuerpo/divider';
import Parallax from '../../../../private/LN/nota/cuerpo/powerUpParallax';
import PowerUpLiveBlog from '../../../../private/LN/nota/cuerpo/powerUpLiveBlog';
import EmbedCll from '../../../../private/LN/nota/cuerpo/EmbedCll';
// utils
import { selectRule } from './_bodyRules';

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
    BotonLink,
    Html,
    Table,
    powerUpsReceta,
    Parallax,
    Divider,
    PowerUpLiveBlog,
    EmbedCll
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
