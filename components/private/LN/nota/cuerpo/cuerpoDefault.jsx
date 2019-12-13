import React from 'react';
import PropTypes from 'fusion:prop-types';

// Importo componente HARCODEADOS
import BlockQuote from './blockQuote';
import Gallery from '../../common/carrousell';
import Html from './html';
import PullQuote from './pullQuote';
import MasNotas from './masNotas';
import Tags from './tags';
import TextCapital from './text';
import Ordered from './ordered';
import Unordered from './unordered';
import Subtitles from './subtitles';
import Subtitle from './subtitle';

// TODO: tests
const Cuerpo = props => {
    const resp = [];
    const bodyComponents = [BlockQuote, Tags, Subtitle, Gallery];
    const resp = [];
    props.globalContent.content_elements.forEach(element => {
        console.log('content_elements ************', element);
        console.log('bodyComponents ************', bodyComponents);
        const Component = bodyComponents.find(
            bc => bc.arcType === element.type
        );
        if (Component) {
            resp.push(<Component data={element} />);
        }
    });

    /* resp.push(<TextCapital />);
    resp.push(<BlockQuote />);
    resp.push(<TextCapital />);
    resp.push(<Subtitles />);
    resp.push(<Ordered />);
    resp.push(<Unordered />); */
    /* console.log('------------------- cuerpo', props);
    props.globalContent.content_elements.forEach(element => {
        if (element.type === 'gallery') {
            resp.push(<Gallery {...element} />);
        }
    }); */
    /* resp.push(<Gallery {...props} />); */
    /* resp.push(<Html />);
    resp.push(<PullQuote />);
    resp.push(<MasNotas />);
    resp.push(<Tags />); */
    console.log('resp ************', resp);
    return resp;
};

Cuerpo.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Cuerpo;
