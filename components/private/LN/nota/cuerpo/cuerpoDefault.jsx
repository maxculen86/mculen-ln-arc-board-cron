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
    const {
        globalContent: { content_elements: contentElements }
    } = props;
    console.log('TCL: contentElements', contentElements);
    const bodyComponents = [
        BlockQuote,
        Tags,
        Subtitle,
        Gallery,
        'aaaa',
        'bbb',
        'cccc'
    ];

    const capitalIndex = contentElements.findIndex(v => v.type === 'text');
    const resp = contentElements.map((element, i) => {
        console.log('content_elements ************', element);
        console.log('bodyComponents ************', bodyComponents);
        const Component = bodyComponents.find(
            bc => bc.arcType === element.type
        );
        if (Component) {
            if (capitalIndex === i) {
                return <Component data={element} capital />;
            }
            return <Component data={element} />;
        }

        return <></>;
    });

    /* resp.push(<TextCapital />);
    resp.push(<BlockQuote />);
    resp.push(<TextCapital />);
    resp.push(<Subtitles />);
    resp.push(<Ordered />);
    resp.push(<Unordered />); */
    // console.log('------------------- cuerpo', props);
    // contentElements.forEach(element => {
    //     if (element.type === 'gallery') {
    //         resp.push(<Gallery {...element} />);
    //     }
    // });
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
