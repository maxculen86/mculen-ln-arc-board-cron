import React from 'react';
import PropTypes from 'fusion:prop-types';

// Importo componente HARCODEADOS
import BlockQuote from './blockQuote';
import Gallery from '../../common/carrousell';
import Image from './image';
import Video from './video';
import Html from './html';
import PullQuote from './pullQuote';
import MasNotas from './masNotas';
import Tags from './tags';
import Ordered from './ordered';
import ListOrderedOrUnordered from './listOrderedOrUnordered';
import Subtitle from './subtitle';
import Paragraph from './parrafo';

// TODO: tests
const Cuerpo = props => {
    const {
        outputType,
        globalContent: { content_elements: contentElements }
    } = props;
    const bodyComponents = [
        Paragraph,
        PullQuote,
        BlockQuote,
        Tags,
        Subtitle,
        Gallery,
        ListOrderedOrUnordered,
        Image
    ];
    console.log('PASA POR CUERPO DEFAULT');

    const capitalIndex = contentElements.findIndex(v => v.type === 'text');

    const resp = contentElements.map((element, i) => {
        const Component = bodyComponents.find(bc => {
            if (element.type === 'quote') return bc.arcType === element.subtype;
            return bc.arcType === element.type;
        });
        if (Component) {
            if (capitalIndex === i) {
                return <Component data={element} capital />;
            }
            return <Component data={element} outputType={outputType} />;
        }

        return <></>;
    });
    return resp;
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
