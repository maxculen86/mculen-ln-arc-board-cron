import React from 'react';

//import '../../../resources/dist/css/ln/modules/mod-autor.css';

const Modrowgap = props => {
    const { children, column, classCondition } = props;
    return (
        <section className="mod-autor">
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
        </section>
    );
};

export default Modrowgap;
