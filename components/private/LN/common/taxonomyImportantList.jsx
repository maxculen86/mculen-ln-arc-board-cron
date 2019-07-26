import React from 'react';
import PropTypes from 'fusion:prop-types';

/**
 * Renderiza elementos relacionados destacados (como categorias o tags)
 */
const TaxonomyImportantList = ({ list, destacado }) => {
    console.log('Lista: ', list);
    console.log('typeof list:', typeof list);
    console.log('Destacado: ', destacado);
    console.log('typeof destacado:', typeof destacado);
    return (
        <div className={destacado ? 'classDestacada' : ''}>
            {list.map((v, index) => (
                <a key={index} href={v.path}>
                    {v.text}
                </a>
            ))}
        </div>
    );
};

TaxonomyImportantList.PropTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired,
    destacado: PropTypes.boolean.isRequired
};

export default TaxonomyImportantList;
