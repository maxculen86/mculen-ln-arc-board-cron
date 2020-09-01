import React from 'react';

//import '../../../resources/dist/css/ln/modules/mod-rowgap.css';

const Modrowgap = props => {
    const { children, column, classCondition } = props;
    return (
        <>
            {column > 1 ? (
                <div
                    className={`row-gap-tablet-${column} row-gap-desksm-${column} ${classCondition ||
                        ''}`}
                >
                    {children}
                </div>
            ) : (
                <div className={`row ${classCondition || ''}`}>{children}</div>
            )}
        </>
    );
};

export default Modrowgap;
