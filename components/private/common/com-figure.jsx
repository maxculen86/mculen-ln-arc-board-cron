import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ComFigure = props => {
    const { classCondition, children, zoom } = props;
    console.log('zoom *** ', zoom);

    const [active, setActive] = useState('');
    let zoomClass = '';
    if (zoom) zoomClass = '--zoom';
    if (!children) return null;
    return (
        <figure
            onClick={() => setActive(active ? '--active' : '')}
            className={`mod-figure ${zoomClass || '--zoom'} ${active}`}
        >
            {children}
        </figure>
    );
};

ComFigure.propTypes = {
    children: PropTypes.elementType.isRequired,
    zoom: PropTypes.bool.isRequired,
    classCondition: PropTypes.string
};

export default ComFigure;
