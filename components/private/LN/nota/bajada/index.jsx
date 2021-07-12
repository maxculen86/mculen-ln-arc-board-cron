import React from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../../../common/text';

const BajadaNota = props => {
    const {
        globalContent: {
            subheadlines: { basic }
        }
    } = props;

    const subtitulo = basic || null;
    return (
        <Text
            tag="h2"
            size="--m-xs"
            extraClass="com-subhead --bajada"
            text={subtitulo}
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
