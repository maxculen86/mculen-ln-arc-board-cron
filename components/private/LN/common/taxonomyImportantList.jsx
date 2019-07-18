import React from 'react';
import PropTypes from 'fusion:prop-types';

/**
 * Renderiza elementos relacionados destacados (como categorias o tags)
 * @param {*} props
 */
const taxonomyImportantList = props => {
    const { list } = props;

    <div>
        {list.map(v => {
            <a href={v.path}>{v.text}</a>;
        })}
    </div>;
};

taxonomyImportantList.PropTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            path: PropTypes.string
        })
    )
};

export default taxonomyImportantList;
