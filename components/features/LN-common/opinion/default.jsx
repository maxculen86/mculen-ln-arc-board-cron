import React from 'react';
import PropTypes from 'fusion:prop-types';
import { cajaTemasCustomsFields } from '../../../private/LN/common/utils/cajaTemasHelper';
import ChainCajaCollection from '../../../chains/Ln_Caja_Collection/default';

const Opinion = ({ id, customFields }) => {
    return <ChainCajaCollection id={id} customFields={customFields} />;
};

Opinion.label = 'LN Home Opinion';

Opinion.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaOpinion')
    }).isRequired
};

export default Opinion;
