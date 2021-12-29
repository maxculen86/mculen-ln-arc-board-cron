import React from 'react';
import PropTypes from 'prop-types';
import ComButton from '../../../common/com-button';
import Text from '../../../common/text';

const HeaderComments = ({ outputType }) => {
    const script = `
    window.addEventListener('load', (event) => {
        const verLegalesBtn = document.getElementById(
            'ver-legales-btn'
        );
        if (verLegalesBtn) {
            verLegalesBtn.onclick = () => {
                const verLegalesText = document.getElementById(
                    'ver-legales-text'
                );
                verLegalesText.classList.toggle('hlp-none');
            }
        }
    });`;

    return (
        <>
            <section className="mod-headersection --line --button">
                <Text
                    tag="h4"
                    extraClass="com-title"
                    size="--l"
                    text="Enviá tu comentario"
                />
                <ComButton
                    classesNames="com-link --threexs"
                    id="ver-legales-btn"
                    title="Ver legales"
                    textname="Ver legales"
                    onClick={() => {
                        const verLegalesText = document.getElementById(
                            'ver-legales-text'
                        );
                        verLegalesText.classList.toggle('hlp-none');
                    }}
                />
            </section>
            <Text
                tag="p"
                size="--threexs"
                id="ver-legales-text"
                extraClass="hlp-none"
            >
                Los comentarios publicados son de exclusiva responsabilidad de
                sus autores y las consecuencias derivadas de ellos pueden ser
                pasibles de sanciones legales. Aquel usuario que incluya en sus
                mensajes algún comentario violatorio del reglamento será
                eliminado e inhabilitado para volver a comentar. Enviar
                comentario implica la aceptación del Reglamento.
            </Text>
            {outputType === 'widgets' && (
                <script
                    id="HEADER-SCRIPT"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: script
                    }}
                />
            )}
        </>
    );
};

HeaderComments.propTypes = {
    outputType: PropTypes.string.isRequired
};

export default HeaderComments;
