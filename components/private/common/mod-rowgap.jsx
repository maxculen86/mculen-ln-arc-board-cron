import React from 'react';
import PropTypes from 'fusion:prop-types';
// import '../../../resources/dist/css/ln/modules/mod-rowgap.css';

const layout = {
    Grilla: {
        1: 'row',
        2: 'row-gap-tablet-2 row-gap-desksm-2',
        3: 'row-gap-tablet-3 row-gap-desksm-3',
        4: 'row-gap-tablet-4 row-gap-desksm-4'
    },
    Listado: 'row',
    Timeline: 'breaking-news'
};

const ModRowGap = props => {
    const {
        children,
        column = 3,
        classCondition,
        typeArticle = 'Grilla'
    } = props;

    const classLayout =
        typeArticle === 'Grilla'
            ? layout[typeArticle][column]
            : layout[typeArticle] || '';

    return (
        <div className={`${classLayout} ${classCondition || ''}`}>
            {children}
        </div>
    );
};

ModRowGap.propTypes = {
    children: PropTypes.node.isRequired,
    column: PropTypes.number,
    classCondition: PropTypes.string,
    typeArticle: PropTypes.string.isRequired
};

ModRowGap.defaultProps = {
    column: 3,
    classCondition: ''
};

export default ModRowGap;
