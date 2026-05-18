/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { cx } from '@ln/ds-cva';
import ComTitle from '../../../common/com-title';
import Text from '../../../common/text';
import ScrollToTopButton from '../../../../features/LN/common/scrollToTopButton/ScrollToTopButton';
import { scrollToElementWithOffset } from '../../common/utils/scrollToElementWithOffset';

function HeaderComments({ className }) {
    const handleToggleVerLegales = () => {
        const verLegalesText = document.querySelector('#ver-legales-text');
        verLegalesText.classList.toggle('none');
    };

    const onClickBtnUp = () => {
        const titleArticle = document.querySelector('h1.com-title, h1');
        if (titleArticle) {
            scrollToElementWithOffset(titleArticle);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <ScrollToTopButton template="others" onClick={onClickBtnUp} />
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
