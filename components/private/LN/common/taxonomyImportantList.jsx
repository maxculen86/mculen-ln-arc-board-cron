import React from 'react';
import PropTypes from 'fusion:prop-types';

/**
 * Renderiza elementos relacionados destacados (como categorias o tags)
 */
const TaxonomyImportantList = ({ list, destacado }) => {
    return (
        <div className={destacado ? 'classDestacada' : ''}>
            {list.map(v => (
                <a key={v.text} href={v.path}>
                    {v.text}
                </a>
            ))}
        </div>
    );
};

TaxonomyImportantList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired,
    destacado: PropTypes.boolean.isRequired
};

export default TaxonomyImportantList;
