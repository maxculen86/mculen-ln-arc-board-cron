import React from 'react';
import PropTypes from 'fusion:prop-types';
import TerceraDefault from './terceraDefault';

// TODO: tests
const index = props => {
    const {
        globalContent: { subtype }
    } = props;

    if (subtype === '1') return <TerceraDefault {...props} />;

    return <></>;
};

index.propTypes = {
    globalContent: PropTypes.shape({
        subtype: PropTypes.number.isRequired
    }).isRequired
};

export default index;
