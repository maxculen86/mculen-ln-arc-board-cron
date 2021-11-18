import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/modules/mod-themes.css';
import ComLink from '../../common/com-link';

/**
 * Renderiza elementos relacionados destacados (como categorias o tags)
 */
const TaxonomyImportantList = ({ list, destacado }) => {
    return (
        <section className="mod-themes">
            {list.map(v => (
                <ComLink
                    link={v.type === 'tag' ? `/tema/${v.path}/` : `${v.path}/`}
                    keytext={v.text}
                    classCondition={
                        v.type === 'tag'
                            ? '--tags --twoxs'
                            : 'com-button --secondary --compact'
                    }
                    title={`Ir a notas de ${v.text}`}
                >
                    {v.text}
                </ComLink>
            ))}
        </section>
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
