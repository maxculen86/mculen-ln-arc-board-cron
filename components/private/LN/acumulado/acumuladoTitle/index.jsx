import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import AcumuladoTitle from './acumuladoTitle';

function index(props) {
    const {
        globalContent: { _id }
    } = props;
    return <AcumuladoTitle sectionId={_id} {...props} />;
}

index.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string
    }).isRequired
};

export default Consumer(index);
