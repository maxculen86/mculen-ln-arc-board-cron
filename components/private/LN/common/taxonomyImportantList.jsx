import React from 'react';
import PropTypes from 'fusion:prop-types';

/**
 * Renderiza elementos relacionados destacados (como categorias o tags)
 */
const taxonomyImportantList = ({ list, destacado }) => {
    return (
        <div className={destacado ? 'classDestacada' : ''}>
            {list.map(v => (
                <a href={v.path}>{v.text}</a>
            ))}
        </div>
    );
};

// taxonomyImportantList.PropTypes = {
//     list: PropTypes.arrayOf(
//         PropTypes.shape({
//             text: PropTypes.string,
//             path: PropTypes.string
//         })
//     ),
//     destacado: PropTypes.boolean
// };

export default taxonomyImportantList;
