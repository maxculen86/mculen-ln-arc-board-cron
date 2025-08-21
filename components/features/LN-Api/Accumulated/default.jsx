import React from 'react';
import PropTypes from 'fusion:prop-types';

function index() {
    return <h2>Cambiar a OutputType JSON para visualizar el contenido</h2>;
}

index.propTypes = {
    customFields: PropTypes.shape({
        size: PropTypes.number,
        page: PropTypes.number,
        paramUrlId: PropTypes.string,
        sections: PropTypes.list.tag({
            label: 'Secciones'
        }),
        sectionId: PropTypes.string
    })
};

export default index;
