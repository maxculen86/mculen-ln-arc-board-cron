import React from 'react';
import PropTypes from 'fusion:prop-types';
import Bajada from '../../../common/mod-bajada';

const BajadaNota = props => {
    const {
        globalContent: {
            subheadlines: { basic }
        }
    } = props;

    const subtitulo = basic || null;
    return (
        <Bajada
            subheadTag="h2"
            subheadSize="--m-xs"
            classCondition="--bajada"
            subheadText={subtitulo}
        />
    );
};

BajadaNota.propTypes = {
    globalContent: PropTypes.shape({
        subheadlines: PropTypes.shape({
            basic: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default BajadaNota;
