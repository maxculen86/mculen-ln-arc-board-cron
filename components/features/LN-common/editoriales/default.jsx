import React from 'react';
import PropTypes from 'fusion:prop-types';
import { cajaTemasCustomsFields } from '../../../private/LN/common/utils/cajaTemasHelper';
import ChainCajaCollection from '../../../chains/Ln_Caja_Collection/default';

const Editoriales = ({ id, customFields }) => {
    return <ChainCajaCollection id={id} customFields={customFields} />;
};

Editoriales.label = 'LN Home Editoriales';

Editoriales.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaEditoriales')
    }).isRequired
};

export default Editoriales;
