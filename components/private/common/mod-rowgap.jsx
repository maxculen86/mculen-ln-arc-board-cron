import React from 'react';

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

function ModRowGap({
    children,
    column = 3,
    classCondition = '',
    typeArticle = 'Grilla'
}) {
    const classLayout =
        typeArticle === 'Grilla' || typeArticle === 'ArticleFeature'
            ? layout[typeArticle][column]
            : layout[typeArticle] || '';

    return (
        <div className={`${classLayout} ${classCondition || ''}`}>
            {children}
        </div>
    );
}

export default ModRowGap;
