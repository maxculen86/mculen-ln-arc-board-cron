/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { cx } from '@ln/ds-cva';
import ComTitle from '../../../common/com-title';
import Text from '../../../common/text';

function HeaderComments({ className }) {
    const handleToggleVerLegales = () => {
        const verLegalesText = document.querySelector('#ver-legales-text');
        verLegalesText.classList.toggle('none');
    };

    return (
        <>
            <section
                className={cx('mod-headersection --line --button', className)}
            >
                <ComTitle
                    tag="h4"
                    size="--xl"
                    weight="--font-extra"
                    content="Enviá tu comentario"
                />
                <span
                    onClick={handleToggleVerLegales}
                    className="com-link --threexs cursor-pointer "
                    title="Ver legales"
                    id="ver-legales-btn"
                >
                    Ver legales
                </span>
            </section>
            <Text
                tag="p"
                size="--threexs"
                id="ver-legales-text"
                extraClass="none"
            >
                Los comentarios publicados son de exclusiva responsabilidad de
                sus autores y las consecuencias derivadas de ellos pueden ser
                pasibles de sanciones legales. Aquel usuario que incluya en sus
                mensajes algún comentario violatorio del reglamento será
                eliminado e inhabilitado para volver a comentar. Enviar
                comentario implica la aceptación del Reglamento.
            </Text>
        </>
    );
}

export default HeaderComments;
