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
            {/*<div
            className={`${
                destacado ? 'com-tag cont_tags' : 'com-secondary-tag'
            }`}
        > */}
            {list.map(v => (
                /*<a
                    className="com-item"
                    key={v.text}
                    href={type === 'tag' ? `/tema/${v.path}/` : `${v.path}/`}
                >
                    {v.text}
                </a> */

                <ComLink
                    link={v.type === 'tag' ? `/tema/${v.path}/` : `${v.path}/`}
                    keytext={v.text}
                    classCondition="com-button --secondary --compact"
                    title={`Ir a notas de ${v.text}`}
                >
                    {/* <ComButton
                        classesNames="--secondary"
                        classCondition="--compact"
                        size="--fivexs"
                    > */}
                    {v.text}
                    {/* </ComButton> */}
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
