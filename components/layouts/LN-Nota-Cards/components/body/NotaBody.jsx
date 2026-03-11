import React from 'react';

function NotaBody({ children = null }) {
    return (
        <section className="nota-cards__body">
            <div className="lay-container">
                <div className="cuerpo__nota mb-80 pt-24 pt-86_min512 pt-80_m pt-94_l px-20_l px-0_min1366">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default NotaBody;
