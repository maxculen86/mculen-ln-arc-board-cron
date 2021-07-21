import React from 'react';
import PropTypes from 'fusion:prop-types';
// import '../../../resources/dist/css/ln/modules/mod-rowgap.css';

const layout = {
    Grilla: {
        1: 'row',
        2: 'row-gap-tablet-2',
        3: 'row-gap-tablet-3',
        4: 'row-gap-tablet-4',
        6: 'row-gap-tablet-3',
        9: 'row-gap-tablet-3'
    },
    ArticleFeature: {
        1: 'row',
        2: 'row-gap-tablet-2',
        3: 'row-gap-tablet-3',
        4: 'row-gap-tablet-4',
        6: 'row-gap-tablet-3',
        9: 'row-gap-tablet-3'
    },
    Listado: 'row',
    Timeline: 'breaking-news',
    Focal: 'row',
    Opinion: 'row',
    Editoriales: 'row'
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
