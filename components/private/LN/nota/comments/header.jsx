import React from 'react';
import ComTitle from '../../../common/com-title';
import Text from '../../../common/text';
import classNames from 'classnames';

const HeaderComments = ({ className }) => {
    const _class = classNames('mod-headersection --line --button', className);
    return (
        <>
            <section className={_class}>
                <ComTitle
                    tag="h4"
                    size="--xl"
                    weight="--font-extra"
                    content="Enviá tu comentario"
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
