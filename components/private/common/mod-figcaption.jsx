import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComFigcaption from './com-figcaption';
import ComText from './com-text';

import '../../../resources/dist/css/ln/modules/mod-figcaption.css';

const ModFigcaption = props => {
    const { title, credit } = props;
    if (!title && !credit) return null;

    return (
        <ComFigcaption>
            <ComText classCondition="--caption --twoxs" textname={title} />
            <ComText classCondition="--credit --twoxs" textname={credit} />
        </ComFigcaption>
    );
};

ModFigcaption.propTypes = {
    title: PropTypes.string,
    credit: PropTypes.string
};

ModFigcaption.defaultProps = {
    title: '',
    credit: ''
};

export default ModFigcaption;
