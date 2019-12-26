import React from 'react';
import PropTypes from 'fusion:prop-types';

//Importo componente HARCODEADOS
import BlockQuote from './blockQuote';
import Gallery from '../../common/carrousell';
/* import Gallery from '../../common/carousell/gallery'; */
import Html from './html';
import PullQuote from './pullQuote';
import MasNotas from './masNotas';
import Tags from './tags';
import TextCapital from './text';
import Ordered from './ordered';
import Unordered from './unordered';
import Subtitles from './subtitles';

// TODO: tests
const Cuerpo = props => {
    const resp = [];

    /* resp.push(<TextCapital />);
    resp.push(<BlockQuote />);
    resp.push(<TextCapital />);
    resp.push(<Subtitles />);
    resp.push(<Ordered />);
    resp.push(<Unordered />); */
    // console.log('------------------- cuerpo', props);
    props.globalContent.content_elements.forEach(element => {
        if (element.type === 'gallery') {
            resp.push(<Gallery {...element} />);
        }
    });
    /* resp.push(<Gallery {...props} />); */
    /* resp.push(<Html />);
    resp.push(<PullQuote />);
    resp.push(<MasNotas />);
    resp.push(<Tags />); */

    return resp;
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
