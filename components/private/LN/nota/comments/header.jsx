import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Text from '../../../common/text';

const HeaderComments = ({ showButton = true }) => {
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
                {showButton && (
                    <a
                        className="com-link --threexs"
                        onClick={onShowLegal}
                        title="Ver legales"
                    >
                        Ver legales
                    </a>
                )}
            </section>
            {showLegal && showButton && (
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

HeaderComments.propTypes = {
    showButton: PropTypes.bool
};

HeaderComments.defaultProps = {
    showButton: true
};

export default HeaderComments;
