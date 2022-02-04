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

// Utils
import { FOTOAL100 } from '../../../../private/common/utils/subtypes/subtypeHelper';

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
    HtmlAMP
];

export const rules = {
    FOTOAL100({ _type, subtype, baseComponent }) {
        if (subtype === FOTOAL100)
            return (
                _type === 'oembed_response' ||
                _type === 'raw_html' ||
                (_type === 'video' && rules.default({ baseComponent, _type }))
            );
    },
    quote({ baseComponent, _type }) {
        if (_type === 'quote') return rules.default({ baseComponent, _type });
    },
    custom_embed({ baseComponent, _type, _subtype }) {
        if (_type === 'custom_embed') return baseComponent.arcType === _subtype;
    },
    optaWidgetWithRawHtmlAMP({
        baseComponent,
        content = '',
        _type,
        outputType
    }) {
        if (
            content.includes('opta-widget') &&
            _type === 'raw_html' &&
            outputType === 'amp'
        ) {
            return (
                rules.default({ baseComponent, _type }) &&
                baseComponent.outputType === 'opta'
            );
        }
    },
    iframeWithRawHtmlAMP({ baseComponent, content = '', _type, outputType }) {
        if (
            content.includes('iframe') &&
            _type === 'raw_html' &&
            outputType === 'amp'
        ) {
            return (
                rules.default({ baseComponent, _type }) &&
                baseComponent.outputType === 'amp'
            );
        }
    },
    oembedResponseOrRawHtml({ baseComponent, _type, outputType }) {
        if (_type === 'oembed_response' || _type === 'raw_html') {
            return (
                baseComponent.arcType === _type &&
                baseComponent.outputType === outputType
            );
        }
    },
    default({ baseComponent, _type }) {
        return baseComponent.arcType === _type;
    }
};

export const bodyElementRules = ({
    element = {},
    outputType = '',
    subtype = ''
} = {}) => {
    const {
        type: _type,
        subtype: _subtype,
        content,
        additional_properties: { nodeType = {} } = {}
    } = element || {};

    return bodyComponents.find(baseComponent => {
        rules.FOTOAL100({ subtype, baseComponent, _type });
        rules.quote({ baseComponent, _type });
        rules.optaWidgetWithRawHtmlAMP({
            baseComponent,
            content: element.contnet,
            _type,
            outputType
        });
        rules.iframeWithRawHtmlAMP({
            baseComponent,
            content,
            _type,
            outputType
        });
        rules.custom_embed({ baseComponent, _type, _subtype });
        rules.oembedResponseOrRawHtml({ baseComponent, _type, outputType });
        return rules.default({ baseComponent, _type });
    });
};

export default bodyElementRules;
