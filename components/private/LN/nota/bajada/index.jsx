import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComParagraph from '../../../common/com-paragraph';

const BajadaNota = props => {
    const {
        globalContent: {
            subheadlines: { basic }
        }
    } = props;

    const subtitulo = basic || null;
    return (
        <ComParagraph
            size="--m-xs"
            classCondition="--bajada"
            content={subtitulo}
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
