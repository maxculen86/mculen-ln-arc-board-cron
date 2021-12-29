import React from 'react';
import PropTypes from 'fusion:prop-types';

const row = 'row';
const rowTablet2 = 'row-gap-tablet-2';
const rowTablet3 = 'row-gap-tablet-3';
const rowTablet4 = 'row-gap-tablet-4';

const layout = {
    Grilla: {
        1: row,
        2: rowTablet2,
        3: rowTablet3,
        4: rowTablet4,
        6: rowTablet3,
        9: rowTablet3
    },
    ArticleFeature: {
        1: row,
        2: rowTablet2,
        3: rowTablet3,
        4: rowTablet4,
        6: rowTablet3,
        9: rowTablet3
    },
    Listado: row,
    Timeline: 'breaking-news',
    Focal: row,
    Opinion: row,
    Editoriales: 'mod-footersection'
};

const ModRowGap = props => {
    const {
        children,
        column = 3,
        classCondition,
        typeArticle = 'Grilla'
    } = props;

    const classLayout =
        typeArticle === 'Grilla' || typeArticle === 'ArticleFeature'
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
    column: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    classCondition: PropTypes.string,
    typeArticle: PropTypes.string
};

ModRowGap.defaultProps = {
    column: 3,
    classCondition: '',
    typeArticle: 'Grilla'
};

export default ModRowGap;
