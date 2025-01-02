import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComFigure from './com-figure';
import ModPicture from './mod-picture';
import ModFigcaption from './mod-figcaption';
import '../../../resources/dist/css/ln/modules/mod-figure.css';

function ModFigure(props) {
    const { src, title, credit, classCondition } = props;
    if (!src) return null;

    return (
        <ComFigure classCondition={classCondition}>
            <ModPicture src={src} alt={title} />
            <ModFigcaption title={title} credit={credit} />
        </ComFigure>
    );
}

ModFigure.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    credit: PropTypes.string,
    classCondition: PropTypes.string
};

ModFigure.defaultProps = {
    title: '',
    credit: '',
    classCondition: ''
};

export default ModFigure;
