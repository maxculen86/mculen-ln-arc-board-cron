import React from 'react';

// import '../../../resources/dist/css/ln/modules/mod-rowgap.css';
const classColumns = {
    1: 'row',
    2: 'row-gap-tablet-2 row-gap-desksm-2',
    3: 'row-gap-tablet-3 row-gap-desksm-3',
    4: 'row-gap-tablet-4 row-gap-desksm-4'
};

const ModRowGap = props => {
    const { children, column = 3, classCondition, typeArticle } = props;

   /* 
   const GridWrapper = typeArticle => {
        
    }
*/
    return (
        <>
            {typeArticle === 'Grilla' ? (
                <div
                    className={`${classColumns[column]} ${classCondition || ''}`}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default ModRowGap;
