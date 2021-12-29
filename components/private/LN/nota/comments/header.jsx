import React from 'react';
import Text from '../../../common/text';
const HeaderComments = () => {
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
                    title="Ver legales"
                    id="ver-legales-btn"
                >
                    Ver legales
                </a>
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
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.addEventListener('load', (event) => {
                        const verLegalesBtn = document.querySelector('#ver-legales-btn');
                        verLegalesBtn.onclick = () =>{
                            const verLegalesText = document.querySelector('#ver-legales-text');
                            verLegalesText.classList.toggle('hlp-none')
                        };
                    });
                `
                }}
            />
        </>
    );
};

export default HeaderComments;
