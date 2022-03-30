/* eslint-disable consistent-return */
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
import RawHTML from '../../../../private/LN/common/rawHTML';
import OembedAMP from '../../../../private/LN/nota/cuerpo/oembedAMP';
import BotonLink from '../../../../private/LN/nota/cuerpo/botonLink';
import Html from '../../../../private/LN/nota/cuerpo/html';
import OptaAMP from '../../../../private/LN/nota/cuerpo/optaAMP';
import powerUpsReceta from '../../../../private/LN/nota/cuerpo/powerUpsReceta';
import HtmlAMP from '../../../../private/LN/nota/cuerpo/htmlAMP';
import Divider from '../../../../private/LN/nota/cuerpo/divider';

// ultils
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
    RawHTML,
    OembedAMP,
    BotonLink,
    Html,
    OptaAMP,
    powerUpsReceta,
    HtmlAMP,
    Divider
];

export const bodyElementRules = (props = {}) => {
    const { element = {}, outputType = '', subtype } = props;
    const { type, subtype: subtypeElement, content } = element;

    return bodyComponents.find(componentElement => {
        const componentSelected = selectRule({
            subtype,
            type,
            outputType
        });

        return componentSelected({
            subtype,
            subtypeElement,
            content,
            componentElement,
            type
        });
    });
};

export default bodyElementRules;
