import React from 'react';
import PropTypes from 'fusion:prop-types';

const index = props => {
    return (
        (props?.customFields && props?.customFields?.length && (
            <h2>
                Cambiar a OutputType JSON para visualizar el contenido con estos
                parámetros
            </h2>
        )) ||
        null
    );
};

index.propTypes = {
    customFields: PropTypes.shape({
        size: PropTypes.number,
        page: PropTypes.number,
        paramUrlId: PropTypes.string,
        sections: PropTypes.list.tag({
            label: 'Secciones'
        })
    })
};

export default index;
