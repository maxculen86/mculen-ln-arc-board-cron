import React from 'react';

const commentsAnchor = () => {
    return (
        <section className="mod-commentamp">
            <ComLink link="#" textname="VER COMENTARIOS" />
            <ComLink link="#" textname="Ir a la nota original" />
        </section>
    );
};

commentsAnchor.label = 'LN-Nota-ComentariosAncla';

export default commentsAnchor;
