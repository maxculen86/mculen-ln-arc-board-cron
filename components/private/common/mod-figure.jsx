import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComFigure from './com-figure';
import ModPicture from './mod-picture';
import ModFigcaption from './mod-figcaption';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ModFigure = props => {
    const { src, srcset, media, title, credit, classCondition } = props;
    if (!src && !srcset) return null;

    return (
        <ComFigure classCondition={classCondition}>
            <ModPicture media={media} srcset={srcset} src={src} alt={title} />
            <ModFigcaption title={title} credit={credit} />
        </ComFigure>
    );
};

ModFigure.propTypes = {
    src: PropTypes.string.isRequired,
    srcset: PropTypes.string.isRequired,
    media: PropTypes.string,
    title: PropTypes.string,
    credit: PropTypes.string,
    classCondition: PropTypes.string
};

export default ModFigure;
