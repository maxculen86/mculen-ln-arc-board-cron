import React from 'react';
import PropTypes from 'fusion:prop-types';

//Importo componente HARCODEADOS
import BlockQuote from './blockQuote';
import Gallery from './gallery';
import Html from './html';
import PullQuote from './pullQuote';
import MasNotas from './masNotas';
import Tags from './tags';
import TextCapital from './text';
import Ordered from './ordered';
import Unordered from './unordered';
import Subtitles from './subtitles';

// TODO: tests
const Cuerpo = () => {
    const resp = [];

    resp.push(<TextCapital />);
    resp.push(<BlockQuote />);
    resp.push(<TextCapital />);
    resp.push(<Subtitles />);
    resp.push(<Ordered />);
    resp.push(<Unordered />);
    resp.push(<Gallery />);
    resp.push(<Html />);
    resp.push(<PullQuote />);
    resp.push(<MasNotas />);
    resp.push(<Tags />);

    // contentElements.forEach(element => {
    //     switch (element.type) {
    //         default:
    //             break;
    //     }
    // });

    return resp;
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
