import React, { useState } from 'react';
import Text from '../../../common/text';

const HeaderComments = props => {
    const [showLegal, setShowLegal] = useState(false);

    const onShowLegal = () => {
        showLegal ? setShowLegal(false) : setShowLegal(true);
    };

    return (
        <>
            <section className="mod-headersection --line --button">
                <Text
                    tag="h4"
                    extraClass="com-title"
                    size="--l"
                    text="Enviá tu comentario"
                />
                <a
                    className="com-link --threexs"
                    onClick={onShowLegal}
                    title="Ver legales"
                >
                    Ver legales
                </a>
            </section>
            {showLegal && (
                <Text tag="p" size="--threexs">
                    Los comentarios publicados son de exclusiva responsabilidad
                    de sus autores y las consecuencias derivadas de ellos pueden
                    ser pasibles de sanciones legales. Aquel usuario que incluya
                    en sus mensajes algún comentario violatorio del reglamento
                    será eliminado e inhabilitado para volver a comentar. Enviar
                    comentario implica la aceptación del Reglamento.
                </Text>
            )}
        </>
    );
};

export default HeaderComments;
